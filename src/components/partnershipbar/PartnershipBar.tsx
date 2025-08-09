import React from "react";
import styles from "./PartnershipBar.module.css";
import { wrapLink, getImageEl, _noOp } from "../../utils/reactUtils";
import logo from "../../assets/logo.svg";
import growthouse from "../../assets/growthhouselogo.png";
import { CallOut, ICallOut } from "../callingcard/CallOut";
interface IPartner {
	image: string;
	link?: string;
}

type TPartnerSize = "Small" | "Large" | undefined;

export interface IPartners {
	partners: readonly IPartner[];
	size?: TPartnerSize;
}

class Partners {
	readonly partners: readonly IPartner[];
	readonly size: TPartnerSize;

	constructor(partners: IPartners) {
		let partnersObj = partners;
		this.partners = partnersObj.partners;
		this.size = partnersObj.size ?? "Small";
	}
}

export class PartnershipBar extends React.Component<Partners> {
	public static PartnerImage: React.FC<{
		partner: IPartner;
		size: TPartnerSize;
	}> = ({ partner, size }) => {
		const { image, link } = partner;

		let _ = _noOp(size); //`size` may be used later

		const imageEl = getImageEl(image);
		const linkedEl = wrapLink(link, imageEl);
		return <div>{linkedEl}</div>;
	};
	render() {
		const { partners, size = "Small" } = this.props;

		const _style = `partnershipbar${size}`;

		return (
			<div className={styles[_style]}>
				{partners.map((partner, index) => (
					<PartnershipBar.PartnerImage
						key={index}
						partner={partner}
						size={size}
					/>
				))}
			</div>
		);
	}
}

const demoSmallPartnershipBarData = new Partners({
	partners: [
		{ image: logo },
		{ image: growthouse },
		{ image: logo },
		{ image: logo },
		{ image: growthouse },
		{ image: growthouse },
		{ image: logo },
		{ image: growthouse },
	],
});

export const demoSmallPB = <PartnershipBar {...demoSmallPartnershipBarData} />;
const demoLargePartnershipBarData = new Partners({
	...demoSmallPartnershipBarData, // shallow-copy the array reference
	size: "Large",
});

export const demoLargePB = <PartnershipBar {...demoLargePartnershipBarData} />;
