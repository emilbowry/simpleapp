// src/features/titlebar/Bars.tsx

import React from "react";

import { ITitleBarProps } from "./TitleBar.types";

import { titleBarStyles } from "./TitleBar.styles";
import {
	Dropdown,
	TitleBarUI,
	useDropDownInteractions,
	usePillBarStyle,
} from "./TitleBarUI";

const TitleBar: React.FC<ITitleBarProps> = (props) => {
	return (
		<TitleBarUI
			{...props}
			style_fn={props.style_fn || titleBarStyles}
		>
			{props.children}
		</TitleBarUI>
	);
};
const ExpandableTitleBar: React.FC<ITitleBarProps> = (props) => {
	const { activeLinkGroup, showDropdown, onMouseEnter } =
		useDropDownInteractions(props.links);

	return (
		<TitleBar {...props}>
			{showDropdown && activeLinkGroup && (
				<Dropdown
					activeLinkGroup={activeLinkGroup}
					onMouseEnter={onMouseEnter}
				/>
			)}
		</TitleBar>
	);
};

const PillTitleBar: React.FC<ITitleBarProps> = (props) => (
	<ExpandableTitleBar
		{...props}
		style_fn={usePillBarStyle}
	/>
);
export { ExpandableTitleBar, PillTitleBar, TitleBar };
