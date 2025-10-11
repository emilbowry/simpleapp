interface ITitleBarLink {
	alias?: string;
	path: string;
	image?: string;
}

interface ITitleBarProps {
	logoSrc: string;
	links: ITitleBarLink[][];
}
interface ITitleBarUILinksProps {
	activeLinkAlias: string;
	links: ITitleBarLink[][];
	onLinkOver: (alias: string) => void;
}

interface ITitleBarUIProps {
	links: ITitleBarLink[][];
	barStyle: React.CSSProperties;
	activeLinkAlias: string;
	onLinkOver: (alias: string) => void;
	onWrapperMouseLeave: () => void;
	children?: React.ReactNode; // For rendering the dropdown
}
export {
	ITitleBarLink,
	ITitleBarProps,
	ITitleBarUILinksProps,
	ITitleBarUIProps,
};
