// src/pages/thejourneypage/TheJourney.tsx

import React from "react";
import { BackgroundStyle } from "../../styles";

export const theJourneyPage: React.FC = () => {
	return <div style={BackgroundStyle}></div>;
};

import { Page } from "../page";

export const TheJourneyPage = (
	<Page
		page={theJourneyPage}
		bg={true}
	/>
);
