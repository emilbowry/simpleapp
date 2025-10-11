//
// ===== CutHexagon =====

import { midnight_green } from "../../utils/defaultColours";
import { LogoLinearGradient } from "../callingcard/graphics";
import { Hexagon } from "./Hexagons";

//
class CutHexagon extends Hexagon {
	getDefaultAssignments() {
		return [
			...super.getDefaultAssignments(),
			{ key: "isLeftHanded", return_value: true },
			{ key: "colour", return_value: midnight_green },
		];
	}
	construct() {
		const { isLeftHanded, color } = this.santiseOptionalParameters();

		const flip = isLeftHanded ? -1 : 100;
		const cutPath = `M ${flip} 0 l 50 -86.6025 h1 l 50 86.6025  l -50 86.6025  h -1 z`;

		return {
			defs: [
				<mask id="cutoutMask">
					<path
						d={this.hexPath}
						fill="white"
					/>
					<path
						d={cutPath}
						fill="black"
					/>
				</mask>,
				LogoLinearGradient,
			],
			paths: [
				<path
					d={this.hexPath}
					mask="url(#cutoutMask)"
					fill={color}
				/>,
			],
		};
	}
}

export { CutHexagon };
