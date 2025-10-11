// src/components/hexagons/hexagon-row/HexagonRow.types.ts

import React from "react";
import { ValidComponent } from "../../../utils/reactUtils";

interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
	len?: number;
}
interface IHexRowLayoutProps extends IHexagonRowElements {
	relative_space: number;
	absolute_space: number;
}
interface IHexagonGridElements extends Partial<IHexRowLayoutProps> {
	rows: IHexagonRowElements[];

	containerStyle?: React.CSSProperties;
	class_name?: string;
}
export type { IHexagonRowElements, IHexRowLayoutProps, IHexagonGridElements };
