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
