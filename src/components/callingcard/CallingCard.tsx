// src/components/callingcard/CallingCard.tsx

import React from "react";
import { Theme } from "../../styles";
import { formatComponent } from "../../utils/reactUtils";
import {
	containerStyle,
	GridBodyStyle,
	GridItemStyle,
} from "./CallingCard.styles";
import {
	ICallingCardProps,
	ICallOutProps,
	IFooterProps,
	IGridBodyProps,
	IGridItemProps,
	IHeaderProps,
} from "./CallingCard.types";

const CompWrapper: React.FC<ICallOutProps> = ({
	content,
	wrapper_style = {},
}) => {
	return content ? (
		<div style={wrapper_style}>{formatComponent(content)}</div>
	) : null;
};
const Header: React.FC<IHeaderProps> = (props) => <CompWrapper {...props} />;
const Footer: React.FC<IFooterProps> = ({ content }) =>
	content && formatComponent(content);

const GridItem = ({ content, item_key }: IGridItemProps): React.ReactNode => {
	return content ? (
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
};
const GridBody: React.FC<IGridBodyProps> = ({
	components,
	styleOverrides = {},
	columnOverrides = undefined,
}) => (
	<div
		style={{
			...GridBodyStyle,
			...{
				gridTemplateColumns:
					columnOverrides ?? `repeat(${components.length}, 1fr)`,
			},
			...styleOverrides,
		}}
	>
		{components.map((item, index) =>
			GridItem({ content: item, item_key: index })
		)}
	</div>
);

const CallingCard: React.FC<ICallingCardProps> = ({
	components,
	index = 0,
	header,
	footer,
	fullSpread = false,
	styleOverrides = {},
	isPageElement = false,
}) => {
	let theme = Theme(index);

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
					columnOverrides={
						isPageElement ? `${100 / 3}% ${200 / 3}%` : undefined
					}
					styleOverrides={
						isPageElement
							? {
									marginTop: "1%",
									paddingTop: "2%",
									borderTop: header ? `4px solid` : "",
							  }
							: {
									padding: !fullSpread ? "2%" : "0",
									borderRadius: !fullSpread
										? "50px 10px"
										: "",
							  }
					}
				/>
			</div>
			<Footer content={footer} />
		</>
	);
};

const SideBarCallingCard: React.FC<
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

export { CallingCard, SideBarCallingCard };
