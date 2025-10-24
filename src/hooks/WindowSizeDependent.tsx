// src/hooks/WindowSizeDependent.tsx

import React, { useState, useEffect } from "react";

// const useResponsiveLayout = (partnerCount: number) => {
// 	const [isCompactView, setIsCompactView] = useState(false);

// 	useEffect(() => {
// 		const checkViewportWidth = () => {
// 			const layout = WallLayout(partnerCount);
// 			const maxBricks = Math.max(layout[0], layout[1]);

// 			const threshold =
// 				PARTNER_EFFECTIVE_WIDTH * (maxBricks + +!(maxBricks % 2 === 0));

// 			setIsCompactView(window.innerWidth < threshold);
// 		};

// 		checkViewportWidth();
// 		window.addEventListener("resize", checkViewportWidth);
// 		return () => window.removeEventListener("resize", checkViewportWidth);
// 	}, [partnerCount]);

// 	return isCompactView;
// };
const LAYOUT_BREAKPOINT = 1200;

const useNarrowLayout = (threshold = LAYOUT_BREAKPOINT) => {
	const [isNarrow, setIsNarrow] = useState(false);

	const updateLayout = () => {
		const shouldBeNarrow = window.innerWidth < threshold;
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
	return isNarrow;
};

const useBrowserScale = (): number => {
	const [scale, setScale] = useState(1.0);

	useEffect(() => {
		const visualViewport = window.visualViewport;

		let initialScale = window.devicePixelRatio || 1;

		if (visualViewport) {
			initialScale *= visualViewport.scale;
		}

		setScale(initialScale);

		if (visualViewport) {
			const updateScale = () => {
				const currentScale = window.outerWidth / window.innerWidth;

				setScale(currentScale);
			};

			visualViewport.addEventListener("resize", updateScale);

			return () => {
				visualViewport.removeEventListener("resize", updateScale);
			};
		} else {
			console.warn(
				"window.visualViewport not supported. Only using devicePixelRatio."
			);
		}
		return () => {};
	}, []);

	return scale;
};
export { useNarrowLayout, useBrowserScale };
