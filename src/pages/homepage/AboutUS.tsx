import React from "react";
import { CallingCard } from "../../components/callingcard/CallingCard";
import { body_font_colour } from "../../utils/defaultColours";

export const AboutUs: React.FC<{ index?: number }> = ({ index = -1 }) => {
	return (
		<CallingCard
			title="About us"
			components={[
				<div
					style={{
						color: body_font_colour,
						fontSize: "2rem",
					}}
				>
					At AI Compatible, we believe not everyone needs to be an AI
					expert but everyone should be AI compatible. That means
					being alert to the opportunities and the risks: we help
					businesses navigate both, with tailored sessions giving you
					the right tools, skills, and literacy.
					<br />
					We strive for a world where AI goes right, and people are
					ready for it.
				</div>,
			]}
			index={index}
		/>
	);
};
