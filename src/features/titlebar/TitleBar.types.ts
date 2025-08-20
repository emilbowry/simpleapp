// src/features/titlebar/TitleBar.types.ts

import React from "react";

// ============= Types =============

export interface ITitleBarLink {
	alias?: string;
	path?: string;
	layout: {
		inline: boolean;
		dropdown: boolean;
	};
}

export type TTitleBarLinkConfig = Record<string, ITitleBarLink>;
export interface ITitleBarProps {
	logoSrc: string;
	links: TTitleBarLinkConfig;
}
export interface ITitleBarState {
	open: boolean;
}
