// src/features/titlebar/TitleBar.types.ts

interface ITitleBarLink {
	alias?: string;
	path: string;
	image?: string;
}

interface ITitleBarProps {
	logoSrc: string;
	links: ITitleBarLink[][];
	style_fn?: (...args: any[]) => React.CSSProperties;
	children?: React.ReactNode;
}
interface ITitleBarUILinksProps {
	activeLinkAlias: string;
	links: ITitleBarLink[][];
	onLinkOver: (alias: string) => void;
}

interface ITitleBarUIState {
	initialActiveAlias: string;
	activeLinkAlias: string;
	setActiveLinkAlias:
		| React.Dispatch<React.SetStateAction<string>>
		| ((alias: string) => void);
	isOverLink: boolean;
	setIsOverLink:
		| React.Dispatch<React.SetStateAction<boolean>>
		| ((overlink: boolean) => void);
	isActive: boolean;
	setIsActive:
		| React.Dispatch<React.SetStateAction<boolean>>
		| ((active: boolean) => void);
}
export type {
	ITitleBarLink,
	ITitleBarProps,
	ITitleBarUILinksProps,
	ITitleBarUIState,
};
