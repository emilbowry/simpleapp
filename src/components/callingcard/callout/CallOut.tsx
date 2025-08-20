// src/components/callingcard/CallOut.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";

import {
	CallOut_Style,
	CallOutBody_Style,
	CallOutHeader_Style,
	Bordered_TriPartCallout_Style,
} from "./CallOut.styles";

import { ICallOut, IConstructedComponent } from "./CallOut.types";
import { Theme } from "../../../styles";

export class CallOut
	extends React.Component<ICallOut>
	implements IConstructedComponent
{
	public theme;

	constructor(props: ICallOut) {
		super(props);
		const { index = -1 } = this.props;
		this.theme = Theme(index);
	}
	public generateNode(args: any): React.ReactNode {
		const { body } = args;

		return (
			<div style={CallOutBody_Style(this.theme.secondaryColor)}>
				{formatComponent(body)}
			</div>
		);
	}
	render() {
		return (
			<div style={CallOut_Style(this.theme.backgroundColor)}>
				{this.generateNode(this.props)}
			</div>
		);
	}
}

export interface ITriPartCalloutProps extends ICallOut {
	header?: ValidComponent;
	footer?: ValidComponent;
}

export class TriPartCallout extends CallOut {
	props!: ITriPartCalloutProps;

	public generateNode(args: any): React.ReactNode {
		const { header, footer } = args;
		return (
			<>
				{header ? (
					<div style={CallOutHeader_Style(this.theme.primaryColor)}>
						{formatComponent(header)}
					</div>
				) : (
					<></>
				)}
				{super.generateNode(args)}

				{footer ? (
					<div style={CallOutHeader_Style(this.theme.secondaryColor)}>
						{formatComponent(footer)}
					</div>
				) : (
					<></>
				)}
			</>
		);
	}
}

export class Bordered_TriPartCallout extends TriPartCallout {
	render() {
		return (
			<div style={Bordered_TriPartCallout_Style}>{super.render()}</div>
		);
	}
}
