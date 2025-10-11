// src/pages/homepage/parts/smallPartnershipBar.tsx

import AS from "../../../assets/AS.png";
import AZ from "../../../assets/AZ.png";
import bm from "../../../assets/BenchMark.png";
import dct from "../../../assets/dct.png";
import HM from "../../../assets/HewardMills.png";
import tb from "../../../assets/TB.png";
import vf from "../../../assets/vf.png";
import { Partners } from "../../../components/partnership-bar/PartnershipBar.types";
export const partners = new Partners({
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
