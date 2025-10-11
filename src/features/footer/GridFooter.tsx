import React from "react";
import { ValidComponent, formatComponent } from "../../utils/reactUtils";

const GridFooter: React.FC<{
	n_rows?: number;
	children?: React.ReactNode;
}> = ({ n_rows = 3, children }) => {
	return (
		<div>
			<div
				style={{
					// ...genericSectionStyle,
					width: "100vw",
					height: "70vh",
					margin: "0 auto",
					minWidth: 0,
					color: "white",
					display: "grid",
					gridTemplateRows: `repeat(${n_rows}, ${70 / n_rows}vh)`,
				}}
			>
				{children}
			</div>
		</div>
	);
};
const GridFooterRows: React.FC<{
	colratio?: number[];
	children: ValidComponent[];
}> = ({ colratio = [1], children }) => {
	const sum = colratio.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0
	);
	const fracs = colratio.map((number) => (100 * number) / sum);
	const percentageString = fracs.map((number) => number + "%").join(" ");
	console.log(percentageString);
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: percentageString,
			}}
		>
			{children.map((item, _index) => (
				<React.Fragment key={_index}>
					{item ? formatComponent(item) : <div />}
				</React.Fragment>
			))}
		</div>
	);
};
export { GridFooter, GridFooterRows };
