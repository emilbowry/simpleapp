// src/components/callingcard/StructuredCallout.tsx

import React from "react";

import {
	getImageEl,
	formatComponent,
	ValidComponent,
} from "../../utils/reactUtils";
import { CallOut, ICallOut } from "./CallOut";
// imp
import {
	title_font_colour,
	body_font_colour,
} from "../../utils/defaultColours";
import { Theme } from "../../styles";
// Styling

const _style_structuredCalloutTitle: React.CSSProperties = {
	color: title_font_colour,
};
export const style_StructuredCallOutTitle = `${_style_structuredCalloutTitle}`;

const _style_structuredCalloutBody: React.CSSProperties = {
	color: body_font_colour,
};
export const style_StructuredCallOutBody = `${_style_structuredCalloutBody}`;

const _style_BorderedCalloutHeading: React.CSSProperties = {
	borderTop: "2px solid",
	// paddingTop: "10px",
	borderBottom: "2px solid",
	// paddingBottom: "10px",
};

export const style_BorderedCalloutHeading = `${_style_BorderedCalloutHeading}`;

interface IStructuredCallout extends ICallOut {
	data: IStructuredCalloutData;
}
export interface IStructuredCalloutData {
	title: ValidComponent;
	subtitle?: ValidComponent;
	body: ValidComponent;
	image?: string;
	index?: number;
}

// Implementation

export class StructuredCallout extends CallOut {
	props!: IStructuredCallout;
	public generateNode(args: IStructuredCalloutData) {
		const { title, body, image, subtitle, index = 0 } = args;
		const theme = Theme(index);
		const StructuredCallOutTitle: React.FC<{
			heading: ValidComponent;
		}> = ({ heading }) => {
			return (
				<div style={{ color: theme.primaryColor }}>
					{formatComponent(heading)}
				</div>
			);
		};
		const StructuredCallOutSubTitle: React.FC<{
			subtitle: ValidComponent;
		}> = ({ subtitle }) => {
			return (
				<div style={{ color: theme.tertiaryColor }}>
					{formatComponent(subtitle)}
				</div>
			);
		};
		const StructuredCallOutDescription: React.FC<{
			desc: ValidComponent;
		}> = ({ desc }) => {
			return (
				<div style={{ color: theme.secondaryColor }}>
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

export interface IStructuredCalloutData {
	title: ValidComponent;
	subtitle?: ValidComponent;
	body: ValidComponent;
	image?: string;
	index?: number;
}
export class BorderdCallout extends StructuredCallout {
	public generateNode(args: IStructuredCalloutData) {
		let _args = args;
		console.log(args);

		_args.title = (
			<div style={_style_BorderedCalloutHeading}>
				{formatComponent(args.title)}
			</div> //  [TODO] check that assertion is valid
		);

		const reformed = super.generateNode(_args);
		return reformed;
	}
}

export interface IFlexiCalloutProps {
	component: ValidComponent;
}

export class FlexiCallout extends StructuredCallout {
	public static flexiCallotStyle: React.CSSProperties = {
		color: body_font_colour,
		display: "block",
	};
	generateNode(args: IStructuredCalloutData) {
		// console.log(args.component);
		return (
			<div
				style={{
					...FlexiCallout.flexiCallotStyle,
					..._style_BorderedCalloutHeading,
				}}
			>
				<StructuredCallout {...this.props} />
				{/* {super.generateNode(args.component, index=this.index)} */}
			</div>
		);
	}
}
