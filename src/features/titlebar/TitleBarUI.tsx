// src/features/titlebar/TitleBarUI.tsx

import React, { createContext, useContext, useMemo, useState } from "react";
import {
	dropdownContainerStyles,
	interactionWrapperStyles,
} from "./TitleBar.styles";
import {
	ITitleBarLink,
	ITitleBarProps,
	ITitleBarUIState,
} from "./TitleBar.types";
import {
	DropDownOuter,
	formatLabel,
	TitleBarLogo,
	TitleBarMenu,
	TitleBarUILinks,
} from "./TitleBarHelpers";
const UICTX = createContext<ITitleBarUIState | undefined>(undefined);
const useCurrentActiveLinkAlias = (links: ITitleBarLink[][]) => {
	return useMemo(() => {
		for (const linkGroup of links) {
			for (const subLink of linkGroup) {
				if (subLink.path === window.location.pathname) {
					return formatLabel(linkGroup[0].path, linkGroup[0].alias);
				}
			}
		}
		return formatLabel(links[0][0].path, links[0][0].alias);
	}, [location.pathname, links]);
};
const useUIState = (links: ITitleBarLink[][]) => {
	const initialActiveAlias = useCurrentActiveLinkAlias(links);
	const [activeLinkAlias, setActiveLinkAlias] = useState(initialActiveAlias);
	const [isOverLink, setIsOverLink] = useState(false);
	const [isActive, setIsActive] = useState(false);

	return {
		initialActiveAlias,
		activeLinkAlias,
		setActiveLinkAlias,
		isOverLink,
		setIsOverLink,
		isActive,
		setIsActive,
	};
};
const useActiveTitleLink = () => {
	const ctx = useContext(UICTX);
	return {
		onLinkOver: ctx
			? (alias: string) => {
					ctx.setIsOverLink(true);
					ctx.setActiveLinkAlias(alias);
			  }
			: () => {},
		onWrapperMouseLeave: ctx
			? () => {
					ctx.setIsActive(false);

					ctx.setIsOverLink(false);
					ctx.setActiveLinkAlias(ctx.initialActiveAlias);
			  }
			: () => {},
	};
};
const useActiveDropdownLink = () => {
	const ctx = useContext(UICTX);

	return { onMouseEnter: ctx ? () => ctx.setIsActive(true) : () => {} };
};
const useDropDownInteractions = (links: ITitleBarLink[][]) => {
	const ctx = useContext(UICTX);
	if (ctx) {
		const { activeLinkAlias, isOverLink, isActive } = ctx;

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
		const showDropdown = !!(
			(isOverLink || isActive) &&
			activeLinkGroup &&
			(activeLinkGroup.length > 1 || activeLinkGroup[0].image)
		);
		return {
			activeLinkGroup,
			showDropdown,
		};
	} else {
		return { activeLinkGroup: undefined, showDropdown: false };
	}
};
const TitleBarUI: React.FC<ITitleBarProps> = (props) => (
	<UICTX value={useUIState(props.links)}>
		<InnerTitleBarUI {...props} />
	</UICTX>
);
const InnerTitleBarUI: React.FC<ITitleBarProps> = (props) => {
	const { links, style_fn = () => ({}) } = props;
	const { onWrapperMouseLeave, onLinkOver } = useActiveTitleLink();
	return (
		<div
			style={interactionWrapperStyles}
			className="no-aos"
			onMouseLeave={onWrapperMouseLeave}
		>
			<div style={style_fn()}>
				<TitleBarLogo />
				<TitleBarUILinks
					activeLinkAlias={useContext(UICTX)?.activeLinkAlias || ""}
					links={links}
					onLinkOver={onLinkOver}
				/>
				<TitleBarMenu />
			</div>
			{props.children}
		</div>
	);
};
const Dropdown: React.FC<ITitleBarProps> = (props) => {
	const { activeLinkGroup, showDropdown } = useDropDownInteractions(
		props.links
	);
	return (
		showDropdown &&
		activeLinkGroup && (
			<div
				style={dropdownContainerStyles}
				onMouseEnter={useActiveDropdownLink().onMouseEnter}
			>
				<DropDownOuter activeLinkGroup={activeLinkGroup} />
			</div>
		)
	);
};
export { Dropdown, TitleBarUI };
