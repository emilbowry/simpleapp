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
	relative_spacing: number;
	absolute_spacing: number;
};

type TScalingFunction = (scale_params: IScaleParams) => number;
// type TDualScalingFunction =  (params: IScaleParams) =>  number
// interface TDualScalingFunction extends TScalingFunction {
// 	(params: IScaleParams, ...others: any[]): [number,number];
// }

type TDualScalingFunction = TScalingFunction extends (
	scale_params: infer U
) => ReturnType<TScalingFunction>
	? (
			scale_params: U,
			...others: any[]
	  ) => [ReturnType<TScalingFunction>, ReturnType<TScalingFunction>]
	: never;

type TWithCalc = <D extends boolean | undefined>(
	fn: any,
	dual?: D
) => (
	...args: Parameters<typeof fn>
) => D extends true ? [string, string] : string;

export type {
	IHexagonRowElements,
	THexRowLayoutProps,
	IHexagonGridElements,
	TScalingFunction,
	IScaleParams,
	TDualScalingFunction,
	TWithCalc,
};
