// src/features/titlebar/TitleBar.types.ts

import React from "react";

// ============= Types =============
export interface ITitleBarLinkConfig {
	alias?: string; // Optional label override
	path?: string; // Defaults to "/" + key
	layout: {
		inline: boolean;
		dropdown: boolean;
	};
}

export interface ITitleBarProps {
	logoSrc: string;
	links: Record<string, ITitleBarLinkConfig>;
}
export interface ITitleBarState {
	open: boolean;
}
