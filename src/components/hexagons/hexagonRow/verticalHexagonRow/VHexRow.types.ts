// src/components/hexagons/hexagonRow/VHexRow.types.ts

import React from "react";
import { ValidComponent } from "../../../../utils/reactUtils";
export interface IFeatureCalloutProps {
	themeId?: number;
	header?: ValidComponent;
	body: ValidComponent;
	footer?: ValidComponent;
}
export interface IVerticalHexagonGridState {
	isNarrow: boolean;
}

export interface VerticalHexagonFeatureGridProps {
	featureCallouts: IFeatureCalloutProps[];

	hexagonArgs: any; // Consider a more precise type if 'args' are well-defined
	theme?: number;
	useVerticalAlignment?: boolean;
}
