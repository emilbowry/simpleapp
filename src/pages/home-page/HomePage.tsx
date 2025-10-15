import React, { useId } from "react";
import { Page } from "../../features/page/Page";
// import { K } from "../../components/hexagons/hexagon-row/HexagonRow.styles";
import { styleObjectToString } from "../../styles";
import {
	TElementTag,
	TIDSelector,
	TValidStyle,
} from "../../utils/styles.types";

const TestStyle: React.FC = () => {
	const id = useId();

	const testStyle: TValidStyle<TElementTag | TIDSelector> = {
		h1: { fontSize: "4rem", [`&#${id}`]: { color: "red" } },
	};

	return (
		<>
			<style precedence={"medium"}>
				{styleObjectToString<TElementTag | TIDSelector>(testStyle)}
			</style>
			<div style={{ backgroundColor: "white" }}>
				<p>
					{styleObjectToString<TElementTag | TIDSelector>(testStyle)}
				</p>
				<h1 id={id}>bye</h1>
			</div>
		</>
	);
};
const homePage: React.FC = () => {
	return (
		<div style={{ display: "grid", gridTemplateColumns: "100%" }}>
			<TestStyle />
			{/* <Hero />
			<OurTeam />
			<AboutUsCallingCard />
			<ImpactCC /> */}
		</div>
	);
};

export const HomePage = (
	<Page
		page={homePage}
		bg={true}
	/>
);
