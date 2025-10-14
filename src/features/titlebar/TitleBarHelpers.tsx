// src/features/titlebar/TitleBarHelpers.tsx

import { Menu } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
	dropdownImageContainerStyles,
	dropdownImageStyles,
	dropdownImageViewOverviewStyles,
	dropdownLinksColumnStyles,
	dropdownLinkStyles,
	dropdownStyles,
	hamburgerStyle,
	logoContainerStyles,
	logoStyles,
	navLinksContainerStyles,
	navLinkStyles,
	pillBarOverrides,
	rightHandContainerStyles,
	titleBarStyles,
} from "./TitleBar.styles";
import { ITitleBarLink, ITitleBarUILinksProps } from "./TitleBar.types";
const getContext = (ctx: React.Context<any | undefined>) => useContext(ctx);
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
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

const DropDownOuter: React.FC<{ activeLinkGroup: ITitleBarLink[] }> = ({
	activeLinkGroup,
}) => (
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
		<DropDownInner activeLinkGroup={activeLinkGroup} />
	</div>
);
const DropDownInner: React.FC<{ activeLinkGroup: ITitleBarLink[] }> = ({
	activeLinkGroup,
}) => (
	<>
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
	</>
);
export {
	DropDownOuter,
	formatLabel,
	TitleBarLogo,
	TitleBarMenu,
	TitleBarUILinks,
	usePillBarStyle,
};
