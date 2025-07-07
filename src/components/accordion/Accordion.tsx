import React, { useState } from 'react';
import styles from './Accordion.module.css';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Define the type for each accordion item's data
interface AccordionItemData {
  question: string;
  answer: string;
  iconType: 'right' | 'down';
}

// Data for the accordion items
const accordionData: AccordionItemData[] = [
  {
    question: 'But has your business explored the free off-the-shelf tools?',
    answer: "There's so much out there! Agile businesses are making massive gains with free tools like Notebook LM, Claude, Gamma, Napkin.AI, and many more.",
    iconType: 'right',
  },
  {
    question: 'And have they committed time to figuring out how to get the most of the tools that they do have?',
    answer: 'Lots of big companies now have their own branded chatbot interface of ChatGPT, but have given their people almost no time at all to explore what the best use cases for their roles, nor connected them to people in similar roles who have already figured it out.',
    iconType: 'down',
  },
];

// Individual Accordion Item Component (No changes needed here)
const AccordionItem: React.FC<{
  item: AccordionItemData;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  const isExpandable = item.answer !== '';

  return (
    <div className={styles.accordionItem}>
      <div className={styles.accordionHeader} onClick={isExpandable ? onClick : undefined}>
        <div className={styles.iconContainer}>
          {item.iconType === 'right' ? (
            <ChevronRight className={styles.icon} />
          ) : (
            // The icon now changes based on the 'isOpen' state for expandable items
            isExpandable ? (
              isOpen ? <ChevronDown className={styles.icon} /> : <ChevronRight className={styles.icon} />
            ) : (
              <ChevronDown className={styles.icon} /> // Default for non-expandable
            )
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


// Main Accordion Section Component (UPDATED LOGIC)
export const AccordionSection: React.FC = () => {
  // State now holds an array of open indexes. Default to [1] to keep the second item open.
  const [openIndexes, setOpenIndexes] = useState<number[]>([1]);

  const handleClick = (index: number) => {
    // Check if the index is already in the array
    if (openIndexes.includes(index)) {
      // If it is, remove it (closing the item)
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // If it's not, add it (opening the item)
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section className={styles.accordionSection}>
      <div className={styles.card}>
        <h2 className={styles.mainTitle}>In 2024, businesses spent $200 billion on AI</h2>
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            // The item is open if its index is in the openIndexes array
            isOpen={openIndexes.includes(index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </section>
  );
};