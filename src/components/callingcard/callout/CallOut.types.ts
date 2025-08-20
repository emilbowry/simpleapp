// src/components/callingcard/callout/CallOut.types.ts

import React from "react";
import { ValidComponent } from "../../../utils/reactUtils";

export interface IConstructedComponent {
	generateNode(args: ICallOut): React.ReactNode;
}

export interface ICallOut {
	body: ValidComponent;
	index?: number;
}

export interface IStructuredCalloutData {
	header?: ValidComponent;
	footer?: ValidComponent;
}
