//  src/components/timeline/spineComponent/SpineComponent.tsx

import React from "react";
// import styles from "./Timeline.module.css";

export interface ISpineContent {
	isLeftHanded: boolean;
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
	public renderContent(args: TSpineElement): React.ReactNode {
		const { contentComponent: ContentComponent, ...componentProps } = args;
		return <ContentComponent {...componentProps} />;
	}

	render() {
		const { reflectable = false, ...renderProps } = this.props;
		const { isLeftHanded, scaleFactor } = renderProps;

		const flip = isLeftHanded ? 1 : -1;

		return (
			<div
				style={
					reflectable
						? {
								transform: `scale(${
									flip * scaleFactor
								}, ${scaleFactor})`,
						  }
						: { direction: isLeftHanded ? "rtl" : "ltr" }
				}
			>
				{this.renderContent({ ...renderProps })}
			</div>
		);
	}
}
