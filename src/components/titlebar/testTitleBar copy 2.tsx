import React from "react";
import logo from "../../assets/logo.png";
import dropdownImage from "../../assets/dude1.jpg";

export interface ITitleBarLink {
	alias: string;
	paths: string[];
	image?: string;
}

export interface ITitleBarProps {
	logoSrc: string;
	links: ITitleBarLink[];
}

export interface ITitleBarState {
	isOverLink: boolean;
	activeLinkAlias: string | null;
	isActive: boolean;
}

const VISIBLE_TITLEBAR_HEIGHT = 60;

const interactionWrapperStyles: React.CSSProperties = {
	width: "100%",
};

const titleBarStyles2: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
	height: `${VISIBLE_TITLEBAR_HEIGHT}px`,
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
	transition: "text-decoration 0.3s ease",
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

		if (props.links.length === 0) {
			console.warn(
				"TitleBar created with no links. Defaulting activeLinkAlias to null."
			);
			this.initialActiveAlias = null as any;
		} else {
			const currentPath = window.location.pathname;
			let foundAlias: string | null = null;

			for (const link of props.links) {
				if (link.paths.includes(currentPath)) {
					foundAlias = link.alias;
					break;
				}
			}
			this.initialActiveAlias = foundAlias || props.links[0].alias;
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
		// this.setState({});
	};
	protected constructNavLinks = (): React.ReactNode => {
		const { links } = this.props;
		const { activeLinkAlias } = this.state;

		return (
			<div
				style={titleBarStyles2}
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
					{links.map((link) => (
						<div
							key={link.alias}
							onMouseOver={() => this.handleLinkOver(link.alias)}
							onMouseLeave={() => this.handleLinkLeave()}
						>
							<NavLink
								to={link.paths[0]}
								style={navLinkStyles(
									activeLinkAlias === link.alias
								)}
							>
								{link.alias}
							</NavLink>
						</div>
					))}
				</div>
				<div style={rightHandContainerStyles} />
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
import { NavLink } from "react-router-dom"; // Import NavLink
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
			// isActive: true,
			isOverLink: false,
			activeLinkAlias: aLink,
		});
	}

	protected renderDropdownContent = (): React.ReactNode => {
		const { isActive, activeLinkAlias, isOverLink } = this.state;
		const { links } = this.props;

		if (!isOverLink && !isActive) {
			return null;
		}

		const activeLink = links.find((link) => link.alias === activeLinkAlias);

		if (
			!activeLink ||
			(activeLink.paths.length <= 1 && !activeLink.image)
		) {
			return null;
		}
		let link = activeLink;

		const subLinks = link.paths;
		console.log(isOverLink, isActive);
		return (
			<div
				style={dropdownStyles}
				onMouseEnter={(e) => this.dropdownEnter(e, link.alias)}
			>
				{subLinks.length > 0 && (
					<div style={dropdownLinksColumnStyles}>
						{subLinks.map((path, index) => (
							// This needs to be a NavLink not <a/>
							<NavLink
								key={`${link.alias}-sublink-${index}`}
								to={path}
								style={dropdownLinkStyles}
							>
								{/* Need to traverse the props links to find the correct alias */}
								{path.split("/").pop() || path}
							</NavLink>
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
	const navLinks: ITitleBarLink[] = [
		{
			alias: "Home",
			paths: ["/", "/demo_page"],
			image: dropdownImage,
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
