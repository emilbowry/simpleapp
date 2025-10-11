// src/components/hexagons/hexagon-row/HexagonRow.types.ts

import React from "react";
import { ValidComponent } from "../../../utils/reactUtils";

interface IHexagonRowElements {
	elements: readonly [ValidComponent, ValidComponent, ValidComponent];
	len?: number;
}
// interface IScaleParams {
// 	relative_space: number;
// 	absolute_space: number;
// }

type THexRowLayoutProps = IHexagonRowElements & IScaleParams;
// interface IHexRowLayoutProps extends IHexagonRowElements,IScaleParams {
// 	relative_space: number;
// 	absolute_space: number;
// }
interface IHexagonGridElements extends Partial<THexRowLayoutProps> {
	rows: IHexagonRowElements[];

	containerStyle?: React.CSSProperties;
	class_name?: string;
}

type IScaleParams = {
	relative_space: number;
	absolute_space: number;
};

type TScalingFunction = () => number | [number, number];
export type {
	IHexagonRowElements,
	THexRowLayoutProps,
	IHexagonGridElements,
	TScalingFunction,
};
