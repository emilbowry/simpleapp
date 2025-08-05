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

// export const Timeline: React.FC = () => {
//   return (
//     <section className={styles.timelinesection}>
//       <h2 className={styles.timelinetitle}>AI Compatible's Journey</h2>
//       <div className={styles.timelinecontainer}>
//         {timelineData.map((item, index) => {
//           // Determine if the item should be on the left or right
//           const itemPositionClass = index % 2 === 0 ? styles.left : styles.right;

//           return (
//             <div key={index} className={`${styles.timelineitem} ${itemPositionClass}`}>
//               <div className={styles.timelinenumber}>{index + 1}</div>
//               <div className={styles.timelinecontent}>
//                  <h3>{`${item.date}: ${item.title}`}</h3>
//                  <p>{item.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };
interface SpineNodeProps {
  color: string;
  orientation: 'left' | 'right';
}

const SpineNode: React.FC<SpineNodeProps> = ({ color, orientation }) => {
  // Pass the color to the CSS via a CSS custom property (variable)
  const style = { '--event-color': color } as React.CSSProperties;

  // Combine the base class with the orientation-specific class ('left' or 'right')
  const connectorClass = `${styles.horizontalConnector} ${styles[orientation]}`;

  return (
    <div className={styles.spineNodeContainer} style={style}>
      <div className={styles.circle}>
        <div className={connectorClass}></div>
      </div>
      {/* The vertical line is rendered for every node in this demo */}
      <div className={styles.verticalLine}></div>
    </div>
  );
};

// --- 2. The Demo Component ---

export const Timeline: React.FC = () => {
  // Sample data to demonstrate the chain
  const demoData = [
    { color: '#00A0B0', orientation: 'left' as const },
    { color: '#6A7A8F', orientation: 'right' as const },
    { color: '#8E7CC3', orientation: 'left' as const },
    { color: '#6A7A8F', orientation: 'right' as const },
    { color: '#00A0B0', orientation: 'left' as const },
  ];
  return (
    <div 
      className={styles.icon} 
      role="img" 
      aria-label="Magnifying glass icon"
    />
  );
  // return (
  //   <div style={{ width: '100px', margin: '0 auto' }}>
  //     {demoData.map((item, index) => (
  //       <SpineNode
  //         key={index}
  //         color={item.color}
  //         orientation={item.orientation}
  //       />
  //     ))}
  //   </div>
  // );
};