import React from "react";

export const wrapLink = (
	link: string | undefined,
	el: React.ReactNode
): React.ReactNode => (link ? <a href={link}>{el}</a> : el);

export const getImageEl = (image: string | undefined): React.ReactNode =>
	image ? <img src={image}></img> : <></>;

export const _noOp = (_: any) => undefined;
