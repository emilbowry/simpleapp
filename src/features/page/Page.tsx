// src/features/page/page.tsx

import React from "react";
import { Footer } from "../footer/Footer";
import { CustomCursor } from "../../components/cursor/Cursor";

import { BackgroundStyle } from "../../styles";
import { VISIBLE_TITLEBAR_HEIGHT } from "../titlebar/TitleBar.consts";
import { AppTitleBar } from "../titlebar/Bars";
import { mainStyle, pageStyle } from "./Page.styles";

export const Page: React.FC<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> = ({ page: Page, bg = false, useCursor = true }) => {
	return (
		<>
			{bg ? <div style={BackgroundStyle}></div> : null}
			{useCursor ? <CustomCursor /> : null}
			<AppTitleBar />

			<main
				key={location.pathname}
				style={mainStyle}
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
