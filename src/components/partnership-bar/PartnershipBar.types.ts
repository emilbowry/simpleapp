// src/components/partnershipbar/PartnershipBar.styles.ts

interface IPartner {
	image: string;
	link?: string;
}

type TPartnerSize = "Small" | "Large" | undefined;

interface IPartners {
	partners: readonly IPartner[];
	size?: TPartnerSize;
}

interface IPartnershipBar {
	partners: readonly IPartner[];
	index?: number;
}

interface IPartnerMarqueeContentProps {
	numSets: number[];
	partners: readonly IPartner[];
}

interface PartnershipBarCompactWallProps {
	partners: readonly IPartner[];
	staticStyle: React.CSSProperties;
}
interface IRows {
	[key: string]: any;
	top: IPartner[];
	mid: IPartner[];
	bottom: IPartner[];
}
interface PartnershipBarFullWallProps {
	maxBricks: number;
	rows: IRows;
	staticStyle: React.CSSProperties;
}
export type {
	IPartner,
	IPartnerMarqueeContentProps,
	IPartners,
	IPartnershipBar,
	IRows,
	PartnershipBarCompactWallProps,
	PartnershipBarFullWallProps,
	TPartnerSize,
};
