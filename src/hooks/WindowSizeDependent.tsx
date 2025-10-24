// src/hooks/WindowSizeDependent.tsx

import { useEffect, useState } from "react";

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
export { useBrowserScale, useNarrowLayout };
