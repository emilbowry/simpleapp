// // src/components/titlebar/TitleBar.tsx
// /**
//  * @improvement - this can be better generalised
//  */
// import React from "react";
// import logo from "../../assets/logo.png";
// import dropdownImage from "../../assets/dude1.jpg";
// import { NavLink } from "react-router-dom";
// import { Menu } from "lucide-react";
// import {
// 	dropdownContainerStyles,
// 	dropdownImageContainerStyles,
// 	dropdownImageStyles,
// 	dropdownImageViewOverviewStyles,
// 	dropdownLinksColumnStyles,
// 	dropdownLinkStyles,
// 	dropdownStyles,
// 	hamburgerStyle,
// 	interactionWrapperStyles,
// 	logoContainerStyles,
// 	logoStyles,
// 	navLinksContainerStyles,
// 	navLinkStyles,
// 	_titleBarStyles,
// 	rightHandContainerStyles,
// 	pillBarOverrides,
// } from "./TitleBar.styles";
// import {
// 	ITitleBarLink,
// 	ITitleBarProps,
// 	ITitleBarState,
// } from "./TitleBar.types";
// const formatLabel = (key: string, alias?: string): string => {
// 	if (alias) return alias;
// 	if (key === "/") return "Home";
// 	return key
// 		.replace(/_/g, " ")
// 		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
// };

// export class TitleBar<
// 	P extends ITitleBarProps = ITitleBarProps,
// 	S extends ITitleBarState = ITitleBarState
// > extends React.Component<P, S> {
// 	protected initialActiveAlias: string;
// 	state: S;
// 	constructor(props: P) {
// 		super(props);

// 		const currentPath = window.location.pathname;
// 		let foundAlias: string | null = null;
// 		for (const linkGroup of props.links) {
// 			const mainLink = linkGroup[0];
// 			if (mainLink && mainLink.path === currentPath) {
// 				foundAlias = formatLabel(mainLink.path, mainLink.alias);
// 				break;
// 			}
// 			for (const subLink of linkGroup.slice(1)) {
// 				if (subLink.path === currentPath) {
// 					foundAlias = formatLabel(mainLink.path, mainLink.alias);
// 					break;
// 				}
// 			}
// 			if (foundAlias) break;
// 		}
// 		this.initialActiveAlias =
// 			foundAlias ||
// 			formatLabel(props.links[0][0].path, props.links[0][0].alias);
// 		this.state = {
// 			isOverLink: false,
// 			activeLinkAlias: this.initialActiveAlias,
// 			isActive: false,
// 		} as S;
// 	}
// 	protected handleInteractionWrapperMouseLeave = (): void => {
// 		if (!this.state.isActive) {
// 			this.setState({
// 				isOverLink: false,
// 				activeLinkAlias: this.initialActiveAlias,
// 				isActive: false,
// 			});
// 		}
// 	};
// 	protected handleLinkOver = (link_alias: string): void => {
// 		this.setState({
// 			isOverLink: true,
// 			activeLinkAlias: link_alias,
// 		});
// 	};
// 	protected handleLinkLeave = (): void => {};
// 	titleBarStyles(): React.CSSProperties {
// 		return _titleBarStyles();
// 	}
// 	protected constructNavLinks = (): React.ReactNode => {
// 		const { links } = this.props;
// 		const { activeLinkAlias } = this.state;
// 		return (
// 			<div
// 				style={this.titleBarStyles()}
// 				onMouseLeave={() => this.handleInteractionWrapperMouseLeave()}
// 			>
// 				<div style={logoContainerStyles}>
// 					<img
// 						src={logo}
// 						alt="Logo"
// 						style={logoStyles}
// 					/>
// 				</div>
// 				<div style={navLinksContainerStyles}>
// 					{links.map((linkGroup, index) => {
// 						const mainLink = linkGroup[0];
// 						if (!mainLink) return null;
// 						const displayAlias = formatLabel(
// 							mainLink.path,
// 							mainLink.alias
// 						);

// 						return (
// 							<div
// 								key={displayAlias || `main-link-${index}`}
// 								onMouseOver={() =>
// 									this.handleLinkOver(displayAlias)
// 								}
// 								onMouseLeave={() => this.handleLinkLeave()}
// 							>
// 								<NavLink
// 									to={mainLink.path}
// 									style={navLinkStyles(
// 										activeLinkAlias === displayAlias
// 									)}
// 								>
// 									{displayAlias}
// 								</NavLink>
// 							</div>
// 						);
// 					})}
// 				</div>
// 				<div style={rightHandContainerStyles}>
// 					<button
// 						style={
// 							hamburgerStyle
// 						} /* Think of some functional use */
// 						aria-label="Menu"
// 					>
// 						<Menu size={24} />
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	};
// 	protected construct(): React.ReactNode {
// 		return this.constructNavLinks();
// 	}
// 	public render(): React.ReactNode {
// 		const { logoSrc } = this.props;
// 		const obj = (
// 			<div
// 				style={interactionWrapperStyles}
// 				className="no-aos"
// 			>
// 				{this.construct()}
// 			</div>
// 		);
// 		return obj;
// 	}
// }
// export const TestTitleBar: React.FC = () => {
// 	const navLinks: ITitleBarLink[][] = [
// 		[{ path: "/", alias: "Home" }],
// 		[{ path: "/thejourney", alias: "The Journey" }],
// 	];
// 	return (
// 		<TitleBar
// 			logoSrc={logo}
// 			links={navLinks}
// 		/>
// 	);
// };
// export class ExpandableTitleBar<
// 	P extends ITitleBarProps = ITitleBarProps,
// 	S extends ITitleBarState = ITitleBarState
// > extends TitleBar<P, S> {
// 	activeAreaLeave(e: React.MouseEvent) {
// 		this.setState({
// 			isOverLink: false,
// 			isActive: false,
// 			activeLinkAlias: this.initialActiveAlias,
// 		});
// 	}
// 	activeAreaEnter(e: React.MouseEvent) {
// 		this.setState({
// 			isActive: true,
// 		});
// 	}
// 	dropdownEnter(e: React.MouseEvent, aLink: string) {
// 		this.setState({
// 			isOverLink: false,
// 			activeLinkAlias: aLink,
// 		});
// 	}
// 	protected renderDropdownContent = (): React.ReactNode => {
// 		const { isActive, activeLinkAlias, isOverLink } = this.state;
// 		const { links } = this.props;
// 		if (!isOverLink && !isActive) {
// 			return null;
// 		}
// 		const activeLinkGroup = links.find((linkGroup) => {
// 			const mainLink = linkGroup[0];
// 			return (
// 				mainLink &&
// 				formatLabel(mainLink.path, mainLink.alias) === activeLinkAlias
// 			);
// 		});
// 		if (!activeLinkGroup || activeLinkGroup.length <= 1) {
// 			return null;
// 		}
// 		const mainLink = activeLinkGroup[0];
// 		return (
// 			<div
// 				style={dropdownStyles}
// 				onMouseEnter={(e) =>
// 					this.dropdownEnter(
// 						e,
// 						formatLabel(mainLink.path, mainLink.alias)
// 					)
// 				}
// 			>
// 				{activeLinkGroup.length > 0 && (
// 					<div style={dropdownLinksColumnStyles}>
// 						{activeLinkGroup.map((link, index) => (
// 							<NavLink
// 								key={`${link.path}-${index}`}
// 								to={link.path}
// 								style={dropdownLinkStyles}
// 							>
// 								{formatLabel(link.path, link.alias)}
// 							</NavLink>
// 						))}
// 					</div>
// 				)}
// 				{mainLink.image && (
// 					<div style={dropdownImageContainerStyles}>
// 						<img
// 							src={mainLink.image}
// 							alt={`${formatLabel(
// 								mainLink.path,
// 								mainLink.alias
// 							)} overview`}
// 							style={dropdownImageStyles}
// 						/>
// 						<div style={dropdownImageViewOverviewStyles}>
// 							View overview
// 							<span style={{ marginLeft: "5px" }}>&rarr;</span>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		);
// 	};
// 	protected renderDropdownArea = (): React.ReactNode => {
// 		return (
// 			<div
// 				style={dropdownContainerStyles}
// 				onMouseEnter={(e) => this.activeAreaEnter(e)}
// 				onMouseLeave={(e) => this.activeAreaLeave(e)}
// 			>
// 				{this.renderDropdownContent()}
// 			</div>
// 		);
// 	};
// 	protected construct(): React.ReactNode {
// 		const baseNavLinks = super.construct();
// 		const dropdownArea = this.renderDropdownArea();
// 		return (
// 			<>
// 				{baseNavLinks}
// 				{dropdownArea}
// 			</>
// 		);
// 	}
// }
// export const TestExpandableTitleBar: React.FC = () => {
// 	const navLinks: ITitleBarLink[][] = [
// 		[
// 			{ path: "/", alias: "Home", image: dropdownImage },
// 			{ path: "/demo_page", alias: "Demo Page" },
// 		],
// 		[{ path: "/thejourney", alias: "The Journey" }],
// 	];
// 	return (
// 		<ExpandableTitleBar
// 			logoSrc={logo}
// 			links={navLinks}
// 		/>
// 	);
// };
// export interface IPillTitleBarState extends ITitleBarState {
// 	isScrolled: boolean;
// 	hasReturned: boolean;
// }
// export class PillTitleBar extends ExpandableTitleBar<
// 	ITitleBarProps,
// 	IPillTitleBarState
// > {
// 	constructor(props: ITitleBarProps) {
// 		super(props);
// 		this.state = {
// 			...this.state,
// 			isScrolled: false,
// 			hasReturned: false,
// 		} as IPillTitleBarState;
// 	}
// 	public componentDidMount(): void {
// 		window.addEventListener("scroll", this.handleScroll);
// 	}
// 	public componentWillUnmount(): void {
// 		window.removeEventListener("scroll", this.handleScroll);
// 	}
// 	protected handleScroll = (): void => {
// 		const uThreshold = 10;
// 		const dThreshold = 1;
// 		if (!this.state.isScrolled) {
// 			const scrolled = window.scrollY > dThreshold;
// 			if (scrolled) {
// 				console.log(scrolled);
// 				this.setState({ isScrolled: scrolled });
// 			}
// 		} else if (this.state.isScrolled) {
// 			const n_scrolled = window.scrollY < uThreshold;
// 			if (n_scrolled) {
// 				console.log(n_scrolled);
// 				this.setState({ isScrolled: !n_scrolled });
// 			}
// 		}
// 	};
// 	titleBarStyles(): React.CSSProperties {
// 		const baseStyles = super.titleBarStyles();
// 		const { isScrolled } = this.state;

// 		return {
// 			...baseStyles,
// 			transition: "all 0.5s ease-in-out",
// 			...(isScrolled ? pillBarOverrides : {}),
// 		};
// 	}
// }
// export const TestPillTitleBar: React.FC = () => {
// 	const navLinks: ITitleBarLink[][] = [
// 		[
// 			{ path: "/", alias: "Home", image: dropdownImage },
// 			{
// 				path: "/demo_page",
// 				alias: "Demo Page",
// 			} /* Only used to verify dropdown logic */,
// 		],
// 		[{ path: "/thejourney", alias: "The Journey" }],
// 		[{ path: "/ourservices", alias: "Our Services" }],
// 		[{ path: "/contact", alias: "Contact" }],
// 	];
// 	return (
// 		<PillTitleBar
// 			logoSrc={logo}
// 			links={navLinks}
// 		/>
// 	);
// };
// src/components/titlebar/TitleBar.tsx
/**
 * @improvement - Refactored to use Functional Components and Hooks.
 * This promotes composition over inheritance, making the code more flexible and reusable.
 * Stateful logic is extracted into custom hooks (useActiveLink, usePillOnScroll).
 */
import React, { useState, useEffect, useMemo, CSSProperties } from "react";
import logo from "../../assets/logo.png";
import dropdownImage from "../../assets/dude1.jpg";
import { NavLink, useLocation } from "react-router-dom";
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
import { ITitleBarLink, ITitleBarProps } from "./TitleBar.types";

// Helper function remains unchanged
const formatLabel = (key: string, alias?: string): string => {
	if (alias) return alias;
	if (key === "/") return "Home";
	return key
		.replace(/_/g, " ")
		.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1));
};

//== Custom Hooks for Logic Reusability ==//

const useActiveLink = (links: ITitleBarLink[][]) => {
	const location = useLocation();

	const initialActiveAlias = useMemo(() => {
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

	const [activeLinkAlias, setActiveLinkAlias] = useState(initialActiveAlias);
	const [isOverLink, setIsOverLink] = useState(false);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (!isActive) {
			setActiveLinkAlias(initialActiveAlias);
		}
	}, [initialActiveAlias, isActive]);

	const handleLinkOver = (alias: string) => {
		setIsOverLink(true);
		setActiveLinkAlias(alias);
	};

	const handleAreaLeave = () => {
		setIsActive(false);
		setIsOverLink(false);
		setActiveLinkAlias(initialActiveAlias);
	};

	const handleAreaEnter = () => setIsActive(true);

	return {
		activeLinkAlias,
		isOverLink,
		isActive,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	};
};

const usePillOnScroll = (dThreshold: number = 1, uThreshold: number = 10) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (!isScrolled && currentScrollY > dThreshold) {
				setIsScrolled(true);
			} else if (isScrolled && currentScrollY < uThreshold) {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isScrolled, dThreshold, uThreshold]);

	return isScrolled;
};

//== Base Presentational Components (Optional but good practice) ==//

const NavLinks: React.FC<{
	links: ITitleBarLink[][];
	activeLinkAlias: string;
	onLinkOver: (alias: string) => void;
}> = ({ links, activeLinkAlias, onLinkOver }) => (
	<div style={navLinksContainerStyles}>
		{links.map((linkGroup) => {
			const mainLink = linkGroup[0];
			if (!mainLink) return null;
			const displayAlias = formatLabel(mainLink.path, mainLink.alias);

			return (
				<div
					key={displayAlias}
					onMouseOver={() => onLinkOver(displayAlias)}
				>
					<NavLink
						to={mainLink.path}
						style={navLinkStyles(activeLinkAlias === displayAlias)}
					>
						{displayAlias}
					</NavLink>
				</div>
			);
		})}
	</div>
);

const DropdownContent: React.FC<{ activeLinkGroup: ITitleBarLink[] }> = ({
	activeLinkGroup,
}) => (
	<div style={dropdownStyles}>
		{activeLinkGroup.length > 1 && (
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
		{activeLinkGroup[0].image && (
			<div style={dropdownImageContainerStyles}>
				<img
					src={activeLinkGroup[0].image}
					alt={`${formatLabel(
						activeLinkGroup[0].path,
						activeLinkGroup[0].alias
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

//== Exported Functional Components ==//

export const TitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	// A basic bar with no dropdown or scroll logic
	const location = useLocation();
	const activeLink = useMemo(() => {
		// Simplified active logic for non-interactive bar
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
		<div
			style={interactionWrapperStyles}
			className="no-aos"
		>
			<div style={_titleBarStyles()}>
				<div style={logoContainerStyles}>
					<img
						src={logo}
						alt="Logo"
						style={logoStyles}
					/>
				</div>
				<NavLinks
					links={links}
					activeLinkAlias={activeLink}
					onLinkOver={() => {}}
				/>
				<div style={rightHandContainerStyles}>
					<button
						style={hamburgerStyle}
						aria-label="Menu"
					>
						<Menu size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};

export const ExpandableTitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const {
		activeLinkAlias,
		isOverLink,
		isActive,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useActiveLink(links);

	const activeLinkGroup = links.find((linkGroup) => {
		const mainLink = linkGroup[0];
		return (
			mainLink &&
			formatLabel(mainLink.path, mainLink.alias) === activeLinkAlias
		);
	});

	const showDropdown =
		(isOverLink || isActive) &&
		activeLinkGroup &&
		(activeLinkGroup.length > 1 || activeLinkGroup[0].image);

	return (
		<div
			style={interactionWrapperStyles}
			className="no-aos"
			onMouseLeave={handleAreaLeave}
		>
			<div style={_titleBarStyles()}>
				<div style={logoContainerStyles}>
					<img
						src={logo}
						alt="Logo"
						style={logoStyles}
					/>
				</div>
				<NavLinks
					links={links}
					activeLinkAlias={activeLinkAlias}
					onLinkOver={handleLinkOver}
				/>
				<div style={rightHandContainerStyles}>
					<button
						style={hamburgerStyle}
						aria-label="Menu"
					>
						<Menu size={24} />
					</button>
				</div>
			</div>

			{showDropdown && activeLinkGroup && (
				<div
					style={dropdownContainerStyles}
					onMouseEnter={handleAreaEnter}
				>
					<DropdownContent activeLinkGroup={activeLinkGroup} />
				</div>
			)}
		</div>
	);
};

export const PillTitleBar: React.FC<ITitleBarProps> = ({ links }) => {
	const {
		activeLinkAlias,
		isOverLink,
		isActive,
		handleLinkOver,
		handleAreaEnter,
		handleAreaLeave,
	} = useActiveLink(links);
	const isScrolled = usePillOnScroll();

	const titleBarStyles: CSSProperties = {
		..._titleBarStyles(),
		transition: "all 0.5s ease-in-out",
		...(isScrolled ? pillBarOverrides : {}),
	};

	const activeLinkGroup = links.find((linkGroup) => {
		const mainLink = linkGroup[0];
		return (
			mainLink &&
			formatLabel(mainLink.path, mainLink.alias) === activeLinkAlias
		);
	});

	const showDropdown =
		(isOverLink || isActive) &&
		activeLinkGroup &&
		(activeLinkGroup.length > 1 || activeLinkGroup[0].image);

	return (
		<div
			style={interactionWrapperStyles}
			className="no-aos"
			onMouseLeave={handleAreaLeave}
		>
			<div style={titleBarStyles}>
				<div style={logoContainerStyles}>
					<img
						src={logo}
						alt="Logo"
						style={logoStyles}
					/>
				</div>
				<NavLinks
					links={links}
					activeLinkAlias={activeLinkAlias}
					onLinkOver={handleLinkOver}
				/>
				<div style={rightHandContainerStyles}>
					<button
						style={hamburgerStyle}
						aria-label="Menu"
					>
						<Menu size={24} />
					</button>
				</div>
			</div>

			{showDropdown && activeLinkGroup && (
				<div
					style={dropdownContainerStyles}
					onMouseEnter={handleAreaEnter}
				>
					<DropdownContent activeLinkGroup={activeLinkGroup} />
				</div>
			)}
		</div>
	);
};

//== Test/Example Components (Unchanged) ==//

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

export const TestPillTitleBar: React.FC = () => {
	const navLinks: ITitleBarLink[][] = [
		[
			{ path: "/", alias: "Home", image: dropdownImage },
			{ path: "/demo_page", alias: "Demo Page" },
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
