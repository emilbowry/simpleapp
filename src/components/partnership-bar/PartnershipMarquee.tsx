import React, { useEffect } from "react";
import { PartnerRow } from "./PartnershipBar";
import {
	keyframes,
	marqueeContentStyle,
	marqueeFrameStyle,
	marqueeWindowStyle,
	partnerWrapperStyle,
} from "./PartnershipBar.styles";
import {
	IPartnerMarqueeContentProps,
	IPartnershipBar,
} from "./PartnershipBar.types";

const MarqueeKeyframes: React.FC = () => {
	useEffect(() => {
		const styleTag = document.createElement("style");
		styleTag.innerHTML = keyframes;
		document.head.appendChild(styleTag);
		return () => {
			document.head.removeChild(styleTag);
		};
	}, []);

	return null;
};
const PartnershipMarquee: React.FC<IPartnershipBar> = ({ partners }) => {
	const MARQUEE_COPY_COUNT = 3;
	const numSets = Array.from({ length: MARQUEE_COPY_COUNT }, (_, i) => i);

	return (
		<div className="no-aos">
			<MarqueeKeyframes />
			<div style={marqueeFrameStyle}>
				<div style={marqueeWindowStyle}>
					<PartnerMarqueeContent
						numSets={numSets}
						partners={partners}
					/>
				</div>
			</div>
		</div>
	);
};

const PartnerMarqueeContent: React.FC<IPartnerMarqueeContentProps> = ({
	numSets,
	partners,
}) => {
	return (
		<div style={marqueeContentStyle}>
			{numSets.map((setIndex) => (
				<React.Fragment key={`set-${setIndex}`}>
					<PartnerRow
						partners={partners}
						style={partnerWrapperStyle}
					/>
				</React.Fragment>
			))}
		</div>
	);
};

export { PartnershipMarquee };
