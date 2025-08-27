// src/components/titlebar/TitleBar.tsx

// ==== Imports ====
import React from "react";
import logo from "../../assets/logo.png";

// ==== Typing ====
export interface ITitleBarLink {
	alias: string;
	paths: string[];
	image?: string;
}

export type TTitleBarLinkConfig = ITitleBarLink;

export interface ITitleBarProps {
	logoSrc: string;
	links: TTitleBarLinkConfig[];
}

export interface ITitleBarState {
	hoveredLinkAlias: string | null;
}

// === Styles ===
const titleBarStyles = (): React.CSSProperties => ({
	width: "100%",
	backgroundColor: "#f0f0f0",
	padding: "10px 20px",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between", // Distributes space between items
	boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const logoContainerStyles = (): React.CSSProperties => ({
	flex: 1, // Allows logo to take up available space on the left
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
});

const logoStyles = (): React.CSSProperties => ({
	height: "40px",
});

const navLinksContainerStyles = (): React.CSSProperties => ({
	flex: 2, // Allows nav links to take up more central space
	display: "flex",
	justifyContent: "center", // Centers the links within their container
	gap: "15px",
});

const rightHandContainerStyles = (): React.CSSProperties => ({
	flex: 1, // Balances the logo container on the right
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
});

const navLinkStyles = (isHovered: boolean): React.CSSProperties => ({
	textDecoration: isHovered ? "underline" : "none",
	color: "#333",
	fontSize: "16px",
	padding: "5px 0",
	cursor: "pointer",
	transition: "text-decoration 0.3s ease",
});

// === Implementation ===
export class TitleBar extends React.Component<ITitleBarProps, ITitleBarState> {
	public state: ITitleBarState = {
		hoveredLinkAlias: null,
	};

	/**
	 * Handles the mouse enter event for a navigation link, setting the hovered link alias in state.
	 * @param alias The alias of the link being hovered.
	 */
	protected handleMouseEnter = (alias: string): void => {
		this.setState({ hoveredLinkAlias: alias });
	};

	/**
	 * Handles the mouse leave event for a navigation link, clearing the hovered link alias from state.
	 */
	protected handleMouseLeave = (): void => {
		this.setState({ hoveredLinkAlias: null });
	};

	/**
	 * Constructs and renders the navigation links for the title bar.
	 * This method can be overridden by subclasses to alter link content or behavior.
	 * @returns React.ReactNode representing the navigation links.
	 */
	protected constructNavLinks = (): React.ReactNode => {
		const { links } = this.props;
		const { hoveredLinkAlias } = this.state;

		return (
			<div style={navLinksContainerStyles()}>
				{links.map((link) => (
					<a
						key={link.alias}
						href={link.paths[0]} // Use the first path for simple links
						style={navLinkStyles(hoveredLinkAlias === link.alias)}
						onMouseEnter={() => this.handleMouseEnter(link.alias)}
						onMouseLeave={this.handleMouseLeave}
					>
						{link.alias}
					</a>
				))}
			</div>
		);
	};

	public render(): React.ReactNode {
		const { logoSrc } = this.props;

		return (
			<div style={titleBarStyles()}>
				<div style={logoContainerStyles()}>
					<img
						src={logoSrc}
						alt="Logo"
						style={logoStyles()}
					/>
				</div>
				{this.constructNavLinks()}
				<div style={rightHandContainerStyles()} />{" "}
				{/* Empty container for spacing */}
			</div>
		);
	}
}

export const TestTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[] = [
		{
			alias: "Home",
			paths: ["/"],
		},
		{
			alias: "The Journey",
			paths: ["/thejourney"],
		},
	];

	return (
		<TitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};

import dropdownImage from "../../assets/dude3.jpg"; // Example image for dropdown

// ==== Typing ====
// ... (existing ITitleBarLink, TTitleBarLinkConfig, ITitleBarProps, ITitleBarState)

// === Styles ===
// ... (existing static styles from TitleBar)

const dropdownContainerStyles: React.CSSProperties = {
	position: "absolute",
	top: "100%", // Position below the nav link
	left: "50%", // Center horizontally relative to parent
	transform: "translateX(-50%)", // Adjust for perfect centering
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
	padding: "20px",
	display: "flex",
	gap: "30px",
	minWidth: "400px", // Minimum width for the dropdown
	zIndex: 100, // Ensure dropdown is above other content
};

const dropdownLinksColumnStyles: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "10px",
};

const dropdownLinkStyles: React.CSSProperties = {
	color: "#333",
	fontSize: "15px",
	textDecoration: "none",
	padding: "5px 0",
	whiteSpace: "nowrap", // Prevent text wrapping
};

const dropdownImageContainerStyles: React.CSSProperties = {
	width: "200px", // Fixed width for the image container
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between", // Pushes "View overview" to the bottom
};

const dropdownImageStyles: React.CSSProperties = {
	width: "100%",
	height: "120px",
	objectFit: "cover",
	borderRadius: "4px",
};

const dropdownImageViewOverviewStyles: React.CSSProperties = {
	marginTop: "10px",
	color: "#007bff",
	fontSize: "14px",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	gap: "5px",
};

// === Implementation ===
// ... (existing TitleBar class)

export class ExpandableTitleBar extends TitleBar {
	// handleMouseEnter is inherited and works as-is for setting hoveredLinkAlias.
	// No need to override unless its core behavior changes beyond state update.

	/**
	 * Renders the dropdown content for an expandable link.
	 * @param link The ITitleBarLink object for which to render the dropdown.
	 * @returns React.ReactNode representing the dropdown.
	 */
	protected renderDropdownContent = (
		link: ITitleBarLink
	): React.ReactNode => {
		// Only render dropdown if there are multiple paths or an image is defined
		if (link.paths.length <= 1 && !link.image) {
			return null;
		}

		// All paths except the first one are sub-links for the dropdown
		const subLinks = link.paths.slice(1);

		return (
			<div style={dropdownContainerStyles}>
				{subLinks.length > 0 && ( // Only render link column if there are sub-links
					<div style={dropdownLinksColumnStyles}>
						{subLinks.map((path, index) => (
							<a
								key={`${link.alias}-sublink-${index}`}
								href={path}
								style={dropdownLinkStyles}
							>
								{/* Assuming sub-paths are also aliases for now, or we'd need more data */}
								{path.split("/").pop() || path}
							</a>
						))}
					</div>
				)}
				{link.image && (
					<div style={dropdownImageContainerStyles}>
						<img
							src={link.image}
							alt={`${link.alias} overview`}
							style={dropdownImageStyles}
						/>
						<div style={dropdownImageViewOverviewStyles}>
							View overview{" "}
							<span style={{ marginLeft: "5px" }}>&rarr;</span>
						</div>
					</div>
				)}
			</div>
		);
	};

	/**
	 * Overrides constructNavLinks to include dropdown functionality for expandable links.
	 */
	protected constructNavLinks = (): React.ReactNode => {
		const { links } = this.props;
		const { hoveredLinkAlias } = this.state;

		return (
			<div style={navLinksContainerStyles()}>
				{links.map((link) => {
					// A link is expandable if it has more than one path or an image
					const isExpandable = link.paths.length > 1 || link.image;
					const isHovered = hoveredLinkAlias === link.alias;

					return (
						<div
							key={link.alias}
							style={{ position: "relative" }} // Needed for absolute positioning of dropdown
							onMouseEnter={() =>
								this.handleMouseEnter(link.alias)
							}
							onMouseLeave={this.handleMouseLeave}
						>
							<a
								href={link.paths[0]}
								style={navLinkStyles(isHovered)}
							>
								{link.alias}
							</a>
							{isExpandable &&
								isHovered &&
								this.renderDropdownContent(link)}
						</div>
					);
				})}
			</div>
		);
	};
}

export const TestExpandableTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[] = [
		{
			alias: "Home",
			paths: ["/", "/demo_page"], // Home now has a sub-link
			image: dropdownImage, // Example image for Home dropdown
		},
		{
			alias: "The Journey",
			paths: ["/thejourney"],
		},
	];

	return (
		<ExpandableTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};
