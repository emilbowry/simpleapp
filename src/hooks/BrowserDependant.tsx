// src/hooks/MobileDependant.tsx

import { useEffect, useState } from "react";

const isSSR = typeof window === "undefined";

const useIsMobile = (): boolean => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		if (isSSR) {
			return;
		}

		const pointerQuery = window.matchMedia("(pointer: coarse)");
		const hoverQuery = window.matchMedia("(hover: none)");

		const updateStatus = () => {
			const isCoarsePointer = pointerQuery.matches;
			const hasNoHover = hoverQuery.matches;
			const finalResult = isCoarsePointer && hasNoHover;

			setIsMobile(finalResult);
		};

		updateStatus();

		pointerQuery.addEventListener("change", updateStatus);
		hoverQuery.addEventListener("change", updateStatus);

		return () => {
			pointerQuery.removeEventListener("change", updateStatus);
			hoverQuery.removeEventListener("change", updateStatus);
		};
	}, []);

	return isMobile;
};

const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

const IS_CHROME = /Chrome/i.test(userAgent);
export { useIsMobile, IS_CHROME };
