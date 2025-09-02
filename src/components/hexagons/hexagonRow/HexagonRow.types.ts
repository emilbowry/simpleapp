// src/components/hexagons/HexagonsRow.types.ts

import React from "react";

import { formatComponent, ValidComponent } from "../../../utils/reactUtils";

export interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
}
export interface IHexagonGridElements {
	rows: IHexagonRowElements[];
}
export interface IVerticalHexagonRowProps {
	index: number;
	element: React.ReactNode;
	size?: number;
	gap?: number;
}
