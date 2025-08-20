// src/components/partnershipbar/PartnershipBar.styles.ts

import React from "react";

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

export interface PartnershipBarProps extends Partners {
	index?: number;
}
