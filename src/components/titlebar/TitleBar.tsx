// src/components/titlebar/TitleBar.tsx

import React, {
	useState,
	useEffect,
	useMemo,
	CSSProperties,
	ReactNode,
} from "react";
import logo from "../../assets/logo.png";
import dropdownImage from "../../assets/dude1.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
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
	_titleBarStyles,
	rightHandContainerStyles,
	pillBarOverrides,
} from "./TitleBar.styles";
import { ITitleBarLink, ITitleBarProps } from "./TitleBar.types";

// Helper function remains unchanged
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

//== Custom Hooks for Logic (Unchanged) ==//

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

//== Core Presentational Component (The DRY Solution) ==//

interface ITitleBarUIProps {
	links: ITitleBarLink[][];
	barStyle: CSSProperties;
	activeLinkAlias: string;
	onLinkOver: (alias: string) => void;
	onWrapperMouseLeave: () => void;
	children?: ReactNode; // For rendering the dropdown
}

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
				<div style={logoContainerStyles}>
					<img
						src={logo}
						alt="Logo"
						style={logoStyles}
					/>
				</div>
				<div style={navLinksContainerStyles}>
					{links.map((linkGroup) => {
						const mainLink = linkGroup[0];
						if (!mainLink) return null;
						const displayAlias = formatLabel(
							mainLink.path,
							mainLink.alias
						);
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
				<div style={rightHandContainerStyles}>
					<button
						style={hamburgerStyle}
						aria-label="Menu"
					>
						<Menu size={24} />
					</button>
				</div>
			</div>
			{children}
		</div>
	);
};

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

//== Exported "Container" Components ==//

export const TitleBar: React.FC<ITitleBarProps> = ({ links }) => {
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
const useTitleBarInteractions = (links: ITitleBarLink[][]) => {
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

export const ExpandableTitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const {
		activeLinkAlias,
		activeLinkGroup,
		showDropdown,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useTitleBarInteractions(links);

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

export const PillTitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const {
		activeLinkAlias,
		activeLinkGroup,
		showDropdown,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useTitleBarInteractions(links);
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
export const TestPillTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[][] = [
		[
			{ path: "/", alias: "Home", image: dropdownImage },
			{ path: "/demo_page", alias: "Demo Page" },
		],
		[{ path: "/thejourney", alias: "The Journey" }],

		[{ path: "/ourservices", alias: "Our Services" }],
		[{ path: "/contact", alias: "Contact" }],
		[{ path: "/dpotool", alias: "DPO Tool" }],
	];
	return (
		<PillTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};
