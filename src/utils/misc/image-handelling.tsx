// src/utils/misc/image-handelling.tsx

import React from "react";
import ReactDOMServer from "react-dom/server";

export const fromSVGString = (svgString: string): string => {
	return `url("${get_data_uri(svgString)}")`;
};

export const get_data_uri = (svgString: string): string => {
	const uri = encodeURIComponent(svgString);

	return `data:image/svg+xml,${uri}`;
};
export const stringifySVG = (svg: React.ReactElement): string => {
	return ReactDOMServer.renderToStaticMarkup(svg);
};
