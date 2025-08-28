import React from "react";
import logo from "../../assets/logo.png";
import dropdownImage from "../../assets/dude1.jpg";
import { NavLink } from "react-router-dom"; // Import NavLink
import { Menu } from "lucide-react";
import { hamburgerStyle } from "./TitleBar.styles";
import { white } from "../../utils/defaultColours";

// ==== Utility Function ====
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

// ==== Typing ====
export interface ITitleBarLink {
	alias?: string; // Alias is now optional
	path: string; // Single path for each link item
	image?: string;
}

export interface ITitleBarProps {
	logoSrc: string;
	links: ITitleBarLink[][]; // Links is now an array of arrays of ITitleBarLink
}

export interface ITitleBarState {
	isOverLink: boolean;
	activeLinkAlias: string | null;
	isActive: boolean;
}

const VISIBLE_TITLEBAR_HEIGHT = 60;

const interactionWrapperStyles: React.CSSProperties = {
	width: "100%",
	position: "fixed",
	zIndex: "100",
};

const titleBarStyles: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	height: `${VISIBLE_TITLEBAR_HEIGHT}px`,
	backgroundColor: "white",
};
const logoContainerStyles: React.CSSProperties = {
	flex: 1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
};

const logoStyles: React.CSSProperties = {
	height: "40px",
};

const navLinksContainerStyles: React.CSSProperties = {
	flex: 2,
	display: "flex",
	justifyContent: "center",
	gap: "15px",
};

const rightHandContainerStyles: React.CSSProperties = {
	flex: 1,
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
};

const navLinkStyles = (isUnderlined: boolean): React.CSSProperties => ({
	textDecoration: isUnderlined ? "underline" : "none",
	color: "#333",
	fontSize: "16px",
	padding: "5px 0",
	cursor: "pointer",
});

const dropdownStyles: React.CSSProperties = {
	left: "0",
	right: "0",
	margin: "0 auto",
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
	padding: "20px",
	marginTop: "20px",

	display: "flex",
	gap: "30px",
	width: "fit-content",
};

const dropdownContainerStyles: React.CSSProperties = {
	position: "relative",
	left: "0",
	right: "0",

	margin: "0 auto",

	top: `-${VISIBLE_TITLEBAR_HEIGHT}px`,

	marginTop: `${VISIBLE_TITLEBAR_HEIGHT - 10}px`,

	backgroundColor: "transparent",
	paddingTop: "10px",

	// border: "1px solid black", // For debugging
	width: "fit-content",
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
	whiteSpace: "nowrap",
};

const dropdownImageContainerStyles: React.CSSProperties = {
	width: "200px",
	display: "flex",

	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between",
};

const dropdownImageStyles: React.CSSProperties = {
	width: "99%",
	height: "120px",
	objectFit: "cover",
	borderRadius: "4px",
};

const dropdownImageViewOverviewStyles: React.CSSProperties = {
	marginTop: "10px",
	fontSize: "14px",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	gap: "5px",
};

export class TitleBar extends React.Component<ITitleBarProps, ITitleBarState> {
	protected initialActiveAlias: string;

	constructor(props: ITitleBarProps) {
		super(props);

		if (props.links.length === 0 || props.links[0].length === 0) {
			console.warn(
				"TitleBar created with no links. Defaulting activeLinkAlias to null."
			);
			this.initialActiveAlias = null as any;
		} else {
			const currentPath = window.location.pathname;
			let foundAlias: string | null = null;

			// Iterate through top-level link groups
			for (const linkGroup of props.links) {
				// The first link in each group is the top-level nav item
				const mainLink = linkGroup[0];
				if (mainLink && mainLink.path === currentPath) {
					foundAlias = formatLabel(mainLink.path, mainLink.alias);
					break;
				}
				// Also check if any sub-link matches the current path
				for (const subLink of linkGroup.slice(1)) {
					if (subLink.path === currentPath) {
						foundAlias = formatLabel(mainLink.path, mainLink.alias); // Use main link's alias for highlighting
						break;
					}
				}
				if (foundAlias) break;
			}
			// Fallback to the alias of the first link in the first group if no match
			this.initialActiveAlias =
				foundAlias ||
				formatLabel(props.links[0][0].path, props.links[0][0].alias);
		}

		this.state = {
			isOverLink: false,
			activeLinkAlias: this.initialActiveAlias,
			isActive: false,
		};
	}

	protected handleInteractionWrapperMouseLeave = (): void => {
		if (!this.state.isActive) {
			this.setState({
				isOverLink: false,
				activeLinkAlias: this.initialActiveAlias,
				isActive: false,
			});
		}
	};

	protected handleLinkOver = (link_alias: string): void => {
		this.setState({
			isOverLink: true,
			activeLinkAlias: link_alias,
		});
	};
	protected handleLinkLeave = (): void => {
		// This handler is now largely unused due to the isActive/isOverLink state
		// and the wrapper's mouse leave.
	};

	protected constructNavLinks = (): React.ReactNode => {
		const { links } = this.props;
		const { activeLinkAlias } = this.state;

		return (
			<div
				style={titleBarStyles}
				onMouseLeave={() => this.handleInteractionWrapperMouseLeave()}
			>
				<div style={logoContainerStyles}>
					<img
						src={logo}
						alt="Logo"
						style={logoStyles}
					/>
				</div>
				<div style={navLinksContainerStyles}>
					{links.map((linkGroup, index) => {
						const mainLink = linkGroup[0]; // First link in the group is the main nav item
						if (!mainLink) return null; // Should not happen with valid data

						const displayAlias = formatLabel(
							mainLink.path,
							mainLink.alias
						);

						return (
							<div
								key={displayAlias || `main-link-${index}`}
								onMouseOver={() =>
									this.handleLinkOver(displayAlias)
								}
								onMouseLeave={() => this.handleLinkLeave()} // This handler is still technically here, but its effect is minimal now
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
					{" "}
					<button
						style={hamburgerStyle}
						// onClick={this.toggleMenu}
						aria-label="Menu"
					>
						<Menu size={24} />
					</button>
				</div>
			</div>
		);
	};

	protected construct(): React.ReactNode {
		return this.constructNavLinks();
	}

	public render(): React.ReactNode {
		const { logoSrc } = this.props;

		const obj = (
			<div
				style={interactionWrapperStyles}
				className="hoverable"
			>
				<div>{this.construct()}</div>
			</div>
		);

		return obj;
	}
}

export const TestTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[][] = [
		// Home group
		[{ path: "/", alias: "Home" }],
		// The Journey group
		[{ path: "/thejourney", alias: "The Journey" }],
	];

	return (
		<TitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};

export class ExpandableTitleBar extends TitleBar {
	activeAreaLeave(e: React.MouseEvent) {
		this.setState({
			isOverLink: false,
			isActive: false,
			activeLinkAlias: this.initialActiveAlias,
		});
	}

	activeAreaEnter(e: React.MouseEvent) {
		this.setState({
			isActive: true,
		});
	}
	dropdownEnter(e: React.MouseEvent, aLink: string) {
		this.setState({
			isOverLink: false, // We've moved into the dropdown, so not over a *link* anymore
			activeLinkAlias: aLink,
		});
	}

	protected renderDropdownContent = (): React.ReactNode => {
		const { isActive, activeLinkAlias, isOverLink } = this.state;
		const { links } = this.props;

		if (!isOverLink && !isActive) {
			return null;
		}

		// Find the link group that corresponds to the active alias
		const activeLinkGroup = links.find((linkGroup) => {
			const mainLink = linkGroup[0];
			return (
				mainLink &&
				formatLabel(mainLink.path, mainLink.alias) === activeLinkAlias
			);
		});

		if (!activeLinkGroup || activeLinkGroup.length <= 1) {
			// Not an expandable link or no sub-links
			return null;
		}

		const mainLink = activeLinkGroup[0]; // The main link of the group
		// const subLinks = activeLinkGroup.slice(1); // All subsequent links are dropdown items

		return (
			<div
				style={dropdownStyles}
				onMouseEnter={(e) =>
					this.dropdownEnter(
						e,
						formatLabel(mainLink.path, mainLink.alias)
					)
				}
			>
				{activeLinkGroup.length > 0 && (
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
				{mainLink.image && ( // Image is tied to the main link of the group
					<div style={dropdownImageContainerStyles}>
						<img
							src={mainLink.image}
							alt={`${formatLabel(
								mainLink.path,
								mainLink.alias
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
		);
	};

	protected renderDropdownArea = (): React.ReactNode => {
		return (
			<div
				style={dropdownContainerStyles}
				onMouseEnter={(e) => this.activeAreaEnter(e)}
				onMouseLeave={(e) => this.activeAreaLeave(e)}
			>
				{this.renderDropdownContent()}
			</div>
		);
	};

	protected construct(): React.ReactNode {
		const baseNavLinks = super.construct();
		const dropdownArea = this.renderDropdownArea();

		return (
			<>
				{baseNavLinks}
				{dropdownArea}
			</>
		);
	}
}

export const TestExpandableTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[][] = [
		// Home group with dropdown
		[
			{ path: "/", alias: "Home", image: dropdownImage },
			{ path: "/demo_page", alias: "Demo Page" },
		],
		// The Journey group (simple link)
		[{ path: "/thejourney", alias: "The Journey" }],
		// An example of an expandable link with an image
	];

	return (
		<ExpandableTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};
