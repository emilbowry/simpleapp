// src/components/callingcard/StructuredCallout.tsx
// impports

import React from "react";

import {
	getImageEl,
	formatComponent,
	ValidComponent,
} from "../../../utils/reactUtils";
import { CallOut, ITriPartCalloutProps, TriPartCallout } from "./CallOut";
import { ICallOut } from "./CallOut.types";
import {
	title_font_colour,
	body_font_colour,
} from "../../../utils/defaultColours";
import { Theme } from "../../../styles";
import { _style_BorderedCalloutHeading } from "./StructuredCallout.styles";
import {
	IStructuredCallout,
	IStructuredCalloutData,
} from "./StructuredCallout.types";
// Typing

// Styling

// Implementation

export class StructuredCallout extends CallOut {
	props!: IStructuredCallout;
	public generateNode(args: IStructuredCalloutData) {
		const { title, body, image, subtitle, index = 0 } = args;
		const StructuredCallOutTitle: React.FC<{
			heading: ValidComponent;
		}> = ({ heading }) => {
			return (
				<div style={{ color: this.theme.primaryColor }}>
					{formatComponent(heading)}
				</div>
			);
		};
		const StructuredCallOutSubTitle: React.FC<{
			subtitle: ValidComponent;
		}> = ({ subtitle }) => {
			return (
				<div style={{ color: this.theme.tertiaryColor }}>
					{formatComponent(subtitle)}
				</div>
			);
		};
		const StructuredCallOutDescription: React.FC<{
			desc: ValidComponent;
		}> = ({ desc }) => {
			return (
				<div style={{ color: this.theme.secondaryColor }}>
					{formatComponent(desc)}
				</div>
			);
		};
		return (
			<div>
				{/* <div style={{ maxWidth: "100%" }}> */}
				{image ? getImageEl(image) : <></>}
				<StructuredCallOutTitle heading={title} />

				{subtitle ? (
					<StructuredCallOutSubTitle subtitle={subtitle} />
				) : (
					<></>
				)}

				<StructuredCallOutDescription desc={body} />
			</div>
		);
	}
}

export class BorderdCallout extends StructuredCallout {
	public generateNode(args: IStructuredCalloutData) {
		let _args = args;

		_args.title = (
			<div style={_style_BorderedCalloutHeading}>
				{formatComponent(args.title)}
			</div>
		);

		const reformed = super.generateNode(_args);
		return reformed;
	}
}

export interface IFlexiCalloutProps {
	component: ValidComponent;
}
export const flexiCallotStyle = (colour: string): React.CSSProperties => ({
	color: colour,
	display: "block",
});
// export class FlexiCallout extends TriPartCallout {
// 	generateNode(args: ITriPartCalloutProps) {
// 		return (
// 			<div
// 				style={{
// 					...flexiCallotStyle(title_font_colour),
// ..._style_BorderedCalloutHeading,
// 				}}
// 			>
// 				{/* <StructuredCallout {...this.props} /> */}
// 				{super.generateNode(this.props)}
// 			</div>
// 		);
// 	}
// }
