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
	paddingTop: "10px",
	borderBottom: "2px solid",
	paddingBottom: "10px",
};

export const style_BorderedCalloutHeading = `${_style_BorderedCalloutHeading}`;

// Typing

interface IStructuredCallout extends ICallOut {
	data: IStructuredCalloutData;
}
export interface IStructuredCalloutData {
	title: ValidComponent;
	description: ValidComponent;
	image?: string;
}

// Implementation

export const StructuredCallOutTitle: React.FC<{
	heading: ValidComponent;
}> = ({ heading }) => {
	return (
		<h2 className={style_StructuredCallOutTitle}>
			{formatComponent(heading)}
		</h2>
	);
};

export const StructuredCallOutDescription: React.FC<{
	desc: ValidComponent;
}> = ({ desc }) => {
	return (
		<p className={style_StructuredCallOutBody}>{formatComponent(desc)}</p>
	);
};

export class StructuredCallout extends CallOut {
	props!: IStructuredCallout;
	public generateNode(args: IStructuredCalloutData) {
		const { title, description, image } = args;

		return (
			<div>
				{getImageEl(image)}
				<StructuredCallOutTitle heading={title} />
				<StructuredCallOutDescription desc={description} />
			</div>
		);
	}
}

export class BorderdCallout extends StructuredCallout {
	public generateNode(args: IStructuredCalloutData) {
		let _args = args;

		_args.title = (
			<div style={_style_BorderedCalloutHeading}>{!args.title}</div> //  [TODO] check that assertion is valid
		);

		const reformed = super.generateNode(_args);
		return reformed;
	}
}

export interface IFlexiCalloutProps {
	component: ValidComponent;
}
export class FlexiCallout extends CallOut {
	public static flexiCallotStyle: React.CSSProperties = {
		marginLeft: "10px",
		paddingTop: "10px",
		paddingBottom: "10px",
		marginRight: "10px",
		color: body_font_colour,
		fontSize: "3rem",
		textAlign: "center",
		alignContent: "center",
		alignSelf: "start",
		overflowY: "auto", // Allows vertical scrolling if content overflows
	};
	generateNode(args: IFlexiCalloutProps) {
		console.log(args.component);
		return (
			<div
				style={{
					...FlexiCallout.flexiCallotStyle,
					..._style_BorderedCalloutHeading,
				}}
			>
				{formatComponent(args.component)}
			</div>
		);
	}
}
