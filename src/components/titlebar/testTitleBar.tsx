import React from "react";
import logo from "../../assets/logo.png";
import dropdownImage from "../../assets/dude1.jpg";
import { NavLink } from "react-router-dom";
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
	rightHandContainerStyles,
	VISIBLE_TITLEBAR_HEIGHT,
	_titleBarStyles,
} from "./TitleBar.styles";

const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

export interface ITitleBarLink {
	alias?: string;
	path: string;
	image?: string;
}

export interface ITitleBarProps {
	logoSrc: string;
	links: ITitleBarLink[][];
}

export interface ITitleBarState {
	isOverLink: boolean;
	activeLinkAlias: string | null;
	isActive: boolean;
}

export class TitleBar<
	P extends ITitleBarProps = ITitleBarProps,
	S extends ITitleBarState = ITitleBarState
> extends React.Component<P, S> {
	protected initialActiveAlias: string;
	state: S;

	constructor(props: P) {
		super(props);

		if (props.links.length === 0 || props.links[0].length === 0) {
			console.warn(
				"TitleBar created with no links. Defaulting activeLinkAlias to null."
			);
			this.initialActiveAlias = null as any;
		} else {
			const currentPath = window.location.pathname;
			let foundAlias: string | null = null;

			for (const linkGroup of props.links) {
				const mainLink = linkGroup[0];
				if (mainLink && mainLink.path === currentPath) {
					foundAlias = formatLabel(mainLink.path, mainLink.alias);
					break;
				}

				for (const subLink of linkGroup.slice(1)) {
					if (subLink.path === currentPath) {
						foundAlias = formatLabel(mainLink.path, mainLink.alias);
						break;
					}
				}
				if (foundAlias) break;
			}

			this.initialActiveAlias =
				foundAlias ||
				formatLabel(props.links[0][0].path, props.links[0][0].alias);
		}

		this.state = {
			isOverLink: false,
			activeLinkAlias: this.initialActiveAlias,
			isActive: false,
		} as S;
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
	protected handleLinkLeave = (): void => {};

	titleBarStyles(): React.CSSProperties {
		return _titleBarStyles();
	}

	protected constructNavLinks = (): React.ReactNode => {
		const { links } = this.props;
		const { activeLinkAlias } = this.state;

		return (
			<div
				style={this.titleBarStyles()}
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
						const mainLink = linkGroup[0];
						if (!mainLink) return null;

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
								onMouseLeave={() => this.handleLinkLeave()}
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
		[{ path: "/", alias: "Home" }],

		[{ path: "/thejourney", alias: "The Journey" }],
	];

	return (
		<TitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};

export class ExpandableTitleBar<
	P extends ITitleBarProps = ITitleBarProps,
	S extends ITitleBarState = ITitleBarState
> extends TitleBar<P, S> {
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

		const activeLinkGroup = links.find((linkGroup) => {
			const mainLink = linkGroup[0];
			return (
				mainLink &&
				formatLabel(mainLink.path, mainLink.alias) === activeLinkAlias
			);
		});

		if (!activeLinkGroup || activeLinkGroup.length <= 1) {
			return null;
		}

		const mainLink = activeLinkGroup[0];

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
				{mainLink.image && (
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
		[
			{ path: "/", alias: "Home", image: dropdownImage },
			{ path: "/demo_page", alias: "Demo Page" },
		],

		[{ path: "/thejourney", alias: "The Journey" }],
	];

	return (
		<ExpandableTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};
export interface IPillTitleBarState extends ITitleBarState {
	isScrolled: boolean;
	hasReturned: boolean;
}
export class PillTitleBar extends ExpandableTitleBar<
	ITitleBarProps,
	IPillTitleBarState
> {
	constructor(props: ITitleBarProps) {
		super(props);

		this.state = {
			...this.state,
			isScrolled: false,
			hasReturned: false,
		} as IPillTitleBarState;
	}

	public componentDidMount(): void {
		window.addEventListener("scroll", this.handleScroll);
	}

	public componentWillUnmount(): void {
		window.removeEventListener("scroll", this.handleScroll);
	}

	protected handleScroll = (): void => {
		const uThreshold = 10;
		const dThreshold = 1;
		if (!this.state.isScrolled) {
			const scrolled = window.scrollY > dThreshold;

			if (scrolled) {
				console.log(scrolled);
				this.setState({ isScrolled: scrolled });
			}
		} else if (this.state.isScrolled) {
			const n_scrolled = window.scrollY < uThreshold;

			if (n_scrolled) {
				console.log(n_scrolled);
				this.setState({ isScrolled: !n_scrolled });
			}
		}
	};

	titleBarStyles(): React.CSSProperties {
		const baseStyles = super.titleBarStyles();
		const { isScrolled } = this.state;

		const pillBarOverrides: React.CSSProperties = {
			borderRadius: "40px", //why is this 40, shouldnt it be VISIBLE_TITLEBAR_HEIGHT/2 =30px
			boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
			marginRight: "50rem",
			marginTop: "3rem",
			marginLeft: "50rem",
		};

		return {
			...baseStyles,
			transition: "all 0.5s ease-in-out",

			...(isScrolled ? pillBarOverrides : {}),
		};
	}
}

export const TestPillTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[][] = [
		[
			{ path: "/", alias: "Home", image: dropdownImage },
			{ path: "/demo_page", alias: "Demo Page" },
		],

		[{ path: "/thejourney", alias: "The Journey" }],
	];

	return (
		<PillTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};
