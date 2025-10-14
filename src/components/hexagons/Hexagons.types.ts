// src/components/hexagons/Hexagons.types.ts

import React from "react";
import { ValidComponent } from "../../utils/reactUtils";

interface IComponentDefinitions {
	defs: React.ReactNode[];
	paths: Required<React.ReactNode[]>;
}

interface HexagonStyleParams {
	size?: number;
	scale?: number;
	opacity?: number;
}
type TSanitationFunction = (
	args: TOptionalParameters,
	optional_f_params: any
) => any;
type ValidInput =
	| object
	| TSanitationFunction
	| string
	| number
	| boolean
	| bigint
	| symbol
	| null
	| undefined;

type TOptionalParameters = any;

interface IOptParamMap {
	key: string;
	alias?: string;
	return_value: ValidInput;

	f_params?: any;
}

type TRefNode<T extends Element> = T | null;
type TContentObserver = ResizeObserver | null;
type TOscillation = undefined | number;
type THexFC = React.FC<Partial<THexFCProps>>;

type THexFCProps = {
	element: ValidComponent[] | ValidComponent;
	useVerticalAlignment: boolean;
	children?: React.ReactNode;
	styles?: any;
};

interface IHexObjState {
	contentHeight: number | undefined;
	containerHeight: number;
	fontSize: number;
}
interface IHexagonState extends IHexObjState {
	setContainerRef: (node: TRefNode<HTMLDivElement>) => void;
	setContentRef: (node: TRefNode<Element>) => void;
	containerHeight: number;
	contentHeight: number;
	usePointedTop: boolean;
	fontSize: number;
	construct: (args?: any) => IComponentDefinitions;
}

export type {
	HexagonStyleParams,
	IHexagonState,
	IHexObjState,
	IOptParamMap,
	TContentObserver,
	THexFC,
	TOscillation,
	TRefNode,
};
