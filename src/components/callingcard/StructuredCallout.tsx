// src/components/callingcard/StructuredCallout.tsx

import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import { renderMatches } from "react-router-dom";
import styles from "./CallingCard.module.css";
import { getImageEl } from "../../utils/reactUtils";
import { CallOut, ICallOut } from "./CallOut";
interface IStructuredCallout extends ICallOut {
	data: IStructuredCalloutData;
}

export interface IStructuredCalloutData {
	title: string | React.ReactNode;
	description: string | React.ReactNode;
	image?: string;
}

export const StructuredCallOutTitle: React.FC<{
	heading: string | React.ReactNode;
}> = ({ heading }) => {
	return <h2 className={styles.structuredCalloutHeading}>{heading}</h2>;
};

export const StructuredCallOutDescription: React.FC<{
	desc: string | React.ReactNode;
}> = ({ desc }) => {
	return <p className={styles.structuredCalloutDescription}>{desc}</p>;
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
			<div className={styles.borderedCalloutHeading}>{args.title}</div>
		);

		const reformed = super.generateNode(_args);
		return reformed;
	}
}
