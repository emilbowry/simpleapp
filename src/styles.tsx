// src/styles.tsx

import React from "react";

import backgroundPattern from "./assets/tileablebackground.png";

export const BackgroundStyle: React.CSSProperties = {
	backgroundImage: `url(${backgroundPattern})`,
	// backgroundPosition: "0 0",
	backgroundRepeat: "repeat",
	backgroundPosition: "center",
	backgroundSize: "cover", // Some reason doesnt work with ContactPage
	backgroundAttachment: "fixed",
	width: "100vw",
	height: "100vh",
	position: "fixed",
	zIndex: -1,
	inset: 0,
	backgroundColor: "#f0f0f0",
	paddingBottom: "100px",
};
import {
	midnight_green,
	dark_midnight_green,
	logo_blue,
	l_midnight_green,
	dark_mix_green,
	light_logo_blue,
	logo_yellow,
	light_mix_green,
	lighter_logo_blue,
	bgwhite,
} from "./utils/defaultColours";
export const borderGrad = `linear-gradient(to right, ${logo_yellow} 0%, ${logo_blue} 100%) 1`;
export const genericSectionStyle: React.CSSProperties = {
	border: "1px solid black",
	backgroundColor: "rgba(255, 0, 0, 0.2)",
	boxSizing: "border-box",
};
export const Theme = (index: number) => {
	const theme = {
		backgroundColor: bgwhite,
		primaryColor: midnight_green,
		secondaryColor: dark_mix_green,
		tertiaryColor: logo_blue,
	};
	if (index === -1) {
		theme.backgroundColor = "transparent";
		theme.primaryColor = light_logo_blue;
		theme.secondaryColor = lighter_logo_blue;
		theme.tertiaryColor = logo_yellow;
	} else if (index % 2 === 1) {
		theme.backgroundColor = dark_midnight_green;
		theme.primaryColor = light_logo_blue;
		theme.secondaryColor = lighter_logo_blue;
		theme.tertiaryColor = logo_yellow;
		// theme.backgroundColor = light_mix_green;
		// theme.primaryColor = dark_midnight_green;
		// theme.secondaryColor = dark_mix_green;
		// theme.tertiaryColor = midnight_green;
	}
	return theme;
};
/* 
// src/styles.tsx
The following is an excerpt of the file  src/styles.tsx, so dont worry about the missing imports, they exist in the actual file
*/

// interface IPanelProps {
// 	isActive?: boolean;
// 	children?: React.ReactNode;
// }

// interface IPanelProps {
// 	isActive?: boolean;
// 	children?: React.ReactNode;
// }

// export class BasePanel extends ThemedComponent<IPanelProps> {
// 	static {
// 		this.styler.updateStyle("panel_style", {
// 			def_static_css: {
// 				padding: "20px",
// 				border: "1px solid",
// 				borderRadius: "8px",
// 				transition: "all 0.2s ease-in-out",
// 			},
// 			def_theme_args: {
// 				backgroundColor: ["backgroundColor"],
// 				primaryColor: ["color"],
// 				secondaryColor: ["borderColor"],
// 			},
// 			def_styling_function: (isActive: boolean) => {
// 				console.log(`isa:${isActive}`);
// 				return {
// 					transform: isActive ? "scale(1.02)" : "scale(1)",
// 					boxShadow: isActive ? "0px 4px 12px red" : "none",
// 				};
// 			},
// 			def_default_args: [false],
// 		});
// 	}

// 	render() {
// 		const styler =
// 			this.styler || (this.constructor as typeof ThemedComponent).styler;
// 		const baseKey: TName = "panel_style";
// 		const styleKey =
// 			this.props.themeId !== undefined
// 				? `${baseKey}.${this.props.themeId}`
// 				: baseKey;
// 		const finalStyle = styler[styleKey]?.call(this.props.isActive);

// 		return <div style={finalStyle}>{this.props.children}</div>;
// 	}
// }

// export class CardPanel extends BasePanel {
// 	static {
// 		this.styler.updateStyle("panel_style", {
// 			def_static_css: {
// 				borderRadius: "12px",
// 				fontWeight: "bold",
// 			},
// 			def_theme_args: {
// 				tertiaryColor: ["borderColor"],
// 			},
// 		});
// 	}
// }

// export const ComponentShowcase: React.FC = () => {
// 	const overrideStyle = CardPanel.styler.applyOverride("panel_style", {
// 		borderStyle: "dashed",
// 		color: "red",
// 	});

// 	return (
// 		<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
// 			<h3>Demonstrating CardPanel Variations:</h3>

// 			<CardPanel>Default Card Panel (Inherited Style)</CardPanel>

// 			<CardPanel isActive={true}>
// 				Active Card Panel (Dynamic Style)
// 			</CardPanel>

// 			<CardPanel themeId={0}>
// 				Card Panel with Theme 0 (Instance Style)
// 			</CardPanel>

// 			<CardPanel
// 				themeId={1}
// 				isActive={true}
// 			>
// 				Active Card Panel with Theme 1 (Instance + Dynamic)
// 			</CardPanel>

// 			<div style={{ ...overrideStyle }}>
// 				A div with CardPanel's style + a runtime override
// 			</div>
// 		</div>
// 	);
// };
