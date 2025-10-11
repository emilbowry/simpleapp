// src/pages/contactpage/ContactPage.tsx

import React from "react";

import { Page } from "../../features/page/Page";
import { SideBarCallingCard } from "../../components/callingcard/CallingCard";

import { PointedtopHexagonFeatureGrid } from "../../components/hexagons/hexagon-row/pointed-hexagon-row/PointedHexagonRow";
import { bgwhite, logo_blue } from "../../utils/defaultColours";

import {
	formatComponent,
	getImageEl,
	ValidComponent,
} from "../../utils/reactUtils";
import { linkStyle, logoGrag, Theme } from "../../styles";
import { titleStyle } from "./ContactPage.styles";

export const StyledLink: React.FC<{
	href?: string;
	content?: ValidComponent;
	isUnderlined?: boolean;
}> = ({ href = "#", content = "", isUnderlined = true }) => {
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

const sidebar_body = (
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

const CUBody = (
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
	[
		<StyledLink
			content={`Book a free 20 minute chat to find out how we could
							help you or your business`}
		/>,
	],
	[
		<StyledLink
			content={`
							Request an email of our services and offering and
							keep up to date with AI Comaptible’s mailing list
						`}
		/>,
	],
	[<StyledLink content={`Buy 1-1 consultancy and training`} />],
];

const contactPage: React.FC = () => (
	<>
		<SideBarCallingCard
			components={[CUBody]}
			sideBar={{
				components: [sidebar_body],
				header: <h2>Join The Conversation</h2>,
			}}
			footer={
				<PointedtopHexagonFeatureGrid
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
