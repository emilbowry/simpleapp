// src/components/callingcard/CallingCard.tsx

import React from "react";
import { formatComponent } from "../../utils/reactUtils";
import { Theme } from "../../styles";

import {
	cardStyle,
	innerStyle,
	titleHeadingStyle,
	style_CallingCardStyle,
	itemStyle,
} from "./CallingCard.styles";
import { ICallingCardProps } from "./CallingCard.types";

export class CallingCard extends React.Component<ICallingCardProps> {
	render() {
		const {
			components,
			index = 0,
			title,
			footer,
			fullSpread = false,
		} = this.props;

		let gridTemplate = "";
		if (Array.isArray(components)) {
			gridTemplate = `repeat(${components.length}, 1fr)`;
		}

		let theme = Theme(index);
		let _cardStyle = cardStyle(theme.secondaryColor);
		_cardStyle.gridTemplateColumns = gridTemplate;
		let _innerstyle = innerStyle(fullSpread);
		let _titleHeadingStyle = titleHeadingStyle(theme.primaryColor);

		_innerstyle.backgroundColor = theme.backgroundColor;

		return (
			<div style={style_CallingCardStyle(fullSpread)}>
				<div style={_innerstyle}>
					{title ? (
						<div>
							<h2
								style={{
									..._titleHeadingStyle,
									margin: "10px",
								}}
							>
								{formatComponent(title)}
							</h2>
						</div>
					) : null}
					<div style={_cardStyle}>
						{components.map((item, _index) => (
							<div
								style={itemStyle}
								key={_index}
							>
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
