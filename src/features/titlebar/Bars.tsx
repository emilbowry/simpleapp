// src/features/titlebar/Bars.tsx

import React from "react";

import { ITitleBarProps } from "./TitleBar.types";

import { titleBarStyles } from "./TitleBar.styles";
import { usePillBarStyle } from "./TitleBarHelpers";
import { Dropdown, TitleBarUI } from "./TitleBarUI";
import { DropDownTitleBar } from "./TitleBarUIClassed";
const TitleBar: React.FC<ITitleBarProps> = (props) => {
	const finalStyleFn = props.style_fn || titleBarStyles;

	return (
		<TitleBarUI
			{...props}
			style_fn={finalStyleFn}
		>
			{props.children}
		</TitleBarUI>
	);
};

const ExpandableTitleBar: React.FC<ITitleBarProps> = (props) => {
	return (
		<TitleBar {...props}>
			<Dropdown {...props} />
		</TitleBar>
	);
};

const PillTitleBar: React.FC<ITitleBarProps> = (props) => (
	<ExpandableTitleBar
		{...props}
		style_fn={usePillBarStyle}
	/>
);

const PillTitleBarClassed: React.FC<ITitleBarProps> = (props) => (
	<DropDownTitleBar
		{...props}
		style_fn={usePillBarStyle}
	/>
);
export { PillTitleBar, PillTitleBarClassed };
