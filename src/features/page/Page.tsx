// src/features/page/page.tsx

import React from "react";
import { CustomCursor } from "../../components/cursor/Cursor";
import { Footer } from "../footer/Footer";

import dropdownImage from "../../assets/aicwork.jpg";
import logo from "../../assets/logo.png";
import { useIsMobile } from "../../hooks/BrowserDependant";
import { useNarrowLayout } from "../../hooks/WindowSizeDependent";
import { BackgroundStyle } from "../../styles";

import { PillTitleBar } from "../titlebar/TitleBar";
import { VISIBLE_TITLEBAR_HEIGHT } from "../titlebar/TitleBar.consts";
import { ITitleBarLink } from "../titlebar/TitleBar.types";
import { MainStyle, PageStyle } from "./Page.styles";
const navLinks: ITitleBarLink[][] = [
	[
		{ path: "/", alias: "Home", image: dropdownImage },
		{ path: "/demo_and_testing", alias: "Demo Page" },
		{ path: "/dpotool", alias: "DPO Tool" },
	],
	[{ path: "/thejourney", alias: "The Journey" }],

	[{ path: "/ourservices", alias: "Our Services" }],
	[{ path: "/contact", alias: "Contact" }],
];

const Page: React.FC<{
	page: React.FC;
	bg?: boolean;
	useCursor?: boolean;
}> = ({ page: Page, bg = true, useCursor = true }) => {
	const isMobile = useIsMobile();
	const isNarrow = useNarrowLayout();
	return (
		<>
			{useCursor && !isMobile ? <CustomCursor /> : null}

			{bg ? <div style={BackgroundStyle}></div> : null}

			<PillTitleBar
				logo_src={logo}
				Links={navLinks}
			/>
			<main
				key={location.pathname}
				style={{
					...MainStyle,
				}}
			>
				<section
					className="aos-ignore"
					style={{
						position: "absolute",
						...PageStyle,
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

export { Page };
