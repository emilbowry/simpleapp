// src/components/titlebar/TitleBarUI.tsx

import { Menu } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
	hamburgerStyle,
	interactionWrapperStyles,
	logoContainerStyles,
	logoStyles,
	navLinksContainerStyles,
	navLinkStyles,
	rightHandContainerStyles,
} from "./TitleBar.styles";
import {
	ITitleBarLink,
	ITitleBarUILinksProps,
	ITitleBarUIProps,
} from "./TitleBar.types";
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

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
const usePillOnScroll = (dThreshold: number = 1, uThreshold: number = 10) => {
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (!isScrolled && currentScrollY > dThreshold) setIsScrolled(true);
			else if (isScrolled && currentScrollY < uThreshold)
				setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isScrolled, dThreshold, uThreshold]);
	return isScrolled;
};

export { formatLabel, TitleBarUI, useActiveLink, usePillOnScroll };
