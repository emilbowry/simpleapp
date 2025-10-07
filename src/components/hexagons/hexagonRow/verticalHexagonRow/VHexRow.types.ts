// src/components/hexagons/hexagonRow/VHexRow.types.ts

import React from "react";
import { ValidComponent } from "../../../../utils/reactUtils";

export interface IVerticalHexagonGridState {
	isNarrow: boolean;
}

// export interface VerticalHexagonFeatureGridProps {
// 	featureCallouts: IFeatureCalloutProps[];

// 	hexagonArgs: any; // Consider a more precise type if 'args' are well-defined
// 	theme?: number;
// 	useVerticalAlignment?: boolean;
// }
export interface VerticalHexagonFeatureGridProps {
	featureCallouts: ValidComponent[][];

	hexagonArgs: any; // Consider a more precise type if 'args' are well-defined
	theme?: number;
	useVerticalAlignment?: boolean;
}
