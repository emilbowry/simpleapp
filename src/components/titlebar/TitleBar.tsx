// src/components/titlebar/TitleBar.tsx
/**
 * @improvement - this can be better generalised
 */
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
	_titleBarStyles,
	rightHandContainerStyles,
	pillBarOverrides,
} from "./TitleBar.styles";
import {
	ITitleBarLink,
	ITitleBarProps,
	ITitleBarState,
} from "./TitleBar.types";
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};
/**
	@improvement 
	- Active link logic now broken, **doesnt highlight current page**


 */
export class TitleBar<
	P extends ITitleBarProps = ITitleBarProps,
	S extends ITitleBarState = ITitleBarState
> extends React.Component<P, S> {
	protected initialActiveAlias: string;
	state: S;
	constructor(props: P) {
		super(props);

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
	protected renderLogo = (): React.ReactNode => {
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
	/* Think of some functional use */
	protected renderMenuButton = (): React.ReactNode => {
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

	protected buildLinkElements = (): React.ReactNode[] => {
		const { links } = this.props;
		const { activeLinkAlias } = this.state;
		const navLinkElements = new Array(links.length);

		for (let i = 0; i < links.length; i++) {
			const linkGroup = links[i];
			const mainLink = linkGroup[0];

			if (!mainLink) {
				navLinkElements[i] = null;
				continue;
			}

			const displayAlias = formatLabel(mainLink.path, mainLink.alias);

			navLinkElements[i] = (
				<div
					key={displayAlias || `main-link-${i}`}
					onMouseOver={() => this.handleLinkOver(displayAlias)}
					onMouseLeave={() => this.handleLinkLeave()}
				>
					<NavLink
						to={mainLink.path}
						style={navLinkStyles(activeLinkAlias === displayAlias)}
					>
						{displayAlias}
					</NavLink>
				</div>
			);
		}
		return navLinkElements;
	};

	protected constructNavLinks = (): React.ReactNode => {
		const logoElement = this.renderLogo();
		const linkElements = this.buildLinkElements();
		const menuButtonElement = this.renderMenuButton();

		return (
			<div
				style={this.titleBarStyles()}
				onMouseLeave={() => this.handleInteractionWrapperMouseLeave()}
			>
				{logoElement}
				<div style={navLinksContainerStyles}>{linkElements}</div>
				{menuButtonElement}
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
				className="no-aos"
			>
				{this.construct()}
			</div>
		);
		return obj;
	}
}

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
	protected findActiveLinkGroup = (): ITitleBarLink[] | undefined => {
		const { links } = this.props;
		const { activeLinkAlias } = this.state;

		return links.find((linkGroup) => {
			const mainLink = linkGroup[0];
			return (
				mainLink &&
				formatLabel(mainLink.path, mainLink.alias) === activeLinkAlias
			);
		});
	};

	protected renderLinkElements = (
		linkGroup: ITitleBarLink[]
	): React.ReactNode[] => {
		const linkElements = new Array(linkGroup.length);

		for (let i = 0; i < linkGroup.length; i++) {
			const link = linkGroup[i];
			linkElements[i] = (
				<NavLink
					key={`${link.path}-${i}`}
					to={link.path}
					style={dropdownLinkStyles}
				>
					{formatLabel(link.path, link.alias)}
				</NavLink>
			);
		}

		return linkElements;
	};

	protected renderDropdownImage = (
		mainLink: ITitleBarLink
	): React.ReactNode => {
		if (!mainLink.image) {
			return null;
		}

		return (
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
		);
	};

	protected renderDropdownContent = (): React.ReactNode => {
		const { isActive, isOverLink } = this.state;
		if (!isOverLink && !isActive) {
			return null;
		}

		const activeLinkGroup = this.findActiveLinkGroup();
		if (!activeLinkGroup || activeLinkGroup.length <= 1) {
			return null;
		}

		const mainLink = activeLinkGroup[0];
		const linkElements = this.renderLinkElements(activeLinkGroup);
		const imageElement = this.renderDropdownImage(mainLink);

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
				<div style={dropdownLinksColumnStyles}>{linkElements}</div>
				{imageElement}
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
		const dThreshold = 2;
		const threshold = this.state.isScrolled ? uThreshold : dThreshold;
		this.setState({ isScrolled: window.scrollY >= threshold });
	};

	titleBarStyles(): React.CSSProperties {
		const baseStyles = super.titleBarStyles();
		const { isScrolled } = this.state;

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
			{
				path: "/demo_page",
				alias: "Demo Page",
			} /* Only used to verify dropdown logic */,
		],
		[{ path: "/thejourney", alias: "The Journey" }],
		[{ path: "/ourservices", alias: "Our Services" }],
		[{ path: "/contact", alias: "Contact" }],
	];
	return (
		<PillTitleBar
			logoSrc={logo}
			links={navLinks}
		/>
	);
};
