import React from 'react';
import { CallOut,ICallOutProps } from './CallOut';



export interface ILogoBoxProps extends ICallOutProps {
  scale: number;
}
export class LogoBox extends React.Component<ILogoBoxProps> {
  render() {
    const { Component } = this.props;
    return <Component />;
  }
}
