// src/components/callingcard/CallingCard.types.ts

import { ValidComponent } from "../../utils/reactUtils";

interface ICallOutProps {
	content: ValidComponent;
	wrapper_style?: React.CSSProperties;
	styleOverrides?: React.CSSProperties;
}
interface IHeaderProps extends ICallOutProps {}

interface IFooterProps extends ICallOutProps {}

interface IContainerProps {
	components: ValidComponent[];
	styleOverrides?: React.CSSProperties;
}
interface IGridBodyProps extends IContainerProps {
	columnOverrides?: string;
}
interface ICallingCardProps {
	components: ValidComponent[];
	header?: ValidComponent;
	footer?: ValidComponent;
	fullSpread?: boolean;
	index?: number;
	styleOverrides?: React.CSSProperties;
	isPageElement?: boolean;
}

interface IGridItemProps {
	content: ValidComponent;
	styleOverrides?: React.CSSProperties;
	item_key: React.Key | null | undefined;
}

export type {
	ICallOutProps,
	IHeaderProps,
	IFooterProps,
	ICallingCardProps,
	IGridBodyProps,
	IGridItemProps,
};
