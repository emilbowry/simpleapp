// src/components/hexagons/hexagonRow/VHexRow.types.ts

import { ValidComponent } from "../../../../utils/reactUtils";
interface PointedtopHexagonFeatureGridProps {
	featureCallouts: ValidComponent[][];

	hexagonArgs: any; // Consider a more precise type if 'args' are well-defined
	theme?: number;
	useVerticalAlignment?: boolean;
}
export type { PointedtopHexagonFeatureGridProps };
