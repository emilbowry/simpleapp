// src/components/callingcard/callout/newCallingCard.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../../utils/reactUtils";
import { Theme } from "../../../styles";

export interface INewCallingCardProps {
	components: ValidComponent[];
	header?: ValidComponent;
	title?: ValidComponent;
	footer?: ValidComponent;
	fullSpread?: boolean;
	index?: number;
	styleOverrides?: React.CSSProperties;
}

export const genericSectionStyle: React.CSSProperties = {
	// border: "1px solid black",
	// backgroundColor: "rgba(255, 0, 0, 0.2)",
	// backgroundColor: "transparent",
	// boxSizing: "border-box",
};

export const containerStyle: React.CSSProperties = {
	...genericSectionStyle,
	// display: "flex",
	flexDirection: "column",
	width: "100%",
	fontFamily: "sans-serif",
};

export const headerContainerStyle: React.CSSProperties = {
	...genericSectionStyle,
	width: "100%",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const headerContentStyle: React.CSSProperties = {
	...genericSectionStyle,

	width: "70%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	boxSizing: "border-box",
};

export const lowerContainerStyle = (
	borderColour: string
): React.CSSProperties => ({
	...genericSectionStyle,
	flexGrow: 1,
	marginTop: "1%",

	display: "flex",
	borderTop: `4px solid ${borderColour}`,
});
export const lowerHalfWrapperStyle: React.CSSProperties = {
	...genericSectionStyle,

	paddingTop: "2%",

	flexGrow: 1,
	display: "flex",
};

export const leftBodyColumnStyle: React.CSSProperties = {
	...genericSectionStyle,
	display: "flex",
	flexDirection: "column",
	width: `${100 / 3}%`,
};

export const titleContainerStyle: React.CSSProperties = {
	...genericSectionStyle,
	width: "50%",

	marginBottom: "2%",
	display: "flex",
	alignItems: "center",
};

export const titleTextStyle: React.CSSProperties = {
	textAlign: "left",
	margin: 0,
};

export const textBodyContainerStyle: React.CSSProperties = {
	...genericSectionStyle,
	height: "100%",
	marginBottom: "1%",
	display: "flex",
	alignItems: "flex-start",
	fontSize: "2rem",
	textAlign: "left",
};

export const textBodyContentStyle: React.CSSProperties = {
	textAlign: "left",

	margin: 0,
};

export const rightBodyColumnStyle: React.CSSProperties = {
	...genericSectionStyle,
	height: "inherit",

	flexGrow: 1,
	display: "flex",
	width: "100%",
	alignContent: "center",

	justifyContent: "center",
	alignItems: "center",
};

export const rightBodyGridStyle: React.CSSProperties = {
	...genericSectionStyle,

	width: "100%",
	display: "grid",
	alignItems: "center",
	alignContent: "center",

	textAlign: "center",
};

export const gridItemStyle: React.CSSProperties = {
	...genericSectionStyle,
	// display: "flex",
	height: "100%",
	width: "100%",

	justifyContent: "center",
	alignContent: "center",

	alignItems: "center",
};

import { titleHeadingStyle } from "../CallingCard.styles";
import { Hexagon } from "../../hexagons/Hexagons";
import { LargePB } from "../../../pages/homepage/parts/smallPartnershipBar";

export class NewCallingCard extends React.Component<INewCallingCardProps> {
	render() {
		const {
			components,
			index = 0,
			header,
			title,
			footer,
			fullSpread = false,
			styleOverrides = {},
		} = this.props;

		let theme = Theme(index);

		let gridTemplate = "";
		if (Array.isArray(components)) {
			gridTemplate = `repeat(${components.length}, 1fr)`;
		}
		let RhGridStyle = rightBodyGridStyle;
		RhGridStyle.gridTemplateColumns = gridTemplate;
		let titleStyle = {
			...titleTextStyle,
			...titleHeadingStyle(theme.primaryColor),
		};

		const borderColor = theme.tertiaryColor;

		return (
			<div style={containerStyle}>
				{header ? (
					<div style={headerContainerStyle}>
						<div style={headerContentStyle}>
							{formatComponent(header)}
						</div>
					</div>
				) : null}

				<div style={lowerContainerStyle(borderColor)}>
					{footer || title ? (
						<div style={leftBodyColumnStyle}>
							{title ? (
								<div style={titleContainerStyle}>
									<div style={titleStyle}>
										{formatComponent(title)}
									</div>
								</div>
							) : null}

							{footer ? (
								<div style={textBodyContainerStyle}>
									{formatComponent(footer)}
								</div>
							) : null}
						</div>
					) : null}

					<div style={rightBodyColumnStyle}>
						<div style={RhGridStyle}>
							{components.map((item, _index) => (
								<div
									style={gridItemStyle}
									key={_index}
								>
									{/* <div style={{ height: "50px" }}></div> */}
									{/* <div>{formatComponent(item, true)}</div> */}
									{formatComponent(item, true)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const comps = [<Hexagon />, <Hexagon />, <Hexagon />];
const head = <h2>About Us</h2>;
// const comps = [head, head, head]; // This works

const foot = (
	<p>
		At AI Compatible, we believe not everyone needs to be an AI expert but
		everyone should be AI compatible. That means being alert to the
		opportunities and the risks: we help businesses navigate both, with
		tailored sessions giving you the right tools, skills, and literacy. We
		strive for a world where AI goes right, and people are ready for it.
	</p>
);
export const DemoNewCC: React.FC = () => (
	<NewCallingCard
		components={comps}
		header={LargePB}
		title={head}
		footer={foot}
	/>
);
