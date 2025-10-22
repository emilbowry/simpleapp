// src/features/footer/FooterLayoutHandler.tsx

import React from "react";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";
import { volume_constant_size } from "../../styles";

const FooterLayoutHandler: React.FC<{
	component: ValidComponent;
	styling?: React.CSSProperties;
}> = ({ component, styling = {} }) => {
	return (
		<div
			style={{
				marginTop: "calc(-70vh - 60px)",
				fontSize: `calc(1.5*${volume_constant_size})`,
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
						...styling,
					}}
				>
					{formatComponent(component)}
				</div>
			</div>
		</div>
	);
};

export { FooterLayoutHandler };
