// src/components/hexagons/ImageHexagon.tsx

import React from "react";
import { Hexagon } from "./Hexagons";

//
// ===== ImageHexagon =====
//

class ImageHexagon extends Hexagon {
	uniqueId = "img-id-" + crypto.randomUUID();
	override construct() {
		let components = super.construct();
		components.defs.push(
			<pattern
				id={this.uniqueId}
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
			fill: `url(#${this.uniqueId})`,
		});
		return components;
	}
}

export { ImageHexagon };
