// src/features/footer/Footer.tsx

import React from "react";
import { BoxedImage } from "../../utils/reactUtils";
import logo from "../../assets/logo.png";
import { PartnershipMarquee } from "../../components/partnership-bar/PartnershipMarquee";
import { partners } from "../../components/partnership-bar/Partner";
import { linkedin_svg } from "../../components/callingcard/graphics";
import { ScrollVisibilityDependent } from "./ScrollVisibilityDependent";
import { centerable } from "./Footer.styles";
import { GridFooter, GridFooterRows } from "./GridFooter";
import { FooterLayoutHandler } from "./FooterLayoutHandler";

const Quote1 = (
	<div>
		<div style={{ fontStyle: "italic" }}>
			<h2>
				"The future has already arrived. It's just not evenly
				distributed yet."
			</h2>
		</div>
		<div> - William Gibson</div>
	</div>
);
const Quote2 = (
	<div>
		<div style={{ fontStyle: "italic" }}>
			<h2>
				"That fear of AI has gone, which is what we wanted, so it’s done
				exactly what we needed it to do. The overall feedback from the
				teams is 'Phenomenal'"
			</h2>
		</div>
		<div>
			<h3>- Olivia Hatton, VodafoneThree</h3>
		</div>
	</div>
);

const FooterLayout: React.FC = () => {
	const n = 3;
	const row1 = [
		null,
		<ScrollVisibilityDependent
			element={Quote1}
			styling={{ ...centerable, alignItems: "center" }}
			borders={[1, 2 / 3]}
		/>,
		null,
	];

	const row2 = [null, <FooterPartershipBar />, null];

	const row3 = [<FooterBottomLeftSideBar />, <FooterBottomRightSideBar />];
	return (
		<GridFooter n_rows={n}>
			<GridFooterRows
				colratio={[1, 2, 1]}
				children={row1}
			/>
			<GridFooterRows
				colratio={[1, 8, 1]}
				children={row2}
			/>
			<GridFooterRows
				colratio={[1, 2, 1]}
				children={row3}
			/>
		</GridFooter>
	);
};

const FooterBottomLeftSideBar: React.FC = () => (
	<div
		style={{
			display: "grid",
			gridTemplateRows: "25% 25% 25% 25%",
			height: "100%",
			margin: "0 auto",
		}}
	>
		<ScrollVisibilityDependent
			element={linkedin_svg}
			styling={{
				display: "flex",
				justifyContent: "left",
				marginLeft: 0,
			}}
			borders={[1 / 3, 0.75 * (1 / 3)]}
		/>
		<ScrollVisibilityDependent
			element={<h2>Joe Fennel</h2>}
			styling={centerable}
			borders={[0.75 * (1 / 3), 0.5 * (1 / 3)]}
		/>
		<ScrollVisibilityDependent
			element={<h2>Inquiries</h2>}
			styling={{ ...centerable }}
			borders={[0.5 * (1 / 3), 0.25 * (1 / 3)]}
		/>

		<ScrollVisibilityDependent
			element={<h2>www.aicompatible.com</h2>}
			styling={centerable}
			borders={[0.25 * (1 / 3), 0]}
		/>
	</div>
);

const FooterBottomRightSideBar: React.FC = () => (
	<>
		<ScrollVisibilityDependent
			element={Quote2}
			styling={{
				...centerable,

				justifyContent: "center",

				maxHeight: "50%",
			}}
			borders={[0.8 * (1 / 3), 0.2 * (1 / 3)]}
		/>
		,
		<div
			style={{
				...centerable,

				height: "100%",
				minWidth: 0,
				minHeight: 0,
			}}
		>
			<ScrollVisibilityDependent
				element={
					<BoxedImage
						image={logo}
						aspectRatio={`${Math.sqrt(3) / 2}`}
						width={"50%"}
					/>
				}
				styling={centerable}
				percentage={0.5 * (1 / 3)}
				borders={[1 / 3, 0]}
			/>
		</div>
	</>
);

const FooterPartershipBar: React.FC = () => (
	<ScrollVisibilityDependent
		element={
			<PartnershipMarquee
				{...partners}
				index={-1}
			/>
		}
		styling={{
			position: "relative",
			minWidth: 0,
			isolation: "isolate",

			minHeight: 0,
			width: "125%" /* correction factor   */,
			marginLeft: "-12.5%" /* correction factor */,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		}}
		borders={[18 / 30, 12 / 30]}
	/>
);
const Footer: React.FC = () => <FooterLayoutHandler component={FooterLayout} />;

export { Footer };
