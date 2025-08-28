// // src/components/partnershipbar/PartnershipBar.tsx

// import React from "react";
// import { wrapLink, getImageEl, _noOp } from "../../utils/reactUtils";
// import { title_font_colour } from "../../utils/defaultColours";
// import { Theme } from "../../styles";
// import { PartnerStyles, imageStyle } from "./PartnershipBar.styles";
// import {
// 	PartnershipBarProps,
// 	Partners,
// 	IPartner,
// 	TPartnerSize,
// } from "./PartnershipBar.types";

// export class PartnershipBar extends React.Component<PartnershipBarProps> {
// 	public static PartnerImage: React.FC<{
// 		partner: IPartner;
// 		size: TPartnerSize;
// 	}> = ({ partner, size }) => {
// 		const { image, link } = partner;

// 		let _ = _noOp(size); //`size` may be used later

// 		const imageEl = getImageEl(image, imageStyle);

// 		const linkedEl = wrapLink(link, imageEl);
// 		return (
// 			<div
// 				style={{
// 					filter: "greyscale(1)",
// 				}}
// 			>
// 				{linkedEl}
// 			</div>
// 		);
// 	};
// 	render() {
// 		const { partners, size = "Small", index = 0 } = this.props;
// 		let currentStyle: React.CSSProperties = { ...PartnerStyles[size] };
// 		let theme = Theme(index);
// 		currentStyle.borderColor = theme.tertiaryColor;
// 		if (size === "Small") {
// 			currentStyle.gridTemplateColumns = `repeat(${partners.length}, 1fr)`;
// 		}
// 		return (
// 			<div
// 				style={{
// 					...currentStyle,
// 				}}
// 			>
// 				{partners.map((partner, _index) => (
// 					<PartnershipBar.PartnerImage
// 						key={_index}
// 						partner={partner}
// 						size={size}
// 					/>
// 				))}
// 			</div>
// 		);
// 	}
// }

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

// --- Helper Component Definition ---
// 1. Define PartnerImage as a standalone class within the same file.

// Interfaces for the component's props and state
interface PartnerImageProps {
	partner: IPartner;
	size: TPartnerSize;
}
interface PartnerImageState {
	isHovered: boolean;
}

class PartnerImage extends React.Component<
	PartnerImageProps,
	PartnerImageState
> {
	constructor(props: PartnerImageProps) {
		super(props);
		this.state = {
			isHovered: false,
		};
	}

	handleMouseOver = () => {
		this.setState({ isHovered: true });
	};

	handleMouseOut = () => {
		this.setState({ isHovered: false });
	};

	render() {
		const { partner } = this.props;
		const { isHovered } = this.state;
		const { image, link } = partner;

		const imageEl = getImageEl(image, imageStyle);
		const linkedEl = wrapLink(link, imageEl);

		return (
			<div
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
				style={{
					filter: isHovered ? "grayscale(0)" : "grayscale(1)",
					transition: "filter 0.3s ease-in-out",
				}}
			>
				{linkedEl}
			</div>
		);
	}
}

// --- Main Exported Component ---
// 2. The main PartnershipBar component remains unchanged.

export class PartnershipBar extends React.Component<PartnershipBarProps> {
	render() {
		const { partners, size = "Small", index = 0 } = this.props;
		let currentStyle: React.CSSProperties = { ...PartnerStyles[size] };
		let theme = Theme(index);
		currentStyle.borderColor = theme.tertiaryColor;
		if (size === "Small") {
			currentStyle.gridTemplateColumns = `repeat(${partners.length}, 1fr)`;
		}
		return (
			<div
				style={{
					...currentStyle,
				}}
			>
				{partners.map((partner, _index) => (
					// 3. Use the PartnerImage class defined above.
					<PartnerImage
						key={_index}
						partner={partner}
						size={size}
					/>
				))}
			</div>
		);
	}
}
