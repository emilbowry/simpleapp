//  src/components/timeline/spineComponent/SpineComponent.tsx

import React from "react";

export interface ISpineContent {
	isLeftHanded: boolean;
	scaleFactor: number;
}

interface IContentContainer {
	contentComponent: React.ComponentType<any>;
}

interface IReflectable {
	reflectable?: boolean;
}

export type TSpineElement = ISpineContent & IContentContainer;
export type TSpineComponent = TSpineElement & IReflectable;

interface ISpineComponentBehavior {
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

		const flip = isLeftHanded ? -1 : 1;

		return (
			<div
				style={
					reflectable
						? {
								transform: `scale(${
									flip * scaleFactor
								}, ${scaleFactor})`,
						  }
						: {}
					//:   { direction: isLeftHanded ? "ltr" : "rtl" }
				}
			>
				{this.renderContent({ ...renderProps })}
			</div>
		);
	}
}
