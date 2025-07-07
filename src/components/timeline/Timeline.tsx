import React from 'react';
import styles from './Timeline.module.css';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  {
    date: 'Early 2024',
    title: 'Prompt Engineering Offering',
    description: 'AIC introduces the FAST START Prompt engineering framework, improving the specificity, relevance and hallucination rate of LLMs in performance.',
  },
  {
    date: 'Mid 2024',
    title: 'Emergence of Newer Interfaces',
    description: 'Innovative interfaces like Gamma, Napkin AI, and Sana gain traction, indicating a diversifying AI landscape and a growing demand for specialized tools.',
  },
  {
    date: 'Late 2024',
    title: "'Tasks to Tools' Offering",
    description: "AIC launches the 'tasks to tools' service, aligning emerging services and matching businesses with appropriate AI solutions.",
  },
  {
    date: 'Early 2025',
    title: 'Mindstone online',
    description: 'Joe becomes the host of the online events of Mindstone, one of the biggest practical AI Communities in the world.',
  },
  {
    date: 'Mid 2025',
    title: 'Policy-writing',
    description: 'AI compatible transfers what it has learnt working with clients in gen AI training and consultancy into a template for generative AI policy',
  },
];

export const Timeline: React.FC = () => {
  return (
    <section className={styles.timelinesection}>
      <h2 className={styles.timelinetitle}>AI Compatible's Journey</h2>
      <div className={styles.timelinecontainer}>
        {timelineData.map((item, index) => {
          // Determine if the item should be on the left or right
          const itemPositionClass = index % 2 === 0 ? styles.left : styles.right;

          return (
            <div key={index} className={`${styles.timelineitem} ${itemPositionClass}`}>
              <div className={styles.timelinenumber}>{index + 1}</div>
              <div className={styles.timelinecontent}>
                 <h3>{`${item.date}: ${item.title}`}</h3>
                 <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};