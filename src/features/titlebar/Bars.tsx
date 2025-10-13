// src/features/titlebar/Bars.tsx

import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { ITitleBarProps } from "./TitleBar.types";

import { Dropdown, useDropDownInteractions } from "./Dropdown";
import { _titleBarStyles, pillBarOverrides } from "./TitleBar.styles";
import { formatLabel, TitleBarUI, usePillOnScroll } from "./TitleBarUI";

const TitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const location = useLocation();
	const activeLink = useMemo(() => {
		const currentPath = location.pathname;
		for (const linkGroup of links) {
			for (const subLink of linkGroup) {
				if (subLink.path === currentPath) {
					return formatLabel(linkGroup[0].path, linkGroup[0].alias);
				}
			}
		}
		return formatLabel(links[0][0].path, links[0][0].alias);
	}, [location.pathname, links]);

	return (
		<TitleBarUI
			links={links}
			barStyle={_titleBarStyles()}
			activeLinkAlias={activeLink}
			onLinkOver={() => {}}
			onWrapperMouseLeave={() => {}}
		/>
	);
};
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

const PillTitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const {
		activeLinkAlias,
		activeLinkGroup,
		showDropdown,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useDropDownInteractions(links);
	const isScrolled = usePillOnScroll();

	const titleBarStyles = useMemo(
		() => ({
			..._titleBarStyles(),
			transition: "all 0.5s ease-in-out",
			...(isScrolled ? pillBarOverrides : {}),
		}),
		[isScrolled]
	);

	return (
		<TitleBarUI
			links={links}
			barStyle={titleBarStyles}
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
export { ExpandableTitleBar, PillTitleBar, TitleBar };
