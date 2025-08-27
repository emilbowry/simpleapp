// src/features/titlebar/TitleBar.types.ts

import React from "react";

export interface ITitleBarLink {
	alias?: string;
	path?: string;
	image?: string;
	layout: {
		inline: boolean;
		dropdown: boolean;
	};
}

export interface ITitleBarLink {
	alias?: string;
	paths?: string[];
	image?: string;
}

export type TTitleBarLinkConfig = Record<string, ITitleBarLink>;
export interface ITitleBarProps {
	logoSrc: string;
	links: TTitleBarLinkConfig;
}
export interface ITitleBarState {
	open: boolean;
}
