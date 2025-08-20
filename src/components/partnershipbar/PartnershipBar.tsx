// src/components/partnershipbar/PartnershipBar.tsx

import React from "react";
import { wrapLink, getImageEl, _noOp } from "../../utils/reactUtils";
import { title_font_colour } from "../../utils/defaultColours";
import { Theme } from "../../styles";
import { PartnerStyles, imageStyle } from "./PartnershipBar.styles";
import {
	PartnershipBarProps,
	Partners,
	IPartner,
	TPartnerSize,
} from "./PartnershipBar.types";
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
		let currentStyle: React.CSSProperties = { ...PartnerStyles[size] };
		let theme = Theme(index);
		currentStyle.borderColor = theme.tertiaryColor;
		if (size === "Small") {
			currentStyle.gridTemplateColumns = `repeat(${partners.length}, 1fr)`;
		}
		return (
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
