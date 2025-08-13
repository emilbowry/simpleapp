import React from "react";
// import styles from "./PartnershipBar.module.css";
import { wrapLink, getImageEl, _noOp } from "../../utils/reactUtils";
import logo from "../../assets/logo.svg";

import HM from "../../assets/HewardMills.png";
import AZ from "../../assets/AZ.png";
import AS from "../../assets/AS.png";
import vf from "../../assets/vf.png";
import dct from "../../assets/dct.png";
import bm from "../../assets/BenchMark.png";
import tb from "../../assets/TB.png";
import { title_font_colour } from "../../utils/defaultColours";
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
const styles: {
	Small: React.CSSProperties;
	Large: React.CSSProperties;
} = {
	Small: {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "2rem",
		padding: "1rem",
		borderTop: "2px solid",
		borderBottom: "2px solid",
		borderColor: title_font_colour,
	},
	Large: {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "2rem",
		padding: "1rem",
		borderTop: "2px solid",
		borderBottom: "2px solid",
		borderColor: title_font_colour,
	},
};
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

		// const _style = `partnershipbar${size}`;

		return (
			<div style={styles[size]}>
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
		{ image: HM },
		{ image: AZ },
		{ image: AS },
		{ image: vf },
		{ image: dct },
		{ image: bm },
		{ image: logo },
		{ image: tb },
	],
});

export const demoSmallPB = <PartnershipBar {...demoSmallPartnershipBarData} />;
const demoLargePartnershipBarData = new Partners({
	...demoSmallPartnershipBarData, // shallow-copy the array reference
	size: "Large",
});

export const demoLargePB = <PartnershipBar {...demoLargePartnershipBarData} />;
