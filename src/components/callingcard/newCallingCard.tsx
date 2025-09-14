// src/components/callingcard/callout/newCallingCard.tsx

import React from "react";
import { formatComponent } from "../../utils/reactUtils";
import { Theme } from "../../styles";
// import { titleHeadingStyle } from "./CallingCard.styles";
import {
	rightBodyGridStyle,
	titleHeadingStyle,
	containerStyle,
	headerContainerStyle,
	headerContentStyle,
	lowerContainerStyle,
	leftBodyColumnStyle,
	titleContainerStyle,
	textBodyContainerStyle,
	rightBodyColumnStyle,
	gridItemStyle,
} from "./newCallingCard.styles";
import { INewCallingCardProps } from "./newCallingCard.types";
// My css.d.ts file

// function objToString(styleObj: any, parser?: import('./createParser').Parser): string;
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

		let RhGridStyle = {
			...rightBodyGridStyle,
			gridTemplateColumns: gridTemplate,
		};

		let ContainerStyle = {
			...containerStyle,
			backgroundColor: theme.backgroundColor,
		};

		const borderColor = header ? theme.tertiaryColor : undefined;

		return (
			<div
				style={ContainerStyle}
				className="aos-ignore"
			>
				{header ? (
					<div style={headerContainerStyle}>
						<div
							style={headerContentStyle}

							// className={pseudos}
						>
							{formatComponent(header)}
						</div>
					</div>
				) : null}

				<div style={lowerContainerStyle(borderColor)}>
					{footer || title ? (
						<div style={leftBodyColumnStyle}>
							{title ? (
								<div
									style={titleContainerStyle}
									// className={s}
								>
									<div
										style={titleHeadingStyle(
											theme.primaryColor
										)}
										// style={s}
									>
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
