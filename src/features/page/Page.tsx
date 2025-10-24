// src/features/page/page.tsx

import React, { useEffect, useState } from "react";
import { CustomCursor } from "../../components/cursor/Cursor";
import { Footer } from "../footer/Footer";

import { BackgroundStyle } from "../../styles";
import { AppTitleBar } from "../titlebar/TitleBar";
import { VISIBLE_TITLEBAR_HEIGHT } from "../titlebar/TitleBar.consts";
import { mainStyle, pageStyle } from "./Page.styles";
import { useNarrowLayout } from "../../hooks/WindowSizeDependent";
import { useIsMobile } from "../../hooks/BrowserDependant";

export const Page: React.FC<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> = ({ page: Page, bg = false, useCursor = true }) => {
	const isMobile = useIsMobile();
	const isNarrow = useNarrowLayout();
	return (
		<>
			{useCursor && !isMobile ? <CustomCursor /> : null}

			{bg ? <div style={BackgroundStyle}></div> : null}

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
