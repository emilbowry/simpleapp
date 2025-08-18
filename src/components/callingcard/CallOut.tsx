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
	public calloutStyle: React.CSSProperties = {
		marginLeft: "10px",
		paddingTop: "10px",
		paddingBottom: "10px",
		marginRight: "10px",
		textAlign: "center",
		// maxWidth: "100%",
	};
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
		return <div style={this.calloutStyle}>{component}</div>;
	}
}
