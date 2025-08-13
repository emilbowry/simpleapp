// src/components/callingcard/CallOut.tsx

import React from "react";
import { formatComponent } from "../../utils/reactUtils";
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
		try {
			return formatComponent(args);
		} catch (error) {
			return <></>;
		}
	}
	render() {
		const { data } = this.props;
		const component = this.generateNode(data);
		return component;
	}
}
