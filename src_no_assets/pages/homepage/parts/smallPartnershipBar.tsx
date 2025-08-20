// src/pages/homepage/parts/smallPartnershipBar.tsx

import React from "react";

import HM from "../../../assets/HewardMills.png";
import AZ from "../../../assets/AZ.png";
import AS from "../../../assets/AS.png";
import vf from "../../../assets/vf.png";
import dct from "../../../assets/dct.png";
import bm from "../../../assets/BenchMark.png";
import tb from "../../../assets/TB.png";
import { PartnershipBar } from "../../../components/partnershipbar/PartnershipBar";
import { Partners } from "../../../components/partnershipbar/PartnershipBar.types";
const demoSmallPartnershipBarData = new Partners({
	partners: [
		{ image: HM },
		{ image: AZ },
		{ image: AS },
		{ image: vf },
		{ image: dct },
		{ image: bm },
		{ image: tb },
	],
});

export const demoSmallPB: React.FC<{ index?: number }> = ({ index = 0 }) => (
	<PartnershipBar
		{...demoSmallPartnershipBarData}
		index={index}
	/>
);
