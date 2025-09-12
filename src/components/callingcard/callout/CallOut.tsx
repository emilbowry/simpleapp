// src/components/callingcard/CallOut.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";

import {
	_CallOut_Style,
	_CallOutBody_Style,
	_CallOutHeader_Style,
	_CallOutFooter_Style,
} from "./CallOut.styles";

import { ICallOut, IConstructedComponent } from "./CallOut.types";

export class CallOut<P extends ICallOut = ICallOut>
	extends ThemedComponent<P>
	implements IConstructedComponent
{
	static {
		this.declareStyle("CallOutBody", {
			static_css: {
				width: "100%",
			},
			theme_args: {
				primaryColor: ["color"],
			},
		});
		this.declareStyle("CallOutContainer", {
			static_css: {
				width: "100%",

				display: "flex",
				flexDirection: "column",
			},
			theme_args: {
				backgroundColor: ["backgroundColor"],
			},
		});
	}

	constructor(props: P) {
		super(props);
	}

	Container(arg?: any): React.ReactNode {
		return (
			<div
				style={this.getStyle(
					"CallOutContainer",
					[],
					this.props.styleOverides
				)}
			>
				{this.Content()}
			</div>
		);
	}
	Content(): React.ReactNode {
		return (
			<div style={this.getStyle("CallOutBody")}>
				{formatComponent(this.props.body)}
			</div>
		);
	}

	public generateNode(args?: any): React.ReactNode {
		const wrapperStyle = this.getStyle("wrapperStyle");
		return Object.keys(wrapperStyle).length ? (
			<div style={wrapperStyle}>{this.Container(args)}</div>
		) : (
			<>{this.Container(args)}</>
		);
	}
	render() {
		return this.generateNode();
	}
}
export interface ITriPartCalloutProps extends ICallOut {
	header?: ValidComponent;
	footer?: ValidComponent;
}

export class TriPartCallout extends CallOut<ITriPartCalloutProps> {
	static {
		this.declareStyle("header_style", {
			theme_args: {
				primaryColor: ["color"],
			},
		});
		this.declareStyle("footer_style", {
			theme_args: {
				secondaryColor: ["color"],
			},
		});
	}

	Content = (): React.ReactNode => {
		const { header, footer } = this.props;
		return (
			<>
				{header ? (
					<div style={this.getStyle("header_style")}>
						{formatComponent(header)}
					</div>
				) : (
					<></>
				)}
				{super.Content()}

				{footer ? (
					<div style={this.getStyle("footer_style")}>
						{formatComponent(footer)}
					</div>
				) : (
					<></>
				)}
			</>
		);
	};
}

// class HexWrapCallOut extends TriPartCallout {
// 	static {
// 		this.declareStyle("wrapperStyle", {
// 			styleOverides: { ...hexCallStyle, backgroundColor: "transparent" },
// 		});
// 	}
// }

import { ThemedComponent as ThemedComponent_ALT } from "../../../themecomp_v2";
import { hexCallStyle } from "../../../pages/homepage/parts/about-us.tsx/AboutUs.styles";
import { ThemedComponent } from "../../../themecomp_v1";
type TName = `${string}_style`;

export class CallOut_ALT<P extends ICallOut = ICallOut> // <-- USES ORIGINAL INTERFACE
	extends ThemedComponent_ALT<P>
	implements IConstructedComponent
{
	static {
		this.styler.updateStyle("CallOutBody_style", {
			def_static_css: {
				width: "100%",
			},
			def_theme_args: {
				primaryColor: ["color"],
			},
		});
		this.styler.updateStyle("CallOutContainer_style", {
			def_static_css: {
				width: "100%",
				display: "flex",
				flexDirection: "column",
			},
			def_theme_args: {
				backgroundColor: ["backgroundColor"],
			},
		});
	}

	constructor(props: P) {
		super(props);
	}

	Container(arg?: any): React.ReactNode {
		return (
			<div
				style={{
					...(this.styler?.["CallOutContainer_style"] ||
						CallOut_ALT.styler["CallOutContainer_style"]),
				}}
			>
				{this.Content()}
			</div>
		);
	}

	Content(): React.ReactNode {
		return (
			<div
				style={
					this.styler?.["CallOutBody_style"] ||
					(this.constructor as typeof CallOut_ALT).styler[
						"CallOutContainer_style"
					]
				}
			>
				{formatComponent(this.props.body)}
			</div>
		);
	}

	public generateNode(args?: any): React.ReactNode {
		const wrapperStyle = this.styler?.["wrapperStyle_style"]; //instance declaration
		return wrapperStyle ? (
			<div style={wrapperStyle}>{this.Container(args)}</div>
		) : (
			<>
				{this.Container(args)}
				{console.log("alt")}
			</>
		);
	}

	render() {
		return this.generateNode();
	}
}

export class TriPartCallout_ALT extends CallOut_ALT<ITriPartCalloutProps> {
	static {
		this.styler.updateStyle("header_style", {
			def_theme_args: {
				primaryColor: ["color"],
			},
		});
		this.styler.updateStyle("footer_style", {
			def_theme_args: {
				secondaryColor: ["color"],
			},
		});
	}

	Content = (): React.ReactNode => {
		const { header, footer } = this.props;
		return (
			<>
				{header && (
					<div style={TriPartCallout_ALT.styler["header_style"]}>
						{formatComponent(header)}
					</div>
				)}

				{super.Content()}

				{footer && (
					<div style={TriPartCallout_ALT.styler["footer_style"]}>
						{formatComponent(footer)}
					</div>
				)}
			</>
		);
	};
}

// export class HexWrapCallOut_ALT extends TriPartCallout_ALT {
// 	static {
// 		HexWrapCallOut_ALT.styler.updateStyle("wrapperStyle_style", {
// 			def_static_css: {
// 				...hexCallStyle,
// 				// backgroundColor: "tranparent",
// 			},
// 		});
// 	}
// }
