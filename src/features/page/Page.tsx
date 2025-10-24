// src/features/page/page.tsx

import React, { useEffect, useState } from "react";
import { CustomCursor } from "../../components/cursor/Cursor";
import { Footer } from "../footer/Footer";

import { BackgroundStyle } from "../../styles";
import { AppTitleBar } from "../titlebar/TitleBar";
import { VISIBLE_TITLEBAR_HEIGHT } from "../titlebar/TitleBar.consts";
import { mainStyle, pageStyle } from "./Page.styles";

export const useIsMobileWithLogs = (): boolean => {
	const isSSR = typeof window === "undefined";

	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		if (isSSR) {
			return;
		}

		const pointerQuery = window.matchMedia("(pointer: coarse)");
		const hoverQuery = window.matchMedia("(hover: none)");

		const updateAndLogStatus = () => {
			const isCoarsePointer = pointerQuery.matches;
			const hasNoHover = hoverQuery.matches;
			const finalResult = isCoarsePointer && hasNoHover;

			setIsMobile(finalResult);
		};

		updateAndLogStatus();

		pointerQuery.addEventListener("change", updateAndLogStatus);
		hoverQuery.addEventListener("change", updateAndLogStatus);

		return () => {
			pointerQuery.removeEventListener("change", updateAndLogStatus);
			hoverQuery.removeEventListener("change", updateAndLogStatus);
		};
	}, []);

	return isMobile;
};
export const Page: React.FC<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> = ({ page: Page, bg = false, useCursor = true }) => {
	const LAYOUT_BREAKPOINT = 1200;
	const isMobile = useIsMobileWithLogs();
	const [isNarrow, setIsNarrow] = useState(false);

	const updateLayout = () => {
		const shouldBeNarrow = window.innerWidth < LAYOUT_BREAKPOINT;
		if (shouldBeNarrow !== isNarrow) {
			setIsNarrow(shouldBeNarrow);
		}
	};

	useEffect(() => {
		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => {
			window.removeEventListener("resize", updateLayout);
		};
	}, [isNarrow]);
	return (
		<>
			{bg ? <div style={BackgroundStyle}></div> : null}

			{useCursor && !isMobile ? <CustomCursor /> : null}
			<AppTitleBar />
			<main
				key={location.pathname}
				style={{
					...mainStyle,
				}}
			>
				<section
					className="aos-ignore"
					style={{
						position: "absolute",
						...pageStyle,
						marginTop: `${VISIBLE_TITLEBAR_HEIGHT}vh`,
						fontSize: isNarrow
							? "calc(1.6rem*calc(1vw/1vh))"
							: "2rem",
					}}
				>
					<Page />
				</section>
			</main>

			{bg ? <Footer /> : null}
		</>
	);
};
