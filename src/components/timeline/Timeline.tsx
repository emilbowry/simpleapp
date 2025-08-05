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

const sf = 3;
export interface IVertibraeProps {
  index?: number;
}
export class Vertibrae extends React.Component<IVertibraeProps> {
  render() {
  const {index=0} = this.props
  const colours = ["#41b2b3","#5D7F8C","#7F81AF","#697085","#7E8180"]



  const centreCircle = "m20,0a20,20,90,0,0,-40,0zm-40,0a20,20,90,0,0,40,0z"

  const leftHandHalo = "m -22,0 a22,22,90,0,1,22,-22l0,-2a24,24,90,0,0,-24,24m24,-22h1v-40h-2v40zm-22,22v-1h-33v2h33zm-40,0a2,2,90,1,0,8,0a2,2,90,1,0,-8,0zm2,0a2,2,90,0,1,4,0a2,2,90,0,1,-4,0z";

  let _flip = 1;

  if (index % 2 === 1) {
    _flip = -1;
  }

  const colour = colours[index % 5]
  const transformation = `scale(${_flip*sf},${sf}) `
  const view_box = `${-45*sf} ${-45*sf} ${90*sf} ${90*sf}`

  return (
      <svg viewBox={view_box} width={sf*90} height={sf*90} fill={colour} preserveAspectRatio="xMidYMid meet" style={{overflow: "visible"}} >
        <g  transform={transformation}>
              <path d={centreCircle} />
              <path d = {leftHandHalo} />
        </g>
      </svg>
 )

  }
}


export const Timeline: React.FC = () => {
  const numberOfElements = 4; // Example number of elements in the chain

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:`${sf*2}em`}}>

      {Array.from({ length: numberOfElements }).map((_, index) => (
        <Vertibrae key={index} index={index} />
      ))}
    </div>
  );
};
