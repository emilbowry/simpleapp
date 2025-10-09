// src/components/hexagons/Hexagons.types.ts

import React from "react";
import { ValidComponent } from "../../utils/reactUtils";

export interface IComponentDefinitions {
	defs: React.ReactNode[];
	paths: React.ReactNode[];
}
export interface IHexagonConstruction {
	construct(args?: any): IComponentDefinitions;
}

export interface HexagonStyleParams {
	size?: number;
	scale?: number;
	opacity?: number;
}
export type TSanitationFunction = (
	args: TOptionalParameters,
	optional_f_params: any
) => any;
export type ValidInput =
	| object
	| TSanitationFunction
	| string
	| number
	| boolean
	| bigint
	| symbol
	| null
	| undefined;

export type TOptionalParameters = any;

export interface IOptionalParametersAssignments {
	key: string;
	key_alias?: string;
	return_value: ValidInput;

	optional_f_params?: any;
}

export type TRefNode<T extends Element> = T | null;
export type TContentObserver = ResizeObserver | null;
export type TOscillation = undefined | number;
export type THexFC = React.FC<Partial<THexFCProps>>;

export type THexFCProps = {
	element: ValidComponent[] | ValidComponent;
	useVerticalAlignment: boolean;
	children?: React.ReactNode;
	styles?: any;
};

export interface IHexObjState {
	contentHeight: number | undefined;
	containerHeight: number;
	fontSize: number;
}
