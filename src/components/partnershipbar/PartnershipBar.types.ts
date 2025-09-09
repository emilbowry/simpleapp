// src/components/partnershipbar/PartnershipBar.styles.ts

export interface IPartner {
	image: string;
	link?: string;
}

export type TPartnerSize = "Small" | "Large" | undefined;

export interface IPartners {
	partners: readonly IPartner[];
	size?: TPartnerSize;
}

export class Partners {
	readonly partners: readonly IPartner[];
	readonly size: TPartnerSize;

	constructor(partners: IPartners) {
		let partnersObj = partners;
		this.partners = partnersObj.partners;
		this.size = partnersObj.size ?? "Small";
	}
}

export interface IPartnershipBarProps extends Partners {
	index?: number;
}

export interface IPartnerImageProps {
	partner: IPartner;
	size: TPartnerSize;
}
export interface IPartnerImageState {
	isHovered: boolean;
}
export interface IPartnershipBarState {
	smallViewPort: boolean;
}
