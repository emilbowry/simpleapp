// src/components/callingcard/CallOut.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";

import {
	_CallOut_Style,
	_CallOutBody_Style,
	_CallOutHeader_Style,
	_CallOutFooter_Style,
} from "./CallOut.styles";

import {
	ICallOut,
	IConstructedComponent,
	ITriPartCalloutProps,
} from "./CallOut.types";

import { ThemedComponent } from "../../../themecomp_v2";

export class CallOut<P extends ICallOut = ICallOut>
	extends ThemedComponent<P>
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
						CallOut.styler["CallOutContainer_style"]),
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
					(this.constructor as typeof CallOut).styler[
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

export class TriPartCallout extends CallOut<ITriPartCalloutProps> {
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
					<div style={TriPartCallout.styler["header_style"]}>
						{formatComponent(header)}
					</div>
				)}

				{super.Content()}

				{footer && (
					<div style={TriPartCallout.styler["footer_style"]}>
						{formatComponent(footer)}
					</div>
				)}
			</>
		);
	};
}

// export class HexWrapCallOut extends TriPartCallout {
// 	static {
// 		HexWrapCallOut.styler.updateStyle("wrapperStyle_style", {
// 			def_static_css: {
// 				...hexCallStyle,
// 				// backgroundColor: "tranparent",
// 			},
// 		});
// 	}
// }
