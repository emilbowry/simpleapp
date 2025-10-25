// src/components/cursor/Cursor.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/BrowserDependant";
import { TRAIL_SPEED } from "./Cursor.consts";
import {
	chevStyle,
	clickInsertStyle,
	diamondStyle,
	hexStyle,
	largeCursorStyle,
	smallCursorStyle,
} from "./Cursor.styles";
import { IPosition } from "./Cursor.types";

const useMousePosition = (_position?: IPosition): IPosition => {
	const [mouse_position, setMousePosition] = useState(
		_position ?? { x: 0, y: 0 }
	);

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);
	return mouse_position;
};

const useTrailingPosition = (
	target_position: IPosition,
	trail_speed = TRAIL_SPEED
) => {
	const [trailing_position, setTrailingCursorPosition] =
		useState(target_position);

	useEffect(() => {
		let animationFrameId: number;
		const animateLargerCursor = () => {
			setTrailingCursorPosition((prevPos) => ({
				x: prevPos.x + (target_position.x - prevPos.x) * trail_speed,
				y: prevPos.y + (target_position.y - prevPos.y) * trail_speed,
			}));
			animationFrameId = requestAnimationFrame(animateLargerCursor);
		};
		animationFrameId = requestAnimationFrame(animateLargerCursor);
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [target_position, trail_speed]);

	return trailing_position;
};

const useHoveringLink = () => {
	const [isHoveringLink, setIsHoveringLink] = useState(false);
	useEffect(() => {
		const handleMouseOver = (e: MouseEvent) => {
			if ((e.target as HTMLElement).tagName === "A") {
				setIsHoveringLink(true);
			}
		};
		const handleMouseOut = (e: MouseEvent) => {
			if ((e.target as HTMLElement).tagName === "A") {
				setIsHoveringLink(false);
			}
		};
		window.addEventListener("mouseover", handleMouseOver);
		window.addEventListener("mouseout", handleMouseOut);
		return () => {
			window.removeEventListener("mouseover", handleMouseOut);
			window.removeEventListener("mouseout", handleMouseOut);
		};
	}, []);
	return isHoveringLink;
};
const useMouseClick = () => {
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		const handleGlobalMouseDown = () => {
			setIsClicked(true);
		};

		const handleGlobalMouseUp = () => {
			setIsClicked(false);
		};

		window.addEventListener("mousedown", handleGlobalMouseDown);
		window.addEventListener("mouseup", handleGlobalMouseUp);

		return () => {
			window.removeEventListener("mousedown", handleGlobalMouseDown);
			window.removeEventListener("mouseup", handleGlobalMouseUp);
		};
	}, []);

	return isClicked;
};

interface ICustomCursorProps {
	isMouseClicked: boolean;
	mouse_position: IPosition;
	isHoveringLink: boolean;

	trailing_position: IPosition;
}
const LogoCursor: React.FC<ICustomCursorProps> = ({
	isMouseClicked,
	mouse_position,
	trailing_position,
}) => {
	return (
		<>
			<div style={chevStyle(mouse_position)} />
			<div style={diamondStyle(trailing_position)} />
			{isMouseClicked && <div style={clickInsertStyle(mouse_position)} />}
		</>
	);
};
const StaticCursor: React.FC<ICustomCursorProps> = (
	props: ICustomCursorProps
) => (
	<LogoCursor
		{...props}
		trailing_position={props.mouse_position}
		isMouseClicked={true}
	/>
);
const FullHexCursor: React.FC<ICustomCursorProps> = ({ mouse_position }) => (
	<div style={hexStyle(mouse_position)} />
);

const DefaultCursor: React.FC<ICustomCursorProps> = ({ mouse_position }) => (
	<>
		<div style={smallCursorStyle(mouse_position)} />
		<div style={largeCursorStyle(mouse_position)} />
	</>
);

const New_HexCursor: React.FC<ICustomCursorProps> = (
	props: ICustomCursorProps
) =>
	props.isHoveringLink ? (
		props.isMouseClicked ? (
			<StaticCursor {...props} />
		) : (
			<FullHexCursor {...props} />
		)
	) : (
		<LogoCursor {...props} />
	);

const CustomCursor: React.FC = (useBasic = false) => {
	const isMobile = useIsMobile();
	const { hasCustomCursor, global_position, setGlobalMousePosition } =
		useContext(CursorContext);

	const mouse_position = useMousePosition(global_position);
	useEffect(() => {
		setGlobalMousePosition?.(mouse_position);
	}, [setGlobalMousePosition, mouse_position]);

	const MouseProps = {
		mouse_position,
		trailing_position: useTrailingPosition(mouse_position),
		isHoveringLink: useHoveringLink(),
		isMouseClicked: useMouseClick(),
	};
	return !isMobile && hasCustomCursor ? (
		<>
			<style>{`* {cursor: none !important;}`}</style>

			{useBasic === true ? (
				<DefaultCursor {...MouseProps} />
			) : (
				<New_HexCursor {...MouseProps} />
			)}
		</>
	) : (
		<></>
	);
};
const CursorContext = createContext<{
	hasCustomCursor: boolean;
	setHasCustomCursor: React.Dispatch<React.SetStateAction<boolean>>;
	global_position?: IPosition;
	setGlobalMousePosition?: React.Dispatch<React.SetStateAction<IPosition>>;
}>({} as any);
export { CursorContext, CustomCursor };
