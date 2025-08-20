// src/components/callingcard/CallingCard.types.ts

import React from "react";
import { ValidComponent } from "../../utils/reactUtils";
export interface ICallingCardProps {
	components: ValidComponent[];
	title?: ValidComponent;
	footer?: ValidComponent;
	fullSpread?: boolean;
	index?: number;
}
