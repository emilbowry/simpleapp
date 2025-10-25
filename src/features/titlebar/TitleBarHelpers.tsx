// src/features/titlebar/TitleBarHelpers.tsx

import { Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
	DropdownImageContainerStyles,
	DropdownImageStyles,
	DropdownImageViewOverviewStyles,
	DropdownLinksColumnStyles,
	DropdownLinkStyles,
	DropdownStyles,
	HamburgerStyle,
	LogoContainerStyles,
	LogoStyles,
	NavLinksContainerStyles,
	navLinkStyles,
	PillBarOverrides,
	RightHandContainerStyles,
	titleBarStyles,
} from "./TitleBar.styles";
import { ITitleBarLink, ITitleBarUILinksProps } from "./TitleBar.types";

const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};
const TitleBarLogo: React.FC = () => (
	<div style={LogoContainerStyles}>
		<img
			src={logo}
			alt="Logo"
			style={LogoStyles}
		/>
	</div>
);

const TitleBarMenu: React.FC = () => (
	<div style={RightHandContainerStyles}>
		<button
			style={HamburgerStyle}
			aria-label="Menu"
		>
			<Menu size={24} />
		</button>
	</div>
);

const TitleBarUILinks: React.FC<ITitleBarUILinksProps> = ({
	active_link_alias,
	Links,
	onLinkOver,
}) => (
	<div style={NavLinksContainerStyles}>
		{Links.map((LinkGroup) => {
			const main_link = LinkGroup[0];
			if (!main_link) return null;
			const display_alias = formatLabel(main_link.path, main_link.alias);
			return (
				<div
					key={display_alias}
					onMouseOver={() => onLinkOver(display_alias)}
				>
					<NavLink
						to={main_link.path}
						style={navLinkStyles(
							active_link_alias === display_alias
						)}
					>
						{display_alias}
					</NavLink>
				</div>
			);
		})}
	</div>
);

const usePillOnScroll = (d_threshold: number = 1, u_threshold: number = 10) => {
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			const current_scroll_y = window.scrollY;
			if (!isScrolled && current_scroll_y > d_threshold)
				setIsScrolled(true);
			else if (isScrolled && current_scroll_y < u_threshold)
				setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isScrolled, d_threshold, u_threshold]);
	return isScrolled;
};
const usePillBarStyle = () => {
	const isScrolled = usePillOnScroll();

	const TitleBarStyle = useMemo(
		() => ({
			...titleBarStyles(),
			transition: "all 0.5s ease-in-out",
			...(isScrolled ? PillBarOverrides : {}),
		}),
		[isScrolled]
	);

	return TitleBarStyle;
};

const DropDownOuter: React.FC<{ ActiveLinkGroup: ITitleBarLink[] }> = ({
	ActiveLinkGroup,
}) => (
	<div style={DropdownStyles}>
		{ActiveLinkGroup.length > 1 && (
			<div style={DropdownLinksColumnStyles}>
				{ActiveLinkGroup.map((link, index) => (
					<NavLink
						key={`${link.path}-${index}`}
						to={link.path}
						style={DropdownLinkStyles}
					>
						{formatLabel(link.path, link.alias)}
					</NavLink>
				))}
			</div>
		)}
		<DropDownInner ActiveLinkGroup={ActiveLinkGroup} />
	</div>
);
const DropDownInner: React.FC<{ ActiveLinkGroup: ITitleBarLink[] }> = ({
	ActiveLinkGroup,
}) => (
	<>
		{ActiveLinkGroup[0].image && (
			<div style={DropdownImageContainerStyles}>
				<img
					src={ActiveLinkGroup[0].image}
					alt={`${formatLabel(
						ActiveLinkGroup[0].path,
						ActiveLinkGroup[0].alias
					)} overview`}
					style={DropdownImageStyles}
				/>
				<div style={DropdownImageViewOverviewStyles}>
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
