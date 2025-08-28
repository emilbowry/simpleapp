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
	isHovering: boolean;
	activeLinkAlias: string | null;
}

const VISIBLE_TITLEBAR_HEIGHT = 60;

const interactionWrapperStyles: React.CSSProperties = {
	// position: "relative",
	width: "100%",
	height: "100%",
	// display: "contents",
	display: "flex",
	// minHeight: "100px",
	zIndex: 100,

	// backgroundColor: "red",
	boxSizing: "border-box",
};

const titleBarStyles: React.CSSProperties = {
	width: "100%",
	backgroundColor: "#f0f0f0",
	padding: "10px 20px",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
	zIndex: 100,

	// height: `${VISIBLE_TITLEBAR_HEIGHT}px`,
	boxSizing: "border-box",
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
	position: "relative",

	// top: `${VISIBLE_TITLEBAR_HEIGHT}px`,

	left: "0",
	right: "0",
	margin: "0 auto",
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
	padding: "20px",
	display: "flex",
	gap: "30px",
	width: "fit-content",
	zIndex: 100,
};

const dropdownContainerStyles: React.CSSProperties = {
	position: "relative",

	// top: "0", // `${2 * VISIBLE_TITLEBAR_HEIGHT}px`,
	top: `${VISIBLE_TITLEBAR_HEIGHT}px`,

	left: "0",
	right: "0",
	margin: "0 auto",
	backgroundColor: "red",
	alignSelf: "center",
	// padding: "20px",
	display: "flex",
	// gap: "30px",
	// width: "fit-content",
	zIndex: 100,
	// height: `${2 * VISIBLE_TITLEBAR_HEIGHT}px`,
	// height: "100%",
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
			isHovering: false,
			activeLinkAlias: this.initialActiveAlias,
		};

		// this.ad;
	}

	protected handleInteractionWrapperMouseLeave = (): void => {
		this.setState({
			isHovering: false,
			activeLinkAlias: this.initialActiveAlias,
		});
	};

	protected constructNavLinks = (): React.ReactNode => {
		const { links } = this.props;
		const { activeLinkAlias } = this.state;

		return (
			<div style={navLinksContainerStyles}>
				{links.map((link) => (
					<div
						key={link.alias}
						onMouseEnter={() =>
							this.setState({
								activeLinkAlias: link.alias,
							})
						}
					>
						<a
							href={link.paths[0]}
							style={navLinkStyles(
								activeLinkAlias === link.alias
							)}
						>
							{link.alias}
						</a>
					</div>
				))}
			</div>
		);
	};

	protected construct(): React.ReactNode {
		return <div>{this.constructNavLinks()}</div>;
	}
	temp(e: React.MouseEvent) {
		console.log("Left Div");
		console.log(e.relatedTarget);
		console.log(e.currentTarget);

		if (React.isValidElement(e.relatedTarget)) {
			// if (!e.currentTarget.className.includes("hoverable"))
			console.log("other");
		}

		this.setState({ isHovering: false });
	}
	public render(): React.ReactNode {
		const { logoSrc } = this.props;

		const obj = (
			<div
				style={interactionWrapperStyles}
				onMouseOver={() => this.setState({ isHovering: true })}
				onMouseOut={(e) => this.temp(e)}
				className="hoverable"

				// onMouseLeave={(e) => this.temp(e)}
			>
				<div style={titleBarStyles}>
					<div style={logoContainerStyles}>
						<img
							src={logoSrc}
							alt="Logo"
							style={logoStyles}
						/>
					</div>
					<div className="hoverable">{this.construct()}</div>{" "}
					{/* Call the construct method */}
					<div style={rightHandContainerStyles} />{" "}
				</div>
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

export class ExpandableTitleBar extends TitleBar {
	protected renderDropdownContent = (
		link?: ITitleBarLink
	): React.ReactNode => {
		if (!link) {
			return <></>;
		}
		const subLinks = link.paths.slice(1);

		return (
			<>
				{subLinks.length > 0 && (
					<div style={dropdownLinksColumnStyles}>
						{subLinks.map((path, index) => (
							<a
								key={`${link.alias}-sublink-${index}`}
								href={path}
								style={dropdownLinkStyles}
							>
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
			</>
		);
	};

	protected renderDropdownArea = (): React.ReactNode => {
		const { isHovering, activeLinkAlias } = this.state;
		const { links } = this.props;

		// if (!isHovering) {
		// 	return null;
		// }

		const activeLink = links.find((link) => link.alias === activeLinkAlias);

		if (
			!activeLink ||
			(activeLink.paths.length <= 1 && !activeLink.image)
		) {
			return null;
		}

		return (
			<div
				style={dropdownContainerStyles}
				onMouseOver={() => console.log("entered")}
				onMouseLeave={(e) => this.temp(e)}
			>
				<div
					style={dropdownStyles}

					// onMouseLeave={this.handleInteractionWrapperMouseLeave}
				>
					{this.renderDropdownContent(activeLink)}
				</div>
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
