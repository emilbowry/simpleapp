
//  src/components/timeline/spineComponent/SpineComponent.tsx


import React from 'react';
import styles from './Timeline.module.css';

export interface blahblah {

}

export interface ISpineContentComponentProps {
	index: number;
	scaleFactor: number;
}



export interface ISpineContentRenderProps extends ISpineContentComponentProps {

	contentComponent: React.ComponentType<ISpineContentComponentProps>;

}

export interface ISpineComponentProps extends ISpineContentRenderProps {

	reflactable?: boolean;
}



export interface ISpineComponentBehavior {
	renderContent(args: ISpineContentRenderProps): React.ReactNode;
}



export class SpineComponent extends React.Component<ISpineComponentProps> implements ISpineComponentBehavior {

	public static getOrientationFlip(index: number): boolean {
		return index % 2 === 1;
	}

	public renderContent(args: ISpineContentRenderProps): React.ReactNode {
		const { contentComponent: ContentComponent, ...componentProps } = args;
		return <ContentComponent {...componentProps} />;

	}

	render() {
		const { reflactable = false, ...renderProps } = this.props;
		const { index, scaleFactor } = renderProps;



		const _flip = SpineComponent.getOrientationFlip(index);
		const flip = _flip ? -1 : 1;


		return (
			// 	<div style={reflactable
			// 		? { direction: _flip ? 'rtl' : 'ltr' }
			// 		: { transform: `scale(${flip * scaleFactor}, ${scaleFactor})` }}>
			// 		{this.renderContent({ ...renderProps })}

			// 	</div>
			// );

			<div style={reflactable
				? { transform: `scale(${flip * scaleFactor}, ${scaleFactor})` }
				: { direction: _flip ? 'rtl' : 'ltr' }
			}>
				{this.renderContent({ ...renderProps })}

			</div>
		);
	}
}

