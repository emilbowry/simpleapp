//  src/components/timeline/spineComponent/SpineComponent.tsx

import React from "react";
// import styles from "./Timeline.module.css";

export interface ISpineContent {
	index: number;
	scaleFactor: number;
}

export interface IContentContainer {
	contentComponent: React.ComponentType<any>;
}

export interface IReflectable {
	reflectable?: boolean;
}

export type TSpineElement = ISpineContent & IContentContainer;
export type TSpineComponent = TSpineElement & IReflectable;

export interface ISpineComponentBehavior {
	renderContent(args: TSpineElement): React.ReactNode;
}

export class SpineComponent
	extends React.Component<TSpineComponent>
	implements ISpineComponentBehavior
{
	public static getOrientationFlip(index: number): boolean {
		return index % 2 === 1;
	}

	public renderContent(args: TSpineElement): React.ReactNode {
		const { contentComponent: ContentComponent, ...componentProps } = args;
		return <ContentComponent {...componentProps} />;
	}

	render() {
		const { reflectable = false, ...renderProps } = this.props;
		const { index, scaleFactor } = renderProps;

		const _flip = SpineComponent.getOrientationFlip(index);
		const flip = _flip ? -1 : 1;

		return (
			<div
				style={
					reflectable
						? {
								transform: `scale(${
									flip * scaleFactor
								}, ${scaleFactor})`,
						  }
						: { direction: _flip ? "rtl" : "ltr" }
				}
			>
				{this.renderContent({ ...renderProps })}
			</div>
		);
	}
}
