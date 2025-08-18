// src/components/partnershipbar/PartnershipBar.tsx

import React from "react";
import { wrapLink, getImageEl, _noOp } from "../../utils/reactUtils";
import { title_font_colour } from "../../utils/defaultColours";
import { Theme } from "../../styles";

interface IPartner {
	image: string;
	link?: string;
}

type TPartnerSize = "Small" | "Large" | undefined;

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
const styles: {
	Small: React.CSSProperties;
	Large: React.CSSProperties;
} = {
	Small: {
		display: "grid",
		gridTemplateRows: "1fr",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "2rem",
		padding: "1rem",
		borderTop: "3px solid",
		borderBottom: "3px solid",
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

const imageStyle: React.CSSProperties = {
	maxWidth: "100%",
	height: "auto",
	display: "block",
	margin: "0 auto",
};
interface PartnershipBarProps extends Partners {
	index?: number;
}

export class PartnershipBar extends React.Component<PartnershipBarProps> {
	public static PartnerImage: React.FC<{
		partner: IPartner;
		size: TPartnerSize;
	}> = ({ partner, size }) => {
		const { image, link } = partner;

		let _ = _noOp(size); //`size` may be used later

		const imageEl = getImageEl(image, imageStyle);

		const linkedEl = wrapLink(link, imageEl);
		return <div>{linkedEl}</div>;
	};
	render() {
		const { partners, size = "Small", index = 0 } = this.props;
		let currentStyle: React.CSSProperties = { ...styles[size] };
		let theme = Theme(index);
		currentStyle.borderColor = theme.tertiaryColor;
		if (size === "Small") {
			currentStyle.gridTemplateColumns = `repeat(${partners.length}, 1fr)`;
		}

		// if (size === "Small") {
		// 	styles[
		// 		size
		// 	].gridTemplateColumns = `repeat(${partners.length}, 1fr)`;
		// }
		``;
		return (
			// <div style={styles[size]}>
			<div style={currentStyle}>
				{partners.map((partner, _index) => (
					<PartnershipBar.PartnerImage
						key={_index}
						partner={partner}
						size={size}
					/>
				))}
			</div>
		);
	}
}
