import { WinfunEvent } from '../ModelDeclare';

export enum EventActionEnum {
	CREATE_EVENT = 'CREATE_EVENT',
	CREATE_EVENT_SUCCESSFUL = 'CREATE_EVENT_SUCCESSFUL'
}

export interface ICreateEvent {
	type: EventActionEnum.CREATE_EVENT;
	event: WinfunEvent;
}

export type EventActions = ICreateEvent