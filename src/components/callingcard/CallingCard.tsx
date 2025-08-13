import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import logo from "/src/assets/logo.svg";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";
import { title_font_colour } from "../../utils/defaultColours";
export interface ICallingCardProps {
	components: ValidComponent[];
	title?: ValidComponent;
	footer?: ValidComponent;

	index?: number;
}

const titleHeadingStyle: React.CSSProperties = {
	fontSize: "4rem",
	color: title_font_colour,
};
const _style_CallingCardStyle: React.CSSProperties = {
	display: "grid",
	alignItems: "center",
	padding: "5rem 5rem",

	width: "100%",
};
export const style_CallingCardStyle = `${_style_CallingCardStyle}`;

export class CallingCard extends React.Component<ICallingCardProps> {
	render() {
		const { components, index = 0, title, footer } = this.props;
		let gridTemplate = `repeat(1, 1fr)`;
		if (Array.isArray(components)) {
			gridTemplate = `repeat(${components.length}, 1fr)`;
		}
		const innerStyle: React.CSSProperties = {
			margin: "1rem",
			padding: "1rem",
		};

		const cardStyle: React.CSSProperties = {
			justifyContent: "space-between",
			display: "grid",
		};

		cardStyle.gridTemplateColumns = gridTemplate;
		if (index === -1) {
			innerStyle.backgroundColor = "transparent";
		} else if (index % 2 === 1) {
			// innerStyle.backgroundColor = "transparent";
			// cardStyle.backgroundColor = "rgb(228, 241, 233)";

			innerStyle.backgroundColor = "rgb(228, 241, 233)";
		} else {
			// cardStyle.backgroundColor = "rgb(255, 255, 255)";
			innerStyle.backgroundColor = "rgb(255, 255, 255)";
		}

		return (
			<section className={style_CallingCardStyle}>
				<div style={innerStyle}>
					{title ? (
						<div>
							<h2 style={titleHeadingStyle}>
								{formatComponent(title)}
							</h2>
						</div>
					) : null}
					<div style={cardStyle}>
						{components.map((item, _index) => (
							<div key={_index}>{formatComponent(item)}</div>
						))}
					</div>

					{footer ? <div>{formatComponent(footer)}</div> : null}
				</div>

				{/* <div style={cardStyle}>
					{components.map((item, _index) => (
						<div key={_index}>{formatComponent(item)}</div>
					))}
				</div> */}
			</section>
		);
	}
}
