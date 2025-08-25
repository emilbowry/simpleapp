// src/components/timeline/newTimeline.types.tsx

import React from "react";
import { ValidComponent } from "../../../utils/reactUtils";
import { IEvent } from "../spineComponent/Event";
export interface ITimelineRow {
	element: ValidComponent;
	index?: number;
}
export interface ITimelineData {
	timelineEvents: IEvent[];
}
