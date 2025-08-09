import React from "react";
import globalstyles from "../../GlobalStyles.module.css";
import styles from "./CallingCard.module.css";
import logo from "/src/assets/logo.svg";
import { LogoBox, ILogoBoxProps } from "./LogoBox";

export interface ICallingCardProps {
	components: React.ReactElement[];
	index?: number;
	// header?:React.ReactElement;
}

export class CallingCard extends React.Component<ICallingCardProps> {
	render() {
		const { components, index = 0 } = this.props;

		let gridTemplate = `repeat(${components.length}, 1fr)`;
		const cardStyle: React.CSSProperties = {};

		if (components.length === 2 && components[1].type === LogoBox) {
			const props = components[1].props as ILogoBoxProps;

			const logoScale = props.scale || 0.3;
			const textScale = 1 - logoScale;

			gridTemplate = `minmax(0, ${textScale * 100}%) 1fr`;
		}

		// Apply styles
		cardStyle.gridTemplateColumns = gridTemplate;
		if (index % 2 === 1) {
			cardStyle.backgroundColor = "rgb(228, 241, 233)";
		}
		let c = [components[0], components[0]];
		return (
			<section className={styles.callingCard} style={cardStyle}>
				{components.map((item, _index) => (
					<div key={_index}>{item}</div>
				))}
			</section>
		);
	}
}
