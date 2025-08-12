import React from "react";
import { logo_yellow, logo_blue } from "../../utils/defaultColours";
export const DefaultHexagon: React.ReactNode = (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<mask id="cutout">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
					fill="white"
				/>
			</mask>
		</defs>

		<path
			d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
			mask="url(#cutout)"
		/>
	</svg>
);

export const LogoHexagon: React.ReactNode = (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient
				id="chevronGradient"
				x1="10%"
				y1="50%"
				x2="100%"
				y2="50%"
			>
				<stop offset="0%" stop-color={logo_yellow} />
				<stop offset="100%" stop-color={logo_blue} />
			</linearGradient>
			<mask id="hexCutoutMask">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z"
					fill="white"
				/>
				<path
					d="m 25 86.6025 l 50 -86.6025 l -50 -86.6025 h 25 l 50 86.6025 l -50 86.6025 Z"
					fill="black"
				/>

				<path d="M 95 0 v 5 h120 v -10 h-120 v5" fill="black" />
			</mask>
		</defs>

		<path
			d="M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z"
			fill={logo_yellow}
			mask="url(#hexCutoutMask)"
		/>

		<path
			d="M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z"
			fill="url(#chevronGradient)"
			mask="url(#hexCutoutMask)"
		/>
	</svg>
);

export const LogoHexagon_nosplit: React.ReactNode = (
	<svg
		width="300"
		height="300"
		viewBox="0 -150 300 300"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient
				id="chevronGradient"
				x1="10%"
				y1="50%"
				x2="100%"
				y2="50%"
			>
				<stop offset="0%" stop-color={logo_yellow} />
				<stop offset="100%" stop-color={logo_blue} />
			</linearGradient>
			<mask id="hexCutoutMask">
				<path
					d="M 50 86.6025 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 Z"
					fill="white"
				/>
			</mask>
		</defs>

		<path
			d="M -21.0101 0.0202 L 15.8088 -105.7362 L 89.4466 -0.3715 L 25.2093 85.8005 L -21.2164 0.1027 Z"
			fill={logo_yellow}
			mask="url(#hexCutoutMask)"
		/>

		<path
			d="M 37.8305 -96.7441 L 93.4715 -0.224 L 37.0735 100.4596 L 185.8279 111.8149 L 233.1417 -14.9859 L 191.8841 -96.7441 Z"
			fill="url(#chevronGradient)"
			mask="url(#hexCutoutMask)"
		/>
	</svg>
);
