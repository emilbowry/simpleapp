// src/utils/reactUtils.tsx
import React from "react";

export const wrapLink = (
	link: string | undefined,
	el: React.ReactNode
): React.ReactNode => (link ? <a href={link}>{el}</a> : el);

export const getImageEl = (
	image: string | undefined | React.SVGElementType,
	styling: React.CSSProperties = {}
): React.ReactNode => (image ? <img src={image} style={styling}></img> : <></>);

export const _noOp = (_: any) => undefined;

type ComponentOrString = React.ReactNode | React.ComponentType | string;
export type ComponentOrStringList = ComponentOrString[];
export type ValidComponent =
	| React.ReactElement
	| ComponentOrString
	| ComponentOrStringList
	| null;

const emptyEl = <></>;
export const formatComponent = (
	component: ValidComponent,
	overlay = false,
	index = 0
): React.ReactNode | string => {
	if (component === null) {
		return emptyEl;
	} else if (typeof component === "string") {
		return component;
	} else if (React.isValidElement(component)) {
		return component;
	} else if (Array.isArray(component)) {
		return component.map((Comp, index) => (
			<div style={overlay ? { position: "absolute" } : {}} key={index}>
				{formatComponent(Comp)}
			</div>
		));
	} else if (
		typeof component === "function" ||
		(typeof component === "object" &&
			component !== null &&
			(component as any).prototype instanceof React.Component)
	) {
		const SingleComponent = component as React.ComponentType;
		return <SingleComponent />;
	} else {
		return component;
	}
};

import {
	midnight_green,
	dark_midnight_green,
	logo_blue,
	l_midnight_green,
	dark_mix_green,
	light_logo_blue,
	logo_yellow,
	light_mix_green,
	lighter_logo_blue,
} from "./defaultColours";
