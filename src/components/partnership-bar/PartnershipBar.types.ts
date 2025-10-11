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

interface PartnershipBarFullWallProps {
	maxBricks: number;
	rows: { top: IPartner[]; mid: IPartner[]; bottom: IPartner[] };
	staticStyle: React.CSSProperties;
}
export type {
	IPartner,
	TPartnerSize,
	IPartners,
	IPartnershipBar,
	IPartnerMarqueeContentProps,
	PartnershipBarCompactWallProps,
	PartnershipBarFullWallProps,
};
