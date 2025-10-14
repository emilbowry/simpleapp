// src/features/footer/FooterLayoutHandler.tsx

import React from "react";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";

const FooterLayoutHandler: React.FC<{
	component: ValidComponent;
	styling?: React.CSSProperties;
}> = ({ component, styling = {} }) => {
	return (
		<div
			style={{
				marginTop: "calc(-70vh - 60px)",
				fontSize: "1.5rem",
				zIndex: "-15",
			}}
		>
			<div
				style={{
					height: "70vh" /* resultant height cut */,
					width: "100vw",
				}}
			/>
			<div
				style={{
					position: "sticky",
					width: "100vw",

					bottom: "0",
					height: "70vh",
				}}
			>
				<div
					style={{
						position: "relative",
						isolation: "isolate",
						width: "100vw",
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
