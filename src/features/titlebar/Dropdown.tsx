// src/components/titlebar/Dropdown.tsx

import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { formatLabel } from "./Bars";
import {
	dropdownContainerStyles,
	dropdownStyles,
	dropdownLinksColumnStyles,
	dropdownLinkStyles,
	dropdownImageContainerStyles,
	dropdownImageStyles,
	dropdownImageViewOverviewStyles,
} from "./TitleBar.styles";
import { ITitleBarLink } from "./TitleBar.types";
import { useActiveLink } from "./TitleBarUI";

const Dropdown: React.FC<{
	activeLinkGroup: ITitleBarLink[];
	onMouseEnter: () => void;
}> = ({ activeLinkGroup, onMouseEnter }) => (
	<div
		style={dropdownContainerStyles}
		onMouseEnter={onMouseEnter}
	>
		<div style={dropdownStyles}>
			{activeLinkGroup.length > 1 && (
				<div style={dropdownLinksColumnStyles}>
					{activeLinkGroup.map((link, index) => (
						<NavLink
							key={`${link.path}-${index}`}
							to={link.path}
							style={dropdownLinkStyles}
						>
							{formatLabel(link.path, link.alias)}
						</NavLink>
					))}
				</div>
			)}
			{activeLinkGroup[0].image && (
				<div style={dropdownImageContainerStyles}>
					<img
						src={activeLinkGroup[0].image}
						alt={`${formatLabel(
							activeLinkGroup[0].path,
							activeLinkGroup[0].alias
						)} overview`}
						style={dropdownImageStyles}
					/>
					<div style={dropdownImageViewOverviewStyles}>
						View overview
						<span style={{ marginLeft: "5px" }}>&rarr;</span>
					</div>
				</div>
			)}
		</div>
	</div>
);

const useDropDownInteractions = (links: ITitleBarLink[][]) => {
	const {
		activeLinkAlias,
		isOverLink,
		isActive,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useActiveLink(links);

	const activeLinkGroup = useMemo(
		() =>
			links.find((linkGroup) => {
				const mainLink = linkGroup[0];
				return (
					mainLink &&
					formatLabel(mainLink.path, mainLink.alias) ===
						activeLinkAlias
				);
			}),
		[links, activeLinkAlias]
	);

	const showDropdown =
		(isOverLink || isActive) &&
		activeLinkGroup &&
		(activeLinkGroup.length > 1 || activeLinkGroup[0].image);

	return {
		activeLinkAlias,
		activeLinkGroup,
		showDropdown,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	};
};

export { Dropdown, useDropDownInteractions };
