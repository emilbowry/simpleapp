// src/features/page/page.tsx

import React, { useEffect, useState } from "react";
import { CustomCursor } from "../../components/cursor/Cursor";
import { Footer } from "../footer/Footer";

import { BackgroundStyle } from "../../styles";
import { AppTitleBar } from "../titlebar/TitleBar";
import { VISIBLE_TITLEBAR_HEIGHT } from "../titlebar/TitleBar.consts";
import { mainStyle, pageStyle } from "./Page.styles";
const isSSR = typeof window === "undefined";

export const useIsMobileWithLogs = (): boolean => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		if (isSSR) {
			return;
		}

		// Define the media queries to check
		const pointerQuery = window.matchMedia("(pointer: coarse)");
		const hoverQuery = window.matchMedia("(hover: none)");

		// This function will run the check and log the results
		const updateAndLogStatus = () => {
			const isCoarsePointer = pointerQuery.matches;
			const hasNoHover = hoverQuery.matches;
			const finalResult = isCoarsePointer && hasNoHover;

			// Group the logs for better readability in the console
			console.group("useIsMobileWithLogs Check");
			console.log(`(pointer: coarse) matches:`, isCoarsePointer);
			console.log(`(hover: none) matches:`, hasNoHover);
			console.log(`Final Result (isMobile):`, finalResult);
			console.groupEnd();

			setIsMobile(finalResult);
		};

		// Run the check once initially on mount
		updateAndLogStatus();

		// Add listeners to re-run the check if the device's capabilities change
		pointerQuery.addEventListener("change", updateAndLogStatus);
		hoverQuery.addEventListener("change", updateAndLogStatus);

		// Cleanup function to remove listeners when the component unmounts
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
	// const a = useIsMobileWithLogs();
	// console.log("PAGE COMPONENT IS DEFINITELY RENDERING"); // <--- ADD THIS
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

			{useCursor ? <CustomCursor /> : null}
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
