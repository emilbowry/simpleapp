// src/components/hexagons/HexagonsRow.types.ts

import { ValidComponent } from "../../../utils/reactUtils";

export interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
	len?: number;
}
export interface _IHexagonRowElements extends IHexagonRowElements {
	relative_space: number;
	absolute_space: number;
}
export interface IHexagonGridElements {
	rows: IHexagonRowElements[];
	relative_space?: number;
	absolute_space?: number;
}
