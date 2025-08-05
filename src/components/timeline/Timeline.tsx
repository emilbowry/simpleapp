import React from 'react';
import styles from './Timeline.module.css';

export interface ITimelineEvent {
  date: string;
  title: string;
  description: string;
}


interface IVertibraeProps {
  content?:React.ReactNode;

  index?: number;
  scaleFactor?: number;

}
class Vertibrae extends React.Component<IVertibraeProps> {
  render() {

  const centreCircle = "m20,0a20,20,90,0,0,-40,0zm-40,0a20,20,90,0,0,40,0z"
  const leftHandHalo = "m -22,0 a22,22,90,0,1,22,-22l0,-2a24,24,90,0,0,-24,24m24,-22h1v-40h-2v40zm-22,22v-1h-33v2h33zm-40,0a2,2,90,1,0,8,0a2,2,90,1,0,-8,0zm2,0a2,2,90,0,1,4,0a2,2,90,0,1,-4,0z";

  const defaultElement = (
        <>
              <path d={centreCircle} />
              <path d = {leftHandHalo} />
        </>
  )
  const {index=0,scaleFactor=0,content=defaultElement} = this.props
  
  let _flip = 1;
  if (index % 2 === 1) {
    _flip = -1;
  }
  const transformation = `scale(${_flip*scaleFactor},${scaleFactor}) `
  const colours = ["#41b2b3","#5D7F8C","#7F81AF","#697085","#7E8180"]



  const colour = colours[index % 5]
  const view_box = `${-45*scaleFactor} ${-45*scaleFactor} ${90*scaleFactor} ${90*scaleFactor}`

  const vertebralContent = (
      <svg viewBox={view_box} width={scaleFactor*90} height={scaleFactor*90} fill={colour} preserveAspectRatio="xMidYMid meet" style={{overflow: "visible"}} >
        <g  transform={transformation}>
              {content}
        </g>
      </svg>
 )



  return vertebralContent;



  }
}




const EventContent: React.FC<{ data: ITimelineEvent }> = ({ data }) => {
  return (
    <div className={styles.contentContainer}>
      <h3 className={styles.eventTitle}>{`${data.date}: ${data.title}`}</h3>
      <p className={styles.eventDescription}>{data.description}</p>
    </div>
  );
};

interface ITimelineEventRowProps extends IVertibraeProps{
  eventData: ITimelineEvent;
}

 class TimelineEventRow extends React.Component<ITimelineEventRowProps> {
  render() {
    const { index=0, eventData, scaleFactor =2 } = this.props;
    const isLeftSided = index % 2 === 0;

    return (
      <div className={styles.timelineEventRow}>
        {/* Column A: Left Content */}
        <div style={{ textAlign: 'right',marginRight:`${1*scaleFactor}rem`}}>
          {isLeftSided && <EventContent data={eventData}  />}
        </div>

        {/* Column B: Center Spine */}
        <div className={styles.spineContainer}>
          <Vertibrae index={index} scaleFactor={scaleFactor} />
        </div>

        {/* Column C: Right Content */}
        <div style={{ textAlign: 'left',  marginLeft:`${1*scaleFactor}rem` }}>
          {!isLeftSided && <EventContent data={eventData} />}
        </div>
      </div>
    );
  }
}

export interface ITimelineData {

  timelineEvents: ITimelineEvent[];

}
export class Timeline extends React.Component<ITimelineData> {
  render() {
    const { timelineEvents } = this.props;

    return (
      <section>
        <div style={{overflow:"auto"}}>
          {timelineEvents.map((item, index) => (
            <TimelineEventRow
              key={index}
              index={index}
              eventData={item}
            />
          ))}
        </div>

      </section>
    );
    
  }
}
// --- The Final Demo Component ---


//TOD GENERALISE THE PARTS