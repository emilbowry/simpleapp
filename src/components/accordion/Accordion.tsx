// src/components/accordion/Accordion.tsx

import React, { useState } from "react";
import styles from "./Accordion.module.css";
import { ChevronRight, ChevronDown } from "lucide-react";

interface AccordionItemData {
	question: string;
	answer: string;
	iconType: "right" | "down";
}

const accordionData: AccordionItemData[] = [
	{
		question:
			"But has your business explored the free off-the-shelf tools?",
		answer: "There's so much out there! Agile businesses are making massive gains with free tools like Notebook LM, Claude, Gamma, Napkin.AI, and many more.",
		iconType: "right",
	},
	{
		question:
			"And have they committed time to figuring out how to get the most of the tools that they do have?",
		answer: "Lots of big companies now have their own branded chatbot interface of ChatGPT, but have given their people almost no time at all to explore what the best use cases for their roles, nor connected them to people in similar roles who have already figured it out.",
		iconType: "down",
	},
];

const AccordionItem: React.FC<{
	item: AccordionItemData;
	isOpen: boolean;
	onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
	const isExpandable = item.answer !== "";

	return (
		<div className={styles.accordionItem}>
			<div
				className={styles.accordionHeader}
				onClick={isExpandable ? onClick : undefined}
			>
				<div className={styles.iconContainer}>
					{item.iconType === "right" ? (
						<ChevronRight className={styles.icon} />
					) : isExpandable ? (
						isOpen ? (
							<ChevronDown className={styles.icon} />
						) : (
							<ChevronRight className={styles.icon} />
						)
					) : (
						<ChevronDown className={styles.icon} /> // Default for non-expandable
					)}
				</div>
				<h3>{item.question}</h3>
			</div>
			{isExpandable && isOpen && (
				<div className={styles.accordionContent}>
					<p>{item.answer}</p>
				</div>
			)}
		</div>
	);
};

export const AccordionSection: React.FC = () => {
	const [openIndexes, setOpenIndexes] = useState<number[]>([1]);

	const handleClick = (index: number) => {
		if (openIndexes.includes(index)) {
			setOpenIndexes(openIndexes.filter((i) => i !== index));
		} else {
			setOpenIndexes([...openIndexes, index]);
		}
	};

	return (
		<section className={styles.accordionSection}>
			<div className={styles.card}>
				<h2 className={styles.mainTitle}>
					In 2024, businesses spent $200 billion on AI
				</h2>
				{accordionData.map((item, index) => (
					<AccordionItem
						key={index}
						item={item}
						isOpen={openIndexes.includes(index)}
						onClick={() => handleClick(index)}
					/>
				))}
			</div>
		</section>
	);
};
