// src/components/callingcard/CallingCard.tsx

import React from "react";
import { formatComponent, ValidComponent } from "../../utils/reactUtils";
import { borderGrad, Theme } from "../../styles";
import {
	ICallingCardProps,
	ICallOutProps,
	IFooterProps,
	IGridBodyProps,
	IGridItemProps,
	IHeaderProps,
} from "./CallingCard.types";
import {
	containerStyle,
	GridBodyStyle,
	GridItemStyle,
} from "./CallingCard.styles";

export const CompWrapper: React.FC<ICallOutProps> = ({
	content,
	wrapper_style = {},
}) => {
	return content ? (
		<div style={wrapper_style}>{formatComponent(content)}</div>
	) : null;
};
export const Header: React.FC<IHeaderProps> = (props) => (
	<CompWrapper {...props} />
);
export const Footer: React.FC<IFooterProps> = ({ content }) => {
	return content ? formatComponent(content) : null;
};

export const GridItem: React.FC<IGridItemProps> = ({ content, item_key }) =>
	content ? (
		<CompWrapper
			content={content}
			wrapper_style={GridItemStyle}
			key={item_key}
		/>
	) : (
		<div
			style={GridItemStyle}
			key={item_key}
		/>
	);

export const GridBody: React.FC<IGridBodyProps> = ({
	components,
	styleOverrides = {},
	columnOverrides = undefined,
}) => {
	const colOverrides = {
		gridTemplateColumns:
			columnOverrides ?? `repeat(${components.length}, 1fr)`,
	};

	return (
		<div style={{ ...GridBodyStyle, ...colOverrides, ...styleOverrides }}>
			{components.map((item, index) => (
				<GridItem
					content={item}
					item_key={index}
				/>
			))}
		</div>
	);
};

export const CallingCard: React.FC<ICallingCardProps> = ({
	components,
	index = 0,
	header,
	footer,
	fullSpread = false,
	styleOverrides = {},
	isPageElement = false,
}) => {
	let theme = Theme(index);
	const columnOverrides = isPageElement
		? `${100 / 3}% ${200 / 3}%`
		: undefined;

	const bodyOverrides = isPageElement
		? {
				marginTop: "1%",
				paddingTop: "2%",
				borderTop: header ? `4px solid` : "",
		  }
		: {
				padding: !fullSpread ? "2%" : "0",
				borderRadius: !fullSpread ? "50px 10px" : "",
		  };

	return (
		<>
			<div
				style={{
					...containerStyle,
					color: theme.secondaryColor,
					backgroundColor: theme.backgroundColor,
					padding: !fullSpread ? "2%" : "0",
					borderTopLeftRadius: isPageElement ? "80px 60px" : "",

					...styleOverrides,
				}}
			>
				<Header
					content={header}
					wrapper_style={{ color: theme.primaryColor }}
				/>

				<GridBody
					components={components}
					columnOverrides={columnOverrides}
					styleOverrides={bodyOverrides}
				/>
			</div>
			<Footer content={footer} />
		</>
	);
};

export const NewCallingCard: React.FC<
	ICallingCardProps & { sideBar?: ICallingCardProps }
> = (props) => {
	const { components, isPageElement = true, sideBar } = props;

	return (
		<CallingCard
			{...props}
			components={
				sideBar
					? [
							<CallingCard
								{...sideBar}
								index={props.index}
							/>,
							<GridBody components={components} />,
					  ]
					: components
			}
			isPageElement={isPageElement}
		/>
	);
};
