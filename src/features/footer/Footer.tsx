// src/features/footer/footer.tsx

import React from "react";
import logo from "../../assets/logo.png";
import { CallOut } from "../../components/callingcard/callout/CallOut";
import { getImageEl } from "../../utils/reactUtils";
import { CallingCard } from "../../components/callingcard/CallingCard";

// import { getImageEl } from "./utils/reactUtils";

// export const Footer: React.FC = () => {
// 	const componentsToRender = [
// 		<CallOut body={getImageEl(logo)} />,
// 		<CallOut
// 			body={<h1>The way to be 'AI-first'...</h1>}
// 			index={1}
// 		/>,
// 	];
// 	const ccElement = (
// 		<CallingCard
// 			components={componentsToRender}
// 			index={1}
// 			fullSpread={true}
// 		/>
// 	);
// 	return <section>{ccElement}</section>;
// };
