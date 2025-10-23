// src/pages/the-journey-page/TheJourney.tsx

import React, { useEffect, useState } from "react";
import { Hexagon } from "../../components/hexagons/Hexagons";
import { ImageHexagon } from "../../components/hexagons/ImageHexagon";
import { HexagonGrid } from "../../components/hexagons/hexagon-row/HexagonRow";
import { Page } from "../../features/page/Page";

import bw1 from "../../assets/bw1.jpg";
import bw2 from "../../assets/bw2.jpg";
import bw3 from "../../assets/bw3.jpg";
import {
	bulb,
	bullseye,
	pencil,
	vline,
	vline2,
} from "../../components/callingcard/graphics";
import {
	generateGradient,
	volume_constant_size,
	volume_constant_size_prime,
} from "../../styles";
import {
	bgwhite,
	dark_midnight_green,
	midnight_green,
} from "../../utils/defaultColours";
import { BoxedImage } from "../../utils/reactUtils";
import { K } from "../../components/hexagons/hexagon-row/HexagonRow.styles";

const TimelineData = [
	{
		date: "NOV 2022",
		content:
			"ChatGPT 3.5 is released - The 'ChatGPT' moment. Prompt Engineering goes mainstream ",
		image: bw3,
	},
	{
		date: "MAR 2023",
		content: "ChatGPT 4 is released",
	},
	{
		date: "DEC 2023",
		content:
			"AI Compatible  (AIC) is founded and collates 2023s discoveries in prompt engineering into a methodology, to help people use AI effectively and ethically",
		icon: bulb,
	},
	{
		date: "JAN 2024",
		content:
			"AIC runs its first series of prompt engineering training workshops with live clients, using the new methodology. Initially delivered through AIC first partner, The Growth House who offer leadership and teamship corporate training",
		icon: bullseye,
	},
	{
		date: "MARCH 2024",
		content:
			"The EU AI act is passed - there's questions around how suitable it is for generative AI. Joe Fennell co-led the 'SafeNet' project for improving online safety and AI literacy among young people in the Balkans, founded by the UNMIK",
	},
	{
		date: "JUL 2024",
		content:
			"NotebookLM is released, everyone loves it, go try it now if you haven't",
		image: bw1,
	},
	{
		date: "SEP 2024",
		content:
			"Open AI's release of o1 'strawberry', first of the 'reasoning model' generation of generative AI.",
	},
	{
		date: "OCT 2024",
		content:
			"O3 gets 85% accuracy on the ARC 1 benchmark - this is the going to the moon moment for Foundation models, ARC 1 was THE benchmark to beat. The AI Compatible team grows alongside our roster of partners",
	},
	{
		date: "JAN 2025",
		content:
			" Deepseek R1 matches Open AI's o1 Benchmark performance. Working closely with Heward Mills data protection officers we became an advisor and partner. We add Policy assistance and consultancy to the services we offer.",
		icon: pencil,
		image: bw2,
	},
	{
		date: "APRIL 2025",
		content:
			"Open AI O3 high gets 20% on 'Humanity's Last Exam', a compilation of problems that specialised human experts find particularly hard",
	},
];

const getThirdHex = (index: number) => {
	let thirdHexagon = (
		<Hexagon
			args={{
				colour: "transparent",
			}}
		/>
	);

	const _icon = TimelineData[index + 1]?.icon;
	const _image = TimelineData[index]?.image;
	if (_icon) {
		thirdHexagon = (
			<Hexagon
				args={{
					colour: "transparent",
				}}
				opacity={1}
				element={
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							margin: "auto",
							height: "100%",
							opacity: 1,
						}}
					>
						<BoxedImage
							image={_icon}
							width="90%"
							aspectRatio="1"
							imageStyling={{ margin: "auto" }}
						/>
					</div>
				}
			/>
		);
	} else if (_image) {
		thirdHexagon = <ImageHexagon img={_image} />;
	}
	return thirdHexagon;
};
const sf = `${volume_constant_size_prime}`;
const RowHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<h3
		style={{
			// fontSize: "3vw",
			fontSize: `calc(3*${sf})`,
			// height: "calc(100%)",
			textAlign: "center",

			color: dark_midnight_green,
		}}
	>
		{children}
	</h3>
);

const RowContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<p
		style={{
			// fontSize: "2.5vw",
			// fontSize: "max(1.8vw,calc(0.8rem*calc(1vw/1vh)))",
			fontSize: `calc(1.8*${sf})`,
			wordBreak: "break-word",
			// marginTop: "1px",
			textAlign: "center",
			whiteSpace: "collapse",
			color: midnight_green,
			// height: "calc(100%)",
		}}
	>
		{children}
	</p>
);

const getRows = (isNarrow = false) => {
	const colours = generateGradient(TimelineData.length).reverse();

	return TimelineData.map((item, i) => {
		let baseRowElements = [
			<Hexagon
				args={{ colour: bgwhite }}
				element={
					isNarrow
						? [<RowContent>{item.date}</RowContent>]
						: [
								<RowHeader>{item.date}</RowHeader>,
								<RowContent>{item.content}</RowContent>,
						  ]
				}
				opacity={1}
				// useVerticalAlignment={!isNarrow}
				useVerticalAlignment={true}
			/>,

			isNarrow ? (
				<Hexagon
					args={{
						colour: "white",
					}}
					opacity={1}
					element={
						<div
							style={{
								...(!isNarrow
									? {
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											margin: "auto",
											height: "100%",
									  }
									: {
											display: "flex",
											flexDirection: "row",
											// flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											margin: "auto",
											marginTop: "-25%",
											marginBottom: "-25%",

											height: "150%",
									  }),
								opacity: 1,
							}}
							className="aos-ignore"
						>
							<BoxedImage
								image={vline2(colours[i - 1])}
								// image={vline}

								width="200%"
								aspectRatio={`1`}
								imageStyling={{}}
							/>
						</div>
					}
				/>
			) : (
				<Hexagon args={{ colour: colours[i] }} />
			),
			isNarrow ? (
				<Hexagon
					args={{ colour: bgwhite }}
					element={[<RowContent>{item.content}</RowContent>]}
					opacity={1}
					useVerticalAlignment={!isNarrow}
					// useVerticalAlignment={true}
				/>
			) : (
				getThirdHex(i)
			),
		];
		baseRowElements = isNarrow
			? [baseRowElements[0], baseRowElements[2]]
			: baseRowElements;
		console.log(isNarrow);
		baseRowElements =
			i % 2 === 0 || isNarrow
				? baseRowElements
				: baseRowElements.reverse();

		return {
			elements: baseRowElements,
		};
	});
};
const theJourneyPage: React.FC = () => {
	const LAYOUT_BREAKPOINT = 1200;

	const [isNarrow, setIsNarrow] = useState(false);

	const updateLayout = () => {
		const shouldBeNarrow = window.innerWidth < LAYOUT_BREAKPOINT;
		if (shouldBeNarrow !== isNarrow) {
			setIsNarrow(shouldBeNarrow);
		}
	};

	useEffect(() => {
		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => {
			window.removeEventListener("resize", updateLayout);
		};
	}, [isNarrow]);
	const relative_spacing = isNarrow ? 1 : 10;
	const absolute_spacing = 0;

	// const k = K({ relative_spacing, absolute_spacing });
	console.log((relative_spacing * Math.sqrt(3)) / 2);
	return (
		<div
			style={
				{
					// marginLeft: `-${(relative_spacing * Math.sqrt(3)) / 2}%`,
					// marginRight: `-${(relative_spacing * Math.sqrt(3)) / 2}%`,
				}
			}
		>
			<div
				style={{
					height: "100%",
					width: "100%",
					backdropFilter: "blur(8px)",
					position: "absolute",
					overflow: "visible",
					maskImage:
						"linear-gradient(to bottom,black 95%, transparent 100%)",
				}}
			/>
			<HexagonGrid
				rows={getRows(isNarrow) as any}
				relative_spacing={relative_spacing}
				absolute_spacing={absolute_spacing}
				upper_first={isNarrow}
				containerStyle={
					{
						// overflow: "clip",
					}
				}
				class_name="aos-ignore"
			/>
		</div>
	);
};

// const TheJourneyPage = (
// 	<Page
// 		page={theJourneyPage}
// 		bg={true}
// 	/>
// );
const TheJourneyPage = () => (
	<Page
		page={theJourneyPage}
		bg={true}
	/>
);

// export { TheJourneyPage };

export default TheJourneyPage;
