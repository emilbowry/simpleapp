// src/pages/contactpage/ContactPage.tsx

import React from "react";

import { Page } from "../page";
import { NewCallingCard } from "../../components/callingcard/CallingCard";

import { VerticalHexagonFeatureGrid } from "../../components/hexagons/hexagonRow/verticalHexagonRow/VHexRow";
import { bgwhite, logo_blue } from "../../utils/defaultColours";

export const titleStyle: React.CSSProperties = {
	fontSize: "2rem",
	fontWeight: "400",
	textAlign: "center",
	color: logo_blue,
};
import {
	formatComponent,
	getImageEl,
	ValidComponent,
} from "../../utils/reactUtils";
import qrcode from "../../assets/qrCode.png";
import { linkStyle, logoGrag, Theme } from "../../styles";
interface LearnMoreButtonProps {
	href?: string;
	content?: ValidComponent;
	isUnderlined?: boolean;
}

export const StyledLink: React.FC<LearnMoreButtonProps> = ({
	href = "#",
	content = "",
	isUnderlined = true,
}) => {
	return (
		<div
			style={{
				flex: 2,
				display: "flex",
				justifyContent: "center",
				gap: "15px",
			}}
		>
			<div>
				<a
					href={href}
					style={{ ...linkStyle(isUnderlined), ...titleStyle }}
				>
					{formatComponent(content)}
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
		<StyledLink
			href="https://community.mindstone.com/events"
			content="Join the Mindstone online events"
		/>
		<StyledLink
			href="https://controlai.com/take-action/uk"
			content="Take Action"
		/>
		<StyledLink
			href="https://www.linkedin.com/in/joe-fennell-379466170"
			content="Hear more from Joe on LinkedIn"
		/>
		<StyledLink
			href="#"
			content="Podcast COMING SOON"
		/>
	</div>
);
const contactFeatureCallouts = [
	{
		body: (
			<StyledLink
				content={`Book a free 20 minute chat to find out how we could
							help you or your business`}
			/>
		),
		themeId: -1,
	},
	{
		body: (
			<StyledLink
				content={`
							Request an email of our services and offering and
							keep up to date with AI Comaptible’s mailing list
						`}
			/>
		),
		themeId: -1,
	},
	{
		body: <StyledLink content={`Buy 1-1 consultancy and training`} />,
		themeId: -1,
	},
];

export const contactPage: React.FC = () => (
	<>
		<NewCallingCard
			components={[CUBody]}
			sideBar={{
				components: [foot],
				header: <h2>Join The Conversation</h2>,
			}}
			footer={
				<VerticalHexagonFeatureGrid
					featureCallouts={contactFeatureCallouts}
					hexagonArgs={{ colour: Theme(1).backgroundColor }}
					useVerticalAlignment={true}
				/>
			}
			styleOverrides={{
				backgroundColor: bgwhite,
				paddingBottom: "20%",
				marginBottom: "-20%",
				zIndex: 0,
			}}
		/>
	</>
);

export const ContactPage = (
	<Page
		page={contactPage}
		bg={true}
	/>
);
