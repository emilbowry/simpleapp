interface ITimelineEvent {
	date: string;
	title: string;
	description: string;
}



interface ISpineContent {
	index: number;
	scaleFactor: number;
}

interface IContentContainer {
	contentComponent: React.ComponentType<any>;

}

interface IReflectable {
	reflactable?: boolean;

}

type TSpineElement = ISpineContent & IContentContainer;
type TSpineComponent = TSpineElement & IReflectable;



interface IEventContentComponentProps extends ISpineContent {
	data: ITimelineEvent;

}


type TEventContent = ISpineContent & IEventContentComponentProps;
type TEventElement = TEventContent & IEventContentComponentProps;
type TEventComponent = TEventElement & IReflectable;




export interface ISpineComponentBehavior {
	renderContent(args: TSpineElement): React.ReactNode;
}
