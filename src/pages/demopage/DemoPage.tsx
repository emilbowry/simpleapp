import React from 'react';
import styles from './DemoPage.module.css';
import { Timeline, ITimelineEvent } from '../../components/timeline/Timeline';
import { CallingCard } from '../../components/callingcard/CallingCard';
import { CallOut } from '../../components/callingcard/CallOut';

const demoTimelineEvent: ITimelineEvent[] = [
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

const demoTimeline: React.FC = () => {
  return (
      <section>
        <h2 style={{ textAlign: 'center' }}>Our Journey</h2>

        <Timeline timelineEvents={demoTimelineEvent}/>

      </section>
  )


};


export const DemoPage: React.FC = () => {
  const componentsToRender = [
	  <CallOut Component={demoTimeline}/>

  ];

  const ccElement = <CallingCard components={componentsToRender}  index={0}/>;
  const bcElement = <CallingCard components={componentsToRender}  index={1}/>;


  return (
    <section className={styles.footer}>
      {ccElement}
      {bcElement}

    </section>
  );
};


