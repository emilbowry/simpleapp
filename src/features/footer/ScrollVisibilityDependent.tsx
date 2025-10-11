// src/features/footer/ScrollVisibilityDependent.tsx

import React, { useState, useCallback, useEffect } from "react";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";
const calcVisibilityRegion = (
	docHeight: number,
	borders: [number, number],
	footerVH: number,

	viewportHeight: number
): [number, number, number] => {
	const midPoint = (borders[0] + borders[1]) / 2;
	const positions = [borders[0], midPoint, borders[1]];
	const offset = docHeight - (1 + footerVH) * viewportHeight;
	return positions.map((n) => n * viewportHeight * footerVH + offset) as [
		number,
		number,
		number
	];
};

const useScrollVisibility = (
	borders?: [number, number],
	footerVH = 0.7,
	styling: React.CSSProperties = {}
) => {
	const noBorders = borders === undefined;
	const [isVisible, setIsVisible] = useState(noBorders);
	const [opacity, setOpacity] = useState(+noBorders);

	const handleScroll = useCallback(() => {
		if (noBorders) {
			return;
		}
		const viewportHeight = window.innerHeight;
		const currentScrollY = window.scrollY;
		const docHeight = document.documentElement.scrollHeight;

		const [maxVis, , minVis] = calcVisibilityRegion(
			docHeight,
			borders,
			footerVH,
			viewportHeight
		);

		let _opacity = 0;
		if (currentScrollY < minVis) {
			_opacity = 0;
		} else if (currentScrollY >= maxVis) {
			_opacity = 1;
		} else {
			_opacity = (currentScrollY - minVis) / (maxVis - minVis);
		}

		setOpacity(_opacity);
		setIsVisible(currentScrollY >= minVis);
	}, [borders, footerVH]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	const calculatedStyles: React.CSSProperties = {
		...styling,

		visibility: isVisible ? "visible" : "hidden",
		opacity: opacity,
		filter: `blur(${(1 - opacity) ** 2 * 16}px)`,
	};

	return calculatedStyles;
};
const ScrollVisibilityDependent: React.FC<{
	element: ValidComponent;
	percentage?: number;
	borders?: [number, number];
	styling?: React.CSSProperties;
}> = ({ element, styling = {}, borders = undefined }) => {
	const scrollDependentStyles = useScrollVisibility(borders, 0.7, styling);

	return (
		<div style={scrollDependentStyles}>
			{formatComponent(element as any)}
		</div>
	);
};
export { ScrollVisibilityDependent };
