// src/features/titlebar/Bars.tsx

import React from "react";

import { ITitleBarProps } from "./TitleBar.types";

import { titleBarStyles } from "./TitleBar.styles";
import { TitleBarUI, usePillBarStyle } from "./TitleBarUI";

const TitleBar: React.FC<ITitleBarProps> = (props) => {
	// Correctly use the provided style_fn, or fallback to the default static style
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
		<TitleBar
			{...props}
			hasDropdown={true}
		/>
	);
};

const PillTitleBar: React.FC<ITitleBarProps> = (props) => (
	<ExpandableTitleBar
		{...props}
		// Pass the style hook function as the style_fn prop
		style_fn={usePillBarStyle}
	/>
);
export { ExpandableTitleBar, PillTitleBar, TitleBar };
