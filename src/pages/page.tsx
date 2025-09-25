// src/pages/page.tsx

import React from "react";
import { Footer } from "./Footer";
import CustomCursor from "../components/cursor/Cursor";

import { TestPillTitleBar as AppTitleBar } from "../components/titlebar/TitleBar";
import { BackgroundStyle } from "../styles";

const pageStyle: React.CSSProperties = {
	flexGrow: "1",
	position: "relative",
	marginTop: "5%",
	flexDirection: "column", // Have to do both
};

export class Page extends React.Component<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> {
	render() {
		const { page: Page, bg = false, useCursor = true } = this.props;

		return (
			<>
				{bg ? <div style={BackgroundStyle}></div> : null}
				{/* <AppTitleBar /> From here */}
				{useCursor ? <CustomCursor /> : null}

				<main
					key={location.pathname}
					style={{
						position: "relative",
						height: "100%",
						maxWidth: "100%",
						overflow: "clip",
						marginTop: "60px", //title bar offset
						display: "flex",
						flexDirection: "column",
						zIndex: "5",
					}}
				>
					<AppTitleBar /> {/* Moved here */}
					<section
						className="aos-ignore"
						style={{
							...pageStyle,
						}}
					>
						<Page />
					</section>
				</main>
				{Footer}
			</>
		);
	}
}
