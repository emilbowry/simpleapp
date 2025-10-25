// src/pages/home-page/parts/key-partners/KeyPartners.tsx

import React from "react";

import gh from "../../../../assets/growthhouselogo.png";
import hm from "../../../../assets/HewardMills.png";
import ms from "../../../../assets/ms.png";

import { CallingCard } from "../../../../components/callingcard/CallingCard";
import { SideBarFullOverlapStyle } from "../../../../components/callingcard/CallingCard.styles";
import { linkStyle, volume_constant_size } from "../../../../styles";
import { bgwhite } from "../../../../utils/defaultColours";
import { BoxedImage } from "../../../../utils/reactUtils";

const f1 = (
	<div
		style={{
			maxWidth: "30vw",
			fontSize: `calc(2*${volume_constant_size})`,
		}}
	>
		<BoxedImage
			image={gh}
			aspectRatio="1"
			width="100%"
		/>
		<div>
			<a
				href="https://thegrowthhouse.com/ai-programme/"
				style={{ ...linkStyle(true), color: "inherit" }}
			>
				<h2>The Growth House</h2>
			</a>
		</div>
		<p>
			The Growth House partners with AI Compatible to deliver prompt
			engineering training to some of the world’s biggest businesses,
			including Vodafone, Astra Zeneca, and Accenture Song. <br />
			<br />
			Click here to see reviews of the TGH AI program.
		</p>
	</div>
);

const f2 = (
	<div
		style={{
			maxWidth: "30vw",
			fontSize: `calc(2*${volume_constant_size})`,
		}}
	>
		<BoxedImage
			image={ms}
			aspectRatio="1"
			width="100%"
		/>
		<div>
			<a
				href="https://community.mindstone.com/events"
				style={{ ...linkStyle(true), color: "inherit" }}
			>
				<h2>Mindstone</h2>
			</a>
		</div>
		<p>
			Mindstone is the largest Practical AI Community for non-technical
			people in the world, with over 25,000 active members. Joe hosts
			their online meetups, co- organises their Cambridge Meetups,
			frequents the london events
		</p>
	</div>
);

const f3 = (
	<div
		style={{
			maxWidth: "30vw",
			fontSize: `calc(2*${volume_constant_size})`,
		}}
	>
		<BoxedImage
			image={hm}
			aspectRatio="1"
			width="100%"
		/>

		<div>
			<a
				href="https://www.hewardmills.com"
				style={{ ...linkStyle(true), color: "inherit" }}
			>
				<h2>Heward Mills</h2>
			</a>
		</div>
		<p>
			Data Protection Officers find themselves on the frontline of
			navigating AI adoption. The first question every org asks when
			adopting an AI tool is, ‘Can I trust it with sensitive information?’
			AI Compatible works with Heward Mills to help businesses navigate
			the challenges of data protection.
		</p>
	</div>
);

const KeyPartnersCallingCard: React.FC = () => {
	// const scale_adj = useBrowserScale();
	return (
		<>
			{/* <div style={BackgroundFade} /> */}

			<CallingCard
				components={[f1, f2, f3]}
				header={<h1>Key Partners</h1>}
				styleOverrides={{
					backgroundColor: bgwhite,
					...SideBarFullOverlapStyle,
					zIndex: 0,
				}}
				footer={
					<div
						className="aos-ignore"
						style={
							{
								width: "100%",
								height: "50px",
								background: bgwhite,
								zIndex: "100",
								paddingTop: "50px",
								marginTop: "50px",

								["--borderrad"]: `calc(4*${volume_constant_size})`,

								borderRadius:
									"0 0 var(--borderrad) var(--borderrad)",
							} as React.CSSProperties
						}
					/>
				}
			/>
		</>
	);
};

export { KeyPartnersCallingCard };
