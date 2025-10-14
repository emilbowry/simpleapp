// src/components/hexagons/LogoHexagon.tsx

import { logo_yellow } from "../../utils/defaultColours";
import { LogoLinearGradient } from "../callingcard/graphics";
import { Hexagon } from "./Hexagons";
import {
	Logo_Chev_Colour_Mask,
	Logo_Chev_Cutout,
	Logo_Chev_Diamond,
	Logo_Chev_Split,
} from "./Hexagons.consts";

class LogoHexagon extends Hexagon {
	override getDefaultAssignments() {
		return [
			...super.getDefaultAssignments(),
			{ key: "withGap", return_value: false },
		];
	}
	override construct() {
		const components = {
			defs: [LogoLinearGradient, <mask id="hexagon"></mask>],
			paths: [
				<path
					d={Logo_Chev_Diamond}
					fill={logo_yellow}
					mask="url(#logoCutout)"
				/>,
				<path
					d={Logo_Chev_Colour_Mask}
					fill="url(#logoGradient)"
					mask="url(#logoCutout)"
				/>,
			],
		};

		if (this.santiseOptionalParameters() == true) {
			components.defs.push(
				<mask id="logoCutout">
					<path
						d={this.hexPath}
						fill="white"
					/>
					<path
						d={Logo_Chev_Cutout}
						fill="black"
					/>
					<path
						d={Logo_Chev_Split}
						fill="black"
					/>
				</mask>
			);
		} else {
			components.defs.push(
				<mask id="logoCutout">
					<path
						d={this.hexPath}
						fill="white"
					/>
					<path
						d={Logo_Chev_Cutout}
						fill="black"
					/>
				</mask>
			);
		}
		return components;
	}
}

export { LogoHexagon };
