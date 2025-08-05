import React from 'react';
import globalstyles from '../../GlobalStyles.module.css' ;
import styles from './CallingCard.module.css' ;
import logo from '/src/assets/logo.svg';
import { LogoBox, ILogoBoxProps } from './LogoBox';


export interface ICallingCardProps {
  components: React.ReactElement[];
  index?: number;
}

export class CallingCard extends React.Component<ICallingCardProps> {
  render() {
    const { components, index=0 } = this.props;

    let gridTemplate = `repeat(${components.length}, 1fr)`;

    if (components.length === 2 && components[1].type === LogoBox) {
      const props = components[1].props as ILogoBoxProps;
      const ratio = props.scale || 0.2;
      
      gridTemplate = `1fr minmax(0, ${ratio * 100}%)`;
    }
    const cardStyle: React.CSSProperties = {
      gridTemplateColumns: gridTemplate,
    };

    // 2. If the index is odd, add the specific background color.
    if (index % 2 !== 0) {
      cardStyle.backgroundColor = 'rgb(228, 241, 233)';
    }

    // 3. Apply the final combined style object to the section.
    return (
      <section
        className={styles.callingCard}
        style={cardStyle}
      >
        {components}
      </section>
    );
  
    // return (
    //   <section
    //     className={styles.callingCard}
    //     style={{ gridTemplateColumns: gridTemplate }}
    //   >
    //     {components}
    //   </section>
    // );
  }
}
