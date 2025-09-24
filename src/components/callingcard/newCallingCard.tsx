// src/components/callingcard/callout/newCallingCard.tsx

import React from "react";
import { formatComponent } from "../../utils/reactUtils";
import { Theme } from "../../styles";

/**
	@improvement - Abstract into baseclass CallingCard, directly integrate VHex footer logic additionally,
	- Smarter zIndex logic

	Perhaps something like the below

 */

// export class _CallingCard extends React.Component<I_NewCallingCardProps> {
// 	theme: any;
// 	generateContainer() {
// 		const { styleOverrides = {} } = this.props;

// 		let ContainerStyle = {
// 			...containerStyle,
// 			backgroundColor: this.theme.backgroundColor,
// 			...styleOverrides,
// 		};
// 		return <div style={ContainerStyle}>{this.generateContent()}</div>;
// 	}
// 	generateContent() {
// 		const {
// 			components,
// 			index = 0,
// 			header,
// 			body,
// 			fullSpread = false,
// 			styleOverrides = {},
// 		} = this.props;
// 		const borderColor = header ? this.theme.tertiaryColor : undefined;

// 		return (
// 			<>
// 				{header ? (
// 					<div style={headerContainerStyle}>
// 						<div style={headerContentStyle}>
// 							{formatComponent(header)}
// 						</div>
// 					</div>
// 				) : null}

// 				<div style={lowerContainerStyle(borderColor)}>
// 					{formatComponent(body, true)}
// 				</div>
// 			</>
// 		);
// 	}
// 	constructor(props: I_NewCallingCardProps) {
// 		super(props);
// 		this.theme = props.index ? Theme(props.index) : {};
// 	}
// 	render() {
// 		return this.generateContainer();
// 	}
// }

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
			...styleOverrides,
		};

		const borderColor = header ? theme.tertiaryColor : undefined;

		return (
			<div
				style={ContainerStyle}
				// className="aos-ignore"
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
								<div style={titleContainerStyle}>
									<div
										style={titleHeadingStyle(
											theme.primaryColor
										)}
									>
										{formatComponent(title)}
									</div>
								</div>
							) : null}

							{footer ? (
								<div
									style={{
										...textBodyContainerStyle,
										color: theme.secondaryColor,
									}}
								>
									{formatComponent(footer)}
								</div>
							) : null}
						</div>
					) : null}

					<div style={rightBodyColumnStyle}>
						<div style={RhGridStyle}>
							{components.map((item, _index) => (
								<div
									style={{
										...gridItemStyle,
										color: theme.secondaryColor,
									}}
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
