// src/components/callingcard/CallOut.tsx

import React from 'react';
import globalstyles from '../../GlobalStyles.module.css';


export interface IStructuredCalloutProps {
  // date: string;
  title: string;
  description: string;
  image?: string;
}

export interface ICallOutProps {
  Component: React.ComponentType;
}
export class CallOut extends React.Component<ICallOutProps> {
  render() {
    const { Component } = this.props;
    return <Component />;
  }
}


// export class StructuredCallout<ICallOutProps & data: IStructuredCalloutProps> extends CallOut {


// }

// export const _EventContent: React.FC<IEventContentComponentProps & { timelineEvent: ITimelineEvent }> = ({ timelineEvent }) => {
// 	return (
// 		<div className={styles.contentContainer}>
// 			<h3 className={styles.eventTitle}>{`${timelineEvent.date}: ${timelineEvent.title}`}</h3>
// 			<p className={styles.eventDescription}>{timelineEvent.description}</p>
// 		</div>
// 	);

// }
