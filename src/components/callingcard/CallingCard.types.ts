// src/components/callingcard/CallingCard.types.ts

import { ValidComponent } from "../../utils/reactUtils";

export interface ICallOutProps {
	content: ValidComponent;
	wrapper_style?: React.CSSProperties;
	styleOverrides?: React.CSSProperties;
}
export interface IHeaderProps extends ICallOutProps {}

export interface IFooterProps extends ICallOutProps {}

export interface IContainerProps {
	components: ValidComponent[];
	styleOverrides?: React.CSSProperties;
}
export interface IGridBodyProps extends IContainerProps {
	columnOverrides?: string;
}
export interface ICallingCardProps {
	components: ValidComponent[];
	header?: ValidComponent;
	footer?: ValidComponent;
	fullSpread?: boolean;
	index?: number;
	styleOverrides?: React.CSSProperties;
	isPageElement?: boolean;
}

export interface IGridItemProps {
	content: ValidComponent;
	styleOverrides?: React.CSSProperties;
	item_key: React.Key | null | undefined;
}
