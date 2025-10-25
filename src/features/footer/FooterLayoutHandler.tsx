// src/features/footer/FooterLayoutHandler.tsx

import React from "react";
import { VOLUME_CONSTANT_SIZE } from "../../styles";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";

const FooterLayoutHandler: React.FC<{
	component: ValidComponent;
	StyleOverrides?: React.CSSProperties;
}> = ({ component, StyleOverrides = {} }) => {
	return (
		<div
			style={{
				marginTop: "calc(-70vh - 60px)",
				fontSize: `calc(1.5*${VOLUME_CONSTANT_SIZE})`,
				zIndex: "-15",
			}}
		>
			<div
				/* resultant height cut */
				style={{
					height: "70vh",
					width: "100%",
				}}
			/>
			<div
				style={{
					position: "sticky",
					width: "100%",

					bottom: "0",
					height: "70vh",
				}}
			>
				<div
					style={{
						position: "relative",
						isolation: "isolate",
						width: "100%",
						height: "70vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",

						alignContent: "center",
						...StyleOverrides,
					}}
				>
					{formatComponent(component)}
				</div>
			</div>
		</div>
	);
};

export { FooterLayoutHandler };
