import React, { useState, useEffect, useMemo } from "react";
import { useDropDownInteractions, Dropdown } from "./Dropdown";
import { _titleBarStyles, pillBarOverrides } from "./TitleBar.styles";
import { ITitleBarProps } from "./TitleBar.types";
import { TitleBarUI } from "./TitleBarUI";

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
export { PillTitleBar };
