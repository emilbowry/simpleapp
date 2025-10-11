// src/components/hexagons/ImageHexagon.tsx

import React from "react";
import { Hexagon } from "./Hexagons";

//
// ===== ImageHexagon =====
//

class ImageHexagon extends Hexagon {
	construct() {
		let components = super.construct();

		components.defs.push(
			<pattern
				id="img1"
				patternContentUnits="objectBoundingBox"
				width="1"
				height="1"
			>
				<image
					href={this.props.img}
					width="1"
					height={`${2 / Math.sqrt(3)}`}
					preserveAspectRatio="xMidYMid slice"
				/>
			</pattern>
		);
		components.paths[0] = React.cloneElement(components.paths[0], {
			fill: "url(#img1)",
		});
		return components;
	}
}

export { ImageHexagon };
