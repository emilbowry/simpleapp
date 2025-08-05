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

// export const LeftHandHalo: React.FC = () {}
export interface ISpineElementProps {
  index: number;
}
export class SpineElement extends React.Component<ISpineElementProps> {
  render() {
  const {index} = this.props
  const colours = ["#41b2b3","#5D7F8C","#7F81AF","#697085","#7E8180"]

  const centreCircle = "M180,100 a30,30,90,0,0,-60,0zm-60,0a30,30,90,0,0,60,0"
  const leftHandHalo = "M117,100 a33,33,90,0,1,33,-33l0,-3a36,36,90,0,0,-36,36m36,-33h1.5v-60h-3v60zm-33,33v-1.5h-49.5v3h49.5zm-60,0a3,3,90,1,0,12,0a3,3,90,1,0,-12,0zm3,0a3,3,90,0,1,6,0a3,3,90,0,1,-6,0z";
  const rightHandHalo = "M183,100 a33,33,90,0,0,-33,-33l0,-3a36,36,90,0,1,36,36m-36,-33h-1.5v-60h3v60zm33,33v-1.5h49.5v3h-49.5zm60,0a3,3,90,1,1,-12,0a3,3,90,1,1,12,0zm-3,0a3,3,90,0,0,-6,0a3,3,90,0,0,6,0z";
  
  // transform="scale(2,2) scale(-1,1)"
  let halo = leftHandHalo;
  if (index % 2 === 1) {
    halo = rightHandHalo;
  }
  const colour = colours[index % 5]

  return (
      <svg fill={colour} >
        <path d={centreCircle} />
        <path d = {halo} />
      </svg>
 )

  ;
  }
}

export const Timeline: React.FC = () => {
  const numberOfElements = 4; // Example number of elements in the chain

  return (
    // A simple flex container to stack the SVG elements vertically.
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Create an array and map over it to render the chain */}
      {Array.from({ length: numberOfElements }).map((_, index) => (
        <SpineElement key={index} index={index} />
      ))}
    </div>
  );
};
