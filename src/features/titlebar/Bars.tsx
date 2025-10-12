// src/components/titlebar/TitleBar.tsx

import React from "react";
import dropdownImage from "../../assets/dude1.jpg";
import logo from "../../assets/logo.png";
import { ITitleBarLink } from "./TitleBar.types";
import { PillTitleBar } from "./PillTitleBar";
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

/* 
type TDualScalingFunction =  TScalingFunction extends (params: infer U) => infer R ? (params:U, ...others: any[]) => [R,R]: never;
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import {  ITitleBarProps } from "./TitleBar.types";

import { TitleBarUI } from "./TitleBarUI";

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
 */
const AppTitleBar: React.FC = () => {
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

export { AppTitleBar, formatLabel };
