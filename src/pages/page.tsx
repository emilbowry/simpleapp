// src/pages/page.tsx

import React from "react";
import { Footer } from "./Footer";
import CustomCursor from "../components/cursor/Cursor";

import { TestPillTitleBar as AppTitleBar } from "../components/titlebar/TitleBar";
import { BackgroundStyle } from "../styles";
import { VISIBLE_TITLEBAR_HEIGHT } from "../components/titlebar/TitleBar.consts";

const pageStyle: React.CSSProperties = {
	flexGrow: "1",
	position: "relative",
	flexDirection: "column", // Have to do both
};

export const Page: React.FC<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> = ({ page: Page, bg = false, useCursor = true }) => {
	return (
		<>
			{bg ? <div style={BackgroundStyle}></div> : null}
			{useCursor ? <CustomCursor /> : null}

			<main
				key={location.pathname}
				style={{
					position: "relative",
					height: "100%",
					maxWidth: "100%",
					overflow: "clip",
					display: "flex",
					flexDirection: "column",
					zIndex: "5",
				}}
			>
				<AppTitleBar />
				<div
					style={
						{
							// height: "5vh",
						}
					}
				/>
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

			{bg ? Footer : null}
		</>
	);
};
