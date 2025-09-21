// src/components/hexagons/HexagonsRow.types.ts

import { ValidComponent } from "../../../utils/reactUtils";

export interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
	len?: number;
}
export interface IHexagonGridElements {
	rows: IHexagonRowElements[];
}
