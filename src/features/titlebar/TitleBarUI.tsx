// src/components/titlebar/TitleBarUI.tsx

import { Menu } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
	dropdownContainerStyles,
	dropdownImageContainerStyles,
	dropdownImageStyles,
	dropdownImageViewOverviewStyles,
	dropdownLinksColumnStyles,
	dropdownLinkStyles,
	dropdownStyles,
	hamburgerStyle,
	interactionWrapperStyles,
	logoContainerStyles,
	logoStyles,
	navLinksContainerStyles,
	navLinkStyles,
	pillBarOverrides,
	rightHandContainerStyles,
	titleBarStyles,
} from "./TitleBar.styles";
import {
	ITitleBarLink,
	ITitleBarProps,
	ITitleBarUILinksProps,
} from "./TitleBar.types";

const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

// Extracted Isomorphic Function
const useCurrentActiveLinkAlias = (links: ITitleBarLink[][]) => {
	const location = useLocation();

	return useMemo(() => {
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
};

const TitleBarUI: React.FC<ITitleBarProps> = (props) => {
	const {
		links,
		style_fn = () => ({}),
		// children,
		hasDropdown = false,
	} = props;
	const initialActiveAlias = useCurrentActiveLinkAlias(links);

	const { activeLinkAlias, onLinkOver, onWrapperMouseLeave, onMouseEnter } =
		useActiveLink(links);

	return (
		<div
			style={interactionWrapperStyles}
			className="no-aos"
			onMouseLeave={onWrapperMouseLeave}
		>
			<div style={style_fn()}>
				<TitleBarLogo />

				<TitleBarUILinks
					activeLinkAlias={activeLinkAlias}
					links={links}
					onLinkOver={onLinkOver}
				/>

				<TitleBarMenu />
			</div>
			{hasDropdown ?? (
				<Dropdown
					{...props}
					onMouseEnter={onMouseEnter}
				/>
			)}
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

// Interaction hook managing local state
const useActiveLink = (links: ITitleBarLink[][]) => {
	const initialActiveAlias = useCurrentActiveLinkAlias(links);

	const [activeLinkAlias, setActiveLinkAlias] = useState(initialActiveAlias);
	const [isOverLink, setIsOverLink] = useState(false);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (!isActive) {
			setActiveLinkAlias(initialActiveAlias);
		}
	}, [initialActiveAlias, isActive, setActiveLinkAlias]);

	const onLinkOver = (alias: string) => {
		setIsOverLink(true);
		setActiveLinkAlias(alias);
	};
	const onWrapperMouseLeave = () => {
		setIsActive(false);
		setIsOverLink(false);
		setActiveLinkAlias(initialActiveAlias);
	};
	const onMouseEnter = () => setIsActive(true);

	return {
		activeLinkAlias,
		isOverLink,
		isActive,
		onLinkOver,
		onMouseEnter,
		onWrapperMouseLeave,
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

export {
	formatLabel,
	TitleBarUI,
	useActiveLink,
	useCurrentActiveLinkAlias,
	usePillOnScroll,
};

const Dropdown: React.FC<
	ITitleBarProps & {
		onMouseEnter: () => void;
	}
> = ({ onMouseEnter, ...props }) => {
	const { activeLinkGroup, showDropdown } = useDropDownInteractions(
		props.links
	);
	return (
		showDropdown &&
		activeLinkGroup && (
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
								<span style={{ marginLeft: "5px" }}>
									&rarr;
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	);
};

// Interaction hook for Dropdown, relies on useActiveLink state
const useDropDownInteractions = (links: ITitleBarLink[][]) => {
	// This hook must re-run useActiveLink locally to access the state variables (activeLinkAlias, isOverLink, isActive)
	const {
		activeLinkAlias,
		isOverLink,
		isActive,
		onLinkOver,
		onMouseEnter,
		onWrapperMouseLeave,
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
		onLinkOver,
		onMouseEnter,
		onWrapperMouseLeave,
	};
};

export { Dropdown, useDropDownInteractions };

const usePillBarStyle = () => {
	const isScrolled = usePillOnScroll();

	const TitleBarStyle = useMemo(
		() => ({
			...titleBarStyles(),
			transition: "all 0.5s ease-in-out",
			...(isScrolled ? pillBarOverrides : {}),
		}),
		[isScrolled]
	);

	return TitleBarStyle;
};

export { usePillBarStyle };
