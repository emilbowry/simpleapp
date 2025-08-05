import React from 'react';
import globalstyles from '../../GlobalStyles.module.css' ;


export interface ICallOutProps {
  Component: React.ComponentType;
}
export class CallOut extends React.Component<ICallOutProps> {
  render() {
	const { Component } = this.props;
	return <Component />;
  }
}