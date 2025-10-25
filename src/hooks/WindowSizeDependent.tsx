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

		let initial_scale = window.devicePixelRatio || 1;

		if (visualViewport) {
			initial_scale *= visualViewport.scale;
		}

		setScale(initial_scale);

		if (visualViewport) {
			const updateScale = () => {
				const current_scale = window.outerWidth / window.innerWidth;

				setScale(current_scale);
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
