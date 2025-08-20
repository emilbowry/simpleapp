// src/components/hexagons/HexagonsRow.types.ts

import React from "react";

import { formatComponent, ValidComponent } from "../../utils/reactUtils";

export interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
}
