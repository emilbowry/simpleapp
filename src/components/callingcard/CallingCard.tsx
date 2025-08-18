// src/components/callingcard/CallingCard.tsx

import React from "react";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";
import { title_font_colour } from "../../utils/defaultColours";
import { Theme } from "../../styles";

export interface ICallingCardProps {
	components: ValidComponent[];
	title?: ValidComponent;
	footer?: ValidComponent;
	fullSpread?: boolean;
	index?: number;
}

export class CallingCard extends React.Component<ICallingCardProps> {
	render() {
		const {
			components,
			index = 0,
			title,
			footer,
			fullSpread = false,
		} = this.props;
		const _style_CallingCardStyle: React.CSSProperties = {
			padding: !fullSpread ? "20px" : "", //Works DO NOT TOUCH
			// paddingTop: "40px",
			alignItems: "center",
		};

		let gridTemplate = "";
		if (Array.isArray(components)) {
			gridTemplate = `repeat(${components.length}, 1fr)`;
		}

		let theme = Theme(index);

		const cardStyle: React.CSSProperties = {
			color: theme.secondaryColor,
			display: "grid",
			justifyContent: "space-evenly",
			// gap: "10px",
		};
		cardStyle.gridTemplateColumns = gridTemplate;

		const innerStyle: React.CSSProperties = {
			fontSize: "2rem",

			paddingTop: "10px",
			borderRadius: !fullSpread ? "50px 10px" : "",
		};
		innerStyle.backgroundColor = theme.backgroundColor;

		const itemStyle: React.CSSProperties = {
			minWidth: 0,
			margin: "20px",
		};
		const titleHeadingStyle: React.CSSProperties = {
			fontSize: "4rem",
			color: theme.primaryColor,
		};

		return (
			<div style={_style_CallingCardStyle}>
				<div style={innerStyle}>
					{title ? (
						<div>
							<h2
								style={{ ...titleHeadingStyle, margin: "10px" }}
							>
								{formatComponent(title)}
							</h2>
						</div>
					) : null}
					<div style={cardStyle}>
						{components.map((item, _index) => (
							<div style={itemStyle} key={_index}>
								{formatComponent(item)}
							</div>
						))}
					</div>

					{footer ? <div>{formatComponent(footer)}</div> : null}
				</div>
			</div>
		);
	}
}
