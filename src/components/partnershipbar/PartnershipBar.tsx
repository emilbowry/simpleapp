// src/components/partnershipbar/PartnershipBar.tsx

import React from "react";
import { wrapLink, getImageEl, _noOp } from "../../utils/reactUtils";
import { title_font_colour } from "../../utils/defaultColours";

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
		// display: "flex",
		display: "grid",
		gridTemplateRows: "1fr",
		// flexWrap: "nowrap",
		// overflowX: "auto",
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

		// const imageEl = getImageEl(image);
		const imageEl = (
			<img
				src={image}
				alt="Partner logo"
				style={{
					maxWidth: "100%", // This makes the image shrink to fit its container
					height: "auto", // This maintains the aspect ratio
					display: "block", // Removes potential extra space below the image
					margin: "0 auto", // Horizontally centers the image within its grid cell
				}}
			/>
		);
		const linkedEl = wrapLink(link, imageEl);
		return <div>{linkedEl}</div>;
	};
	render() {
		const { partners, size = "Small" } = this.props;
		// const _style = `partnershipbar${size}`;

		if (size === "Small") {
			styles[
				size
			].gridTemplateColumns = `repeat(${partners.length}, 1fr)`;
		}

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

// const demoLargePartnershipBarData = new Partners({
// 	...demoSmallPartnershipBarData, // shallow-copy the array reference
// 	size: "Large",
// });

// export const demoLargePB = <PartnershipBar {...demoLargePartnershipBarData} />;
