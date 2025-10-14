import React, { useState } from "react";
import { wrapLink } from "../../utils/reactUtils";
import { PartnerImageWrapperStyle } from "./PartnershipBar.styles";
import { IPartner } from "./PartnershipBar.types";

const PartnerImage: React.FC<{ partner: IPartner }> = ({ partner }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { image, link } = partner;

	const imageEl = (
		<div style={PartnerImageWrapperStyle}>
			<img
				src={image}
				width={"250"}
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
				style={{
					filter: isHovered
						? "saturate(1) grayscale(0) brightness(1)"
						: "saturate(0) grayscale(1) brightness(0)",
					transition: "filter 0.3s ease-in-out",
					justifyContent: "center",
				}}
			/>
		</div>
	);
	return wrapLink(link, imageEl);
};

const PartnerRow: React.FC<{
	partners: readonly IPartner[];
	style: React.CSSProperties;
}> = ({ partners, style }) => (
	<>
		{partners.map((partner, index) => (
			<div style={style}>
				<PartnerImage
					key={index}
					partner={partner}
				/>
			</div>
		))}
	</>
);
export { PartnerImage, PartnerRow };
