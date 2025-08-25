// src/pages/contactpage/ContactPage.tsx

import React from "react";

import { CallOut } from "../../components/callingcard/callout/CallOut";
import { formatComponent, ValidComponent } from "../../utils/reactUtils";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { BackgroundStyle } from "../../styles";
const CalloutContent: React.FC<{ body: string }> = ({ body }) => {
	return (
		<CallOut
			body={
				<div>
					<div>{formatComponent(body)}</div>
					<div>
						<a href="">Learn More</a>
					</div>
				</div>
			}
		/>
	);
};

const ContactUS: React.FC = () => {
	const callouts = [
		<CalloutContent
			body={
				"Book a free 20 minute chat to find out how we could help you or your business"
			}
		/>,
		<CalloutContent
			body={
				"Request an email of our services and offering and keep up to date with AI Comaptible’s mailing list"
			}
		/>,
		<CalloutContent body={"Buy 1-1 consultancy and training"} />,
	];
	return (
		<CallingCard
			components={callouts}
			index={0}
		/>
	);
};

import { demoSmallPB as DPB } from "../homepage/parts/smallPartnershipBar";

const contactPage: React.FC = () => {
	const componentsToRenderc = [<CallOut body={<DPB index={-1} />} />];

	const ccElement = (
		<CallingCard
			components={componentsToRenderc}
			index={1}
		/>
	);

	const callouts = [
		<CalloutContent
			body={
				"Book a free 20 minute chat to find out how we could help you or your business"
			}
		/>,
		<CalloutContent
			body={
				"Request an email of our services and offering and keep up to date with AI Comaptible’s mailing list"
			}
		/>,
		<CalloutContent body={"Buy 1-1 consultancy and training"} />,
	];
	return (
		<div style={BackgroundStyle}>
			<CallingCard
				components={componentsToRenderc}
				// fullSpread={true}
				index={-1}
			/>

			<CallingCard
				components={callouts}
				index={0}
			/>
		</div>
	);
};

import { Page } from "../page";

export const ContactPage = (
	<Page
		page={contactPage}
		bg={true}
	/>
);
