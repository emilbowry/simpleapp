// src/components/hexagons/Hexagons.types.ts

import React from "react";

export interface IComponentDefinitions {
	defs: React.ReactNode[];
	paths: React.ReactNode[];
}
export interface IHexagonConstruction {
	construct(args?: any): IComponentDefinitions;
}
