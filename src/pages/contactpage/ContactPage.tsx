// src/pages/contactpage/ContactPage.tsx
/**
 * @improvement 
	- Non-critical style synergy and improvements **do last**
 */
import React from "react";

import { Page } from "../page";
import { NewCallingCard } from "../../components/callingcard/newCallingCard";

import { VerticalHexagonFeatureGrid } from "../../components/hexagons/hexagonRow/VHexRow";
import { bgwhite } from "../../utils/defaultColours";
import { hStyle } from "../homepage/parts/about-us/AboutUs";
import { titleStyle } from "../homepage/parts/about-us/AboutUs.styles";

import {
	formatComponent,
	getImageEl,
	ValidComponent,
} from "../../utils/reactUtils";
import qrcode from "../../assets/qrCode.png";
import { logoGrag, Theme } from "../../styles";
interface LearnMoreButtonProps {
	href?: string;
	content?: ValidComponent;
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({
	href = "#",
	content = "",
}) => {
	const buttonStyles: React.CSSProperties = {
		// padding: "2% 5%",
		textDecoration: "none",
		color: "white",
		fontSize: "3rem",
		// display: "flex",
		// flexDirection: "column",
		textAlign: "center",
		width: "100%",
		// alignContent: "center",
		// // verticalAlign: "middle",
		// justifyContent: "center",
		backgroundOrigin: "content-box",
		backgroundImage: `${logoGrag}`,
		backgroundPosition: "bottom left",
		backgroundRepeat: "no-repeat",
		boxSizing: "border-box",
		backgroundSize: "100% 2px",
	};

	return (
		<div
			style={{
				height: "10vw",
				display: "flex",
				flexDirection: "column",
				alignContent: "center",
				// verticalAlign: "middle",
				color: "white",
				justifyContent: "center",
			}}
		>
			{formatComponent(content)}
			<div style={{}}>
				<a
					href={href}
					style={buttonStyles}
				>
					Learn More
				</a>
			</div>
		</div>
	);
};

const foot = (
	<p>
		Do you find the world of AI vast and confusing? It’s been made to feel
		that way
		<br />
		<br />
		At AI compatible, we empower businesses with their own knowledge,
		systems and habit change to be empowered and independent. You don’t need
		to be AI-first. AI is a tool that is only useful to you when you need
		it. We strive for a world where AI goes right, and people are ready for
		it.
	</p>
);

export const CUBody = (
	<div>
		<div>
			<a href="https://community.mindstone.com/events">
				Join the Mindstone online events
			</a>
		</div>
		<div>
			<a href="https://controlai.com/take-action/uk">Take Action</a>
		</div>
		<div>
			<a href="https://www.linkedin.com/in/joe-fennell-379466170">
				Hear more from Joe on LinkedIn
			</a>
		</div>
		<div>
			<a href="#">Podcast COMING SOON</a>
		</div>
		<div>{getImageEl(qrcode)}</div>
	</div>
);
const contactFeatureCallouts = [
	{
		body: (
			<LearnMoreButton
				content={
					<div style={titleStyle}>
						<p>
							Book a free 20 minute chat to find out how we could
							help you or your business
						</p>
					</div>
				}
			/>
		),
		themeId: -1,
	},
	{
		body: (
			<LearnMoreButton
				content={
					<div style={titleStyle}>
						<p>
							Request an email of our services and offering and
							keep up to date with AI Comaptible’s mailing list
						</p>
					</div>
				}
			/>
		),
		themeId: -1,
	},
	{
		body: (
			<LearnMoreButton
				content={
					<div style={titleStyle}>
						<p>Buy 1-1 consultancy and training</p>
					</div>
				}
			/>
		),
		themeId: -1,
	},
];

export const CUCC: React.FC = () => (
	<>
		<NewCallingCard
			components={[CUBody]}
			title={<h2>Join The Conversation</h2>}
			footer={foot}
			styleOverrides={{
				backgroundColor: bgwhite,
				paddingBottom: "20%",
				marginBottom: "-20%",
				zIndex: 0,
			}}
		/>
		<VerticalHexagonFeatureGrid
			featureCallouts={contactFeatureCallouts}
			hexagonArgs={{ colour: Theme(1).backgroundColor }}
		/>
		{/* <VHexGrid /> */}
	</>
);

export const contactPage: React.FC = () => {
	return <CUCC />;
};

export const ContactPage = (
	<Page
		page={contactPage}
		bg={true}
	/>
);
