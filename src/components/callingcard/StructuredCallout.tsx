// src/components/callingcard/StructuredCallout.tsx

import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import { renderMatches } from "react-router-dom";
import styles from "./CallingCard.module.css";
import { getImageEl, formatComponent } from "../../utils/reactUtils";
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
	title: string | React.ReactNode;
	description: string | React.ReactNode;
	image?: string;
}

// Implementation

export const StructuredCallOutTitle: React.FC<{
	heading: string | React.ReactNode;
}> = ({ heading }) => {
	return (
		<h2 className={style_StructuredCallOutTitle}>
			{formatComponent(heading)}
		</h2>
	);
};

export const StructuredCallOutDescription: React.FC<{
	desc: string | React.ReactNode;
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
			<div style={_style_BorderedCalloutHeading}>{args.title}</div>
		);

		const reformed = super.generateNode(_args);
		return reformed;
	}
}
