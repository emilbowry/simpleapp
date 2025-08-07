import React from "react";
import { _CallOut, I_CallOutProps } from "./CallOut";

export interface ILogoBoxProps extends I_CallOutProps {
	scale: number;
}
export class LogoBox extends React.Component<ILogoBoxProps> {
	render() {
		const { Component } = this.props;
		return <Component />;
	}
}
