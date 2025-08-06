// // import React from 'react';
// // import styles from './Timeline.module.css';


// // export interface ITimelineEvent {
// //   date: string;
// //   title: string;
// //   description: string;
// // }


// // interface ISpineComponent {
// //   content?: React.ReactNode;

// //   index: number;
// //   scaleFactor?: number;

// // }


// import React from 'react';

// export interface ISpineContentComponentProps {
//   index: number;
//   scaleFactor: number;
// }

// export interface ISpineComponentProps {
//   index: number;
//   scaleFactor?: number;
//   contentComponent: React.ComponentType<ISpineContentComponentProps>;
// }

// export interface ISpineComponentBehavior {
//   getOrientationFlip(): 1 | -1;
//   getCoreTransformationStyle(_flip: 1 | -1, scaleFactor: number): React.CSSProperties;
// }

// class SpineComponent extends React.Component<ISpineComponentProps> implements ISpineComponentBehavior {

//   public getOrientationFlip(): 1 | -1 {
//     return this.props.index % 2 === 1 ? -1 : 1;
//   }

//   public getCoreTransformationStyle(_flip: 1 | -1, scaleFactor: number): React.CSSProperties {
//     return {
//       transform: `scaleX(${_flip * scaleFactor}) scaleY(${scaleFactor})`,
//       transformOrigin: 'center center',
//     };
//   }

//   render() {
//     const { index, scaleFactor = 1, contentComponent: ContentComponent } = this.props;

//     const _flip = this.getOrientationFlip();

//     const transformationStyle = this.getCoreTransformationStyle(_flip, scaleFactor);

//     return (
//       <div style={transformationStyle}>
//         <ContentComponent index={index} scaleFactor={scaleFactor} />
//       </div>
//     );
//   }
// }
