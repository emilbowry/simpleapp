// src/components/hexagons/Hexagons.types.ts

import React from "react";

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
