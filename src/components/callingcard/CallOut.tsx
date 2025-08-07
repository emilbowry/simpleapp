// src/components/callingcard/CallOut.tsx

import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import { renderMatches } from "react-router-dom";
import styles from "./CallingCard.module.css";

interface ICallOut {
	data: any;
}

interface IStructuredCallout extends ICallOut {
	data: IStructuredCalloutData;
}

interface IConstructedComponent {
	generateNode(args: ICallOut): React.ReactNode;
}
class CallOut
	extends React.Component<ICallOut>
	implements IConstructedComponent
{
	public generateNode(args: any): React.ReactNode {
		return <></>;
	}
	render() {
		const { data } = this.props;
		const component = this.generateNode(data);
		return component;
	}
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
		console.log(image);

		return (
			<div>
				{image ? <img src={image}></img> : <></>}
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

export interface I_CallOutProps {
	Component: React.ComponentType;
}
export class _CallOut extends React.Component<I_CallOutProps> {
	render() {
		const { Component } = this.props;
		return <Component />;
	}
}
