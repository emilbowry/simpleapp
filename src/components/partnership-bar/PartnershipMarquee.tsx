import React from "react";
import { PartnerRow } from "./PartnershipBar";
import { NUM_SETS } from "./PartnershipBar.consts";
import {
	// keyframes,
	marqueeContentStyle,
	marqueeFrameStyle,
	marqueeWindowStyle,
	partnerWrapperStyle,
} from "./PartnershipBar.styles";
import {
	IPartnerMarqueeContentProps,
	IPartnershipBar,
} from "./PartnershipBar.types";

import { styleObjectToString } from "../../styles";
import { TAtRule, TValidStyle } from "../../utils/styles.types";

const keyframesObj: TValidStyle<TAtRule, undefined, "to" | "from"> = {
	"@keyframes slide-in": {
		to: {
			transform: "translateX(-100%)",
		},
		from: {
			transform: "translateX(0%)",
		},
	},
};

const PartnershipMarquee: React.FC<IPartnershipBar> = ({ partners }) => {
	return (
		<div className="no-aos">
			<style>{styleObjectToString(keyframesObj)}</style>
			<div style={marqueeFrameStyle}>
				<div style={marqueeWindowStyle}>
					<PartnerMarqueeContent
						numSets={NUM_SETS}
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
		<>
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
		</>
	);
};

export { PartnershipMarquee };
