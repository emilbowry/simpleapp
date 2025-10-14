// src/features/titlebar/TitleBarUIClassed.tsx

import React, { useMemo } from "react";
import {
	dropdownContainerStyles,
	interactionWrapperStyles,
} from "./TitleBar.styles";
import {
	ITitleBarLink,
	ITitleBarProps,
	ITitleBarUIState,
} from "./TitleBar.types";
import {
	DropDownOuter,
	formatLabel,
	TitleBarLogo,
	TitleBarMenu,
	TitleBarUILinks,
} from "./TitleBarHelpers";
class TitleBar extends React.Component<ITitleBarProps, ITitleBarUIState> {
	useActiveTitleLink = () => {
		const onLinkOver = (alias: string) => {
			this.setState({ isActive: true, activeLinkAlias: alias });
		};
		const onWrapperMouseLeave = () => {
			this.setState({
				isActive: false,
				activeLinkAlias: this.state.initialActiveAlias,
				isOverLink: false,
			});
		};
		return {
			onLinkOver,
			onWrapperMouseLeave,
		};
	};
	getAlias = () => {
		const currentPath = window.location.pathname;
		for (const linkGroup of this.props.links) {
			for (const subLink of linkGroup) {
				if (subLink.path === currentPath) {
					return formatLabel(linkGroup[0].path, linkGroup[0].alias);
				}
			}
		}
		return "";
	};
	override state = {
		initialActiveAlias: this.getAlias(),
		activeLinkAlias: this.getAlias(),
		isActive: false,
		isOverLink: false,
		setActiveLinkAlias: (alias: string) => {
			this.setState({ activeLinkAlias: alias });
		},
		setIsActive: (active: boolean) => {
			this.setState({ isActive: active });
		},
		setIsOverLink: (overlink: boolean) => {
			this.setState({ isOverLink: overlink });
		},
	};
	constructor(props: any) {
		super(props);
	}
	InnerTitleBarUI: React.FC<ITitleBarProps> = () => {
		const { links, style_fn = () => ({}) } = this.props;
		const { activeLinkAlias } = this.state;
		const { onWrapperMouseLeave, onLinkOver } = this.useActiveTitleLink();
		return (
			<div
				style={interactionWrapperStyles}
				className="no-aos"
				onMouseLeave={onWrapperMouseLeave}
			>
				<div style={style_fn()}>
					<TitleBarLogo />
					<TitleBarUILinks
						activeLinkAlias={activeLinkAlias}
						links={links}
						onLinkOver={onLinkOver}
					/>
					<TitleBarMenu />
				</div>
				{this.getChildren()}
			</div>
		);
	};
	getChildren() {
		return this.props.children;
	}
	override render() {
		return <this.InnerTitleBarUI {...this.props} />;
	}
}
class DropDownTitleBar extends TitleBar {
	useActiveDropdownLink = () => {
		const onMouseEnter = () => this.setState({ isActive: true });
		return { onMouseEnter };
	};
	useDropDownInteractions = (links: ITitleBarLink[][]) => {
		const { activeLinkAlias, isOverLink, isActive } = this.state;
		const activeLinkGroup = useMemo(
			() =>
				links.find((linkGroup) => {
					const mainLink = linkGroup[0];
					return (
						mainLink &&
						formatLabel(mainLink.path, mainLink.alias) ===
							activeLinkAlias
					);
				}),
			[links, activeLinkAlias]
		);
		const showDropdown = !!(
			(isOverLink || isActive) &&
			activeLinkGroup &&
			(activeLinkGroup.length > 1 || activeLinkGroup[0].image)
		);
		return {
			activeLinkGroup,
			showDropdown,
		};
	};
	Dropdown: React.FC = () => {
		const { activeLinkGroup, showDropdown } = this.useDropDownInteractions(
			this.props.links
		);
		const { onMouseEnter } = this.useActiveDropdownLink();
		return (
			showDropdown &&
			activeLinkGroup && (
				<div
					style={dropdownContainerStyles}
					onMouseEnter={onMouseEnter}
				>
					<DropDownOuter activeLinkGroup={activeLinkGroup} />
				</div>
			)
		);
	};
	override getChildren() {
		return (<this.Dropdown />) as any;
	}
}
export { DropDownTitleBar, TitleBar };
