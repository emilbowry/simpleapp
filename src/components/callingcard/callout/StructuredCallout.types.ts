// src/components/callingcard/callout/StructuredCallout.types.ts

import React from "react";
import { ValidComponent } from "../../../utils/reactUtils";
import { ICallOut } from "./CallOut.types";
export interface IStructuredCallout extends ICallOut {
	data: IStructuredCalloutData;
}
export interface IStructuredCalloutData {
	title: ValidComponent;
	subtitle?: ValidComponent;
	body: ValidComponent;
	image?: string;
	index?: number;
}
