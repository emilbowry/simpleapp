// src/features/titlebar/TitleBar.tsx

import React from "react";
import {
	logoStyle,
	inlineNavStyle,
	activeLinkStyle,
	linkStyle,
	hamburgerStyle,
	navOverlayStyle,
	navOverlayOpen,
	closeButtonStyle,
	dropdownActiveLinkStyle,
	dropdownLinkStyle,
	headerStyle,
} from "./TitleBar.styles";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ITitleBarProps, ITitleBarState } from "./TitleBar.types";

const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

const formatPath = (key: string): string => {
	if (key === "home") return "/";
	return "/" + key;
};

export class TitleBar extends React.Component<ITitleBarProps, ITitleBarState> {
	constructor(props: ITitleBarProps) {
		super(props);
		this.state = { open: false };
	}

	toggleMenu = () => {
		this.setState((prev) => ({ open: !prev.open }));
	};

	closeMenu = () => {
		this.setState({ open: false });
	};

	private renderInlineLinks = () => {
		return Object.entries(this.props.links)
			.filter(([_, cfg]) => cfg.layout.inline)
			.map(([key, cfg]) => (
				<NavLink
					key={key}
					to={cfg.path || formatPath(key)}
					style={({ isActive }) =>
						isActive ? activeLinkStyle : linkStyle
					}
				>
					{formatLabel(key, cfg.alias)}
				</NavLink>
			));
	};

	private renderDropdownLinks = () => {
		return Object.entries(this.props.links)
			.filter(([_, cfg]) => cfg.layout.dropdown)
			.map(([key, cfg]) => (
				<NavLink
					key={key}
					to={cfg.path || formatPath(key)}
					style={({ isActive }) =>
						isActive ? dropdownActiveLinkStyle : dropdownLinkStyle
					}
					onClick={this.closeMenu}
				>
					{formatLabel(key, cfg.alias)}
				</NavLink>
			));
	};

	render() {
		const { logoSrc } = this.props;
		const { open } = this.state;

		return (
			<header style={headerStyle}>
				<NavLink
					to="/"
					onClick={this.closeMenu}
				>
					<img
						src={logoSrc}
						alt="Logo"
						style={logoStyle}
					/>
				</NavLink>

				<nav style={inlineNavStyle}>{this.renderInlineLinks()}</nav>

				<button
					style={hamburgerStyle}
					onClick={this.toggleMenu}
					aria-label="Menu"
				>
					<Menu size={24} />
				</button>

				<nav
					style={{
						...navOverlayStyle,
						...(open ? navOverlayOpen : {}),
					}}
				>
					<button
						style={closeButtonStyle}
						onClick={this.closeMenu}
						aria-label="Close menu"
					>
						×
					</button>
					{this.renderDropdownLinks()}
				</nav>
			</header>
		);
	}
}
