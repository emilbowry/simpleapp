// src/components/titlebar/TitleBarUI.tsx

import { Menu } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
	interactionWrapperStyles,
	logoContainerStyles,
	logoStyles,
	rightHandContainerStyles,
	hamburgerStyle,
	navLinksContainerStyles,
	navLinkStyles,
} from "./TitleBar.styles";
import {
	ITitleBarUIProps,
	ITitleBarUILinksProps,
	ITitleBarLink,
} from "./TitleBar.types";
import { formatLabel } from "./Bars";
import logo from "../../assets/logo.png";

const TitleBarUI: React.FC<ITitleBarUIProps> = ({
	links,
	barStyle,
	activeLinkAlias,
	onLinkOver,
	onWrapperMouseLeave,
	children,
}) => {
	return (
		<div
			style={interactionWrapperStyles}
			className="no-aos"
			onMouseLeave={onWrapperMouseLeave}
		>
			<div style={barStyle}>
				<TitleBarLogo />

				<TitleBarUILinks
					activeLinkAlias={activeLinkAlias}
					links={links}
					onLinkOver={onLinkOver}
				/>

				<TitleBarMenu />
			</div>
			{children}
		</div>
	);
};

const TitleBarLogo: React.FC = () => {
	return (
		<div style={logoContainerStyles}>
			<img
				src={logo}
				alt="Logo"
				style={logoStyles}
			/>
		</div>
	);
};

const TitleBarMenu: React.FC = () => {
	return (
		<div style={rightHandContainerStyles}>
			<button
				style={hamburgerStyle}
				aria-label="Menu"
			>
				<Menu size={24} />
			</button>
		</div>
	);
};

const TitleBarUILinks: React.FC<ITitleBarUILinksProps> = ({
	activeLinkAlias,
	links,
	onLinkOver,
}) => {
	return (
		<div style={navLinksContainerStyles}>
			{links.map((linkGroup) => {
				const mainLink = linkGroup[0];
				if (!mainLink) return null;
				const displayAlias = formatLabel(mainLink.path, mainLink.alias);
				return (
					<div
						key={displayAlias}
						onMouseOver={() => onLinkOver(displayAlias)}
					>
						<NavLink
							to={mainLink.path}
							style={navLinkStyles(
								activeLinkAlias === displayAlias
							)}
						>
							{displayAlias}
						</NavLink>
					</div>
				);
			})}
		</div>
	);
};

const useActiveLink = (links: ITitleBarLink[][]) => {
	const location = useLocation();
	const initialActiveAlias = useMemo(() => {
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

	const [activeLinkAlias, setActiveLinkAlias] = useState(initialActiveAlias);
	const [isOverLink, setIsOverLink] = useState(false);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (!isActive) {
			setActiveLinkAlias(initialActiveAlias);
		}
	}, [initialActiveAlias, isActive]);

	const handleLinkOver = (alias: string) => {
		setIsOverLink(true);
		setActiveLinkAlias(alias);
	};
	const handleAreaLeave = () => {
		setIsActive(false);
		setIsOverLink(false);
		setActiveLinkAlias(initialActiveAlias);
	};
	const handleAreaEnter = () => setIsActive(true);

	return {
		activeLinkAlias,
		isOverLink,
		isActive,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	};
};

export { TitleBarUI, useActiveLink };
