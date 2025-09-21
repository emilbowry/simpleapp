// src/components/callingcard/newCallingCard.types.ts
// src/components/callingcard/newCallingCard.types.ts

import { ValidComponent } from "../../utils/reactUtils";

export interface I_NewCallingCardProps {
	components: ValidComponent[];
	header?: ValidComponent;
	body?: ValidComponent;
	footer?: ValidComponent;

	fullSpread?: boolean;
	index?: number;
	styleOverrides?: React.CSSProperties;
}

export interface INewCallingCardProps {
	components: ValidComponent[];
	header?: ValidComponent;
	title?: ValidComponent;
	footer?: ValidComponent;
	fullSpread?: boolean;
	index?: number;
	styleOverrides?: React.CSSProperties;
}
