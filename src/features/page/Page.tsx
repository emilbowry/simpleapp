// src/features/page/page.tsx

import React, { useEffect, useState } from "react";
import { CustomCursor } from "../../components/cursor/Cursor";
import { Footer } from "../footer/Footer";

import { BackgroundStyle } from "../../styles";
import { AppTitleBar } from "../titlebar/TitleBar";
import { VISIBLE_TITLEBAR_HEIGHT } from "../titlebar/TitleBar.consts";
import { mainStyle, pageStyle } from "./Page.styles";

export const Page: React.FC<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> = ({ page: Page, bg = false, useCursor = true }) => {
	const LAYOUT_BREAKPOINT = 1200;

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

			{useCursor && !isNarrow ? <CustomCursor /> : null}
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
					}}
				>
					<Page />
				</section>
			</main>

			{bg ? <Footer /> : null}
		</>
	);
};
