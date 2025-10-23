// src/components/hexagons/hexagonRow/HexagonRow.consts.ts

const DEFAULT_RELATIVE_SPACING: number = 15;
const DEFAULT_ABSOLUTE_SPACING = 0;
const ASPECT_RATIO = 2 / Math.sqrt(3); /*  Width/Height,  W=H.r */
const n = 3;
const CONTAINER_per_Element = 1 / n;

const SIDE_SHIFT = 25;

export {
	DEFAULT_RELATIVE_SPACING,
	ASPECT_RATIO,
	CONTAINER_per_Element,
	n,
	DEFAULT_ABSOLUTE_SPACING,
	SIDE_SHIFT,
};
