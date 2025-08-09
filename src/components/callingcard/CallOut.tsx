// src/components/callingcard/CallOut.tsx

import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import { renderMatches } from "react-router-dom";

export interface ICallOut {
	data: any;
}

interface IConstructedComponent {
	generateNode(args: ICallOut): React.ReactNode;
}
export class CallOut
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

//Old code, need to change the implementations to fit new
export interface I_CallOutProps {
	Component: React.ComponentType;
}
export class _CallOut extends React.Component<I_CallOutProps> {
	render() {
		const { Component } = this.props;
		return <Component />;
	}
}
