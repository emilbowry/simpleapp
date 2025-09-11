// src/components/callingcard/CallOut.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";

import {
	_CallOut_Style,
	_CallOutBody_Style,
	_CallOutHeader_Style,
	_CallOutFooter_Style,
	_Bordered_TriPartCallout_Style,
} from "./CallOut.styles";

import { ICallOut, IConstructedComponent } from "./CallOut.types";

import { IThemedComponentProps, ThemedComponent } from "../../../test_copy";
export class CallOut
	extends ThemedComponent<ICallOut>
	implements IConstructedComponent
{
	static {
		this.declareStyle("CallOutBody", {
			static_css: {
				width: "100%",
			},
			theme_args: {
				secondaryColor: ["color"],
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

	constructor(props: ICallOut) {
		super(props);
	}

	Container(arg?: any): React.ReactNode {
		console.log(
			this.getStyle("CallOutContainer", [], this.props.styleOverides)
		);

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
		console.log(this.getStyle("CallOutBody"));
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

export class TriPartCallout extends CallOut {
	props!: ITriPartCalloutProps & IThemedComponentProps; //fix this
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
					<div style={this.getStyle("footer_Style")}>
						{formatComponent(footer)}
					</div>
				) : (
					<></>
				)}
			</>
		);
	};
}

export class Bordered_TriPartCallout extends TriPartCallout {
	CallOut_WrapperStyle(): React.CSSProperties | undefined {
		return _Bordered_TriPartCallout_Style;
	}
}
