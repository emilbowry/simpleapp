// src/components/hexagons/Hexagons.consts.ts

import { IHexObjState } from "./Hexagons.types";
const Flattop_Hex_Path =
	"M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z";
const Pointedtop_Hex_Path =
	"M 13.3975 -50 l 0 100 l 86.6025 50 l 86.6025 -50 l -0 -100 l -86.6025 -50 Z";

const Logo_Chev_Cutout =
	"M 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z";
const Logo_Chev_Colour_Mask =
	"M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z";
const Logo_Chev_Diamond =
	"M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z";
const Logo_Chev_Split = "M 95 0 v 5 h120 v -10 h-120 v5";
const Hex_Starting_State: IHexObjState = {
	contentHeight: undefined,
	containerHeight: 0,
	fontSize: 2.5,
};

export {
	Flattop_Hex_Path,
	Hex_Starting_State,
	Logo_Chev_Colour_Mask,
	Logo_Chev_Cutout,
	Logo_Chev_Diamond,
	Logo_Chev_Split,
	Pointedtop_Hex_Path,
};
