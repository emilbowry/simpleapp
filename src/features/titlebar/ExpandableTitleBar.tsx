// src/features/titlebar/ExpandableTitleBar.tsx

import React from "react";
import { _titleBarStyles } from "./TitleBar.styles";
import { ITitleBarProps } from "./TitleBar.types";
import { TitleBarUI } from "./TitleBarUI";
import { Dropdown, useDropDownInteractions } from "./Dropdown";
const ExpandableTitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const {
		activeLinkAlias,
		activeLinkGroup,
		showDropdown,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useDropDownInteractions(links);

	return (
		<TitleBarUI
			links={links}
			barStyle={_titleBarStyles()}
			activeLinkAlias={activeLinkAlias}
			onLinkOver={handleLinkOver}
			onWrapperMouseLeave={handleAreaLeave}
		>
			{showDropdown && activeLinkGroup && (
				<Dropdown
					activeLinkGroup={activeLinkGroup}
					onMouseEnter={handleAreaEnter}
				/>
			)}
		</TitleBarUI>
	);
};
