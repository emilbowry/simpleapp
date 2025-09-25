// src/components/callingcard/callout/HexCallout.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import { Theme } from "../../../styles";

const verticalGetEl = (
	image: ValidComponent = <></>,

	title: ValidComponent = <></>,
	content: ValidComponent = <></>,
	themeid?: number
) => {
	const theme = themeid ? Theme(themeid) : undefined;
	return (
		<div
			style={{
				position: "relative",
				height: "100%",
				margin: 0,

				verticalAlign: "text-bottom",
			}}
		>
			<div
				style={{
					margin: 0,
					fontSize: 0,
				}}
			>
				no-op
			</div>
			<div
				style={{
					height: "calc(100%)",
					fontSize: "2vw",

					display: "block",
					margin: 0,

					textAlign: "center",
				}}
			>
				<div
					style={{
						position: "relative",
						padding: "0",
					}}
				>
					<div
						style={{
							position: "relative",
							visibility: "hidden",
							top: 0,
						}}
					>
						no-op
					</div>
					<div
						style={{
							fontSize: "2.5vw",
							position: "relative",

							height: "calc(100%)",
							margin: "auto",
						}}
					>
						{formatComponent(image)}
					</div>
					<div
						style={{
							fontSize: "3vw",
							height: "calc(100%)",
							// fontSize: "2rem",
							fontWeight: "400",
							textAlign: "center",
							margin: "2%",

							// margin: "auto",

							color: theme ? theme.tertiaryColor : "",
						}}
					>
						{formatComponent(title)}
					</div>
					<div
						style={{
							fontSize: "2.5vw",

							height: "calc(100%)",
							margin: "2%",

							textAlign: "center",
							color: theme ? theme.primaryColor : "",
						}}
					>
						{formatComponent(content)}
					</div>
				</div>
			</div>
		</div>
	);
};

/**
@hack
- NO-OP div ensures svg's lineheight calculation correct so remains geometrically precise
@improvement move and generalise in HexCallout
 */
const getEl2 = (date: string, content: string) => (
	<div
		style={{
			position: "relative",
			height: "100%",
			margin: 0,

			verticalAlign: "text-bottom",
		}}
	>
		<div
			style={{
				margin: 0,
				fontSize: 0,
			}}
		>
			no-op
		</div>
		<div
			style={{
				height: "calc(100%)",

				display: "block",
				margin: 0,

				textAlign: "center",
			}}
		>
			<div
				style={{
					position: "relative",
					padding: "0",
				}}
			>
				<h3
					style={{
						fontSize: "2.5vw",

						height: "calc(100%)",
					}}
				>
					{date}
				</h3>
				<p
					style={{
						fontSize: "2.5vw",

						height: "calc(100%)",
					}}
				>
					{content}
				</p>
			</div>
		</div>
	</div>
);
