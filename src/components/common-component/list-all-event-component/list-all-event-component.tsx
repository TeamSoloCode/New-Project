import * as moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { FETCH_ALL_EVENT_API } from '../../../api/API';
import { WinfunEvent } from '../../../models/WinfunEvent';
import ItemEventComponent from './item-event-component/item-event-component';
import './list-all-event-component.css';
export interface IListAllEventComponentProps {
}
interface State {
	events: WinfunEvent[];
	fetching: boolean;
	error: boolean;
	message: string;
}

enum ActionEnum {
	FETCH_ALL_EVENTS,
	FETCH_ALL_EVENTS_SUCCESSFUL,
	FETCH_ALL_EVENTS_FAILED,
}

type Action =
	| { type: ActionEnum.FETCH_ALL_EVENTS }
	| { type: ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL; events: WinfunEvent[]; message: string }
	| { type: ActionEnum.FETCH_ALL_EVENTS_FAILED; message: string };

const initialState: State = { events: [], fetching: false, error: false, message: '' };

function reducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case ActionEnum.FETCH_ALL_EVENTS:
			return { ...state, fetching: true };
		case ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL:
			return { ...state, events: action.events, fetching: false, message: action.message, error: false };
		case ActionEnum.FETCH_ALL_EVENTS_FAILED:
			return { ...state, message: action.message, error: true };
		default:
			throw new Error();
	}
}


export const ListAllEventComponent = withRouter(
	React.memo((props: any) => {
		const [state, dispatch] = React.useReducer(reducer, initialState);
		const [events, setEvents] = React.useState(state.events);

		const loadData = async () => {
			try {
				dispatch({
					type: ActionEnum.FETCH_ALL_EVENTS,
				});

				const response = await fetch(FETCH_ALL_EVENT_API);
				if (response) {
					const results = await response.json();
					if (results.code != 0) {
						dispatch({
							type: ActionEnum.FETCH_ALL_EVENTS_FAILED,
							message: results.message.sqlMessage,
						});

						throw Error(results.message.sqlMessage);
					}

					dispatch({
						type: ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL,
						events: results.data as WinfunEvent[],
						message: 'Fetch event successfull !!!',
					});
				}
			} catch (err) {
				alert(err.message);
			} finally {
			}
		};

		React.useEffect(() => {
			loadData();
		}, []);

		React.useEffect(() => {
			const events = state.events.map((event) => ({
				...event,
				beginDatetime: moment(event.beginDatetime)
					.local()
					.format('DD-MM-YYYY HH:mm A'),
				endDatetime: moment(event.endDatetime)
					.local()
					.format('DD-MM-YYYY HH:mm A'),
			}));
			setEvents(events);
		}, [state.events]);


		let arrTmp: any[] = [];
    let arrEvent: any[] = [];
  //  CommonUtils.addEvent(events, 0, arrEvent);
		events.map((valEv, ind) => {
			arrTmp.push(valEv);
			if (arrTmp.length === 2) {
				arrEvent.push(arrTmp);
				arrTmp = [];
			}
			if (ind === events.length - 1 && arrTmp.length !== 0) {
				arrTmp.push(events[0]);
        arrEvent.push(arrTmp);
				arrTmp = [];
          
			}
    });
    
    // arrEvent = addEvent(events, 0);

		return (
			<>
        <div className="container">
					<div className="bg-section">
          <h2>Tất cả sự kiện</h2>
						{events.map((val: WinfunEvent, ind) => (
							<ItemEventComponent
								key={ind}
								imageUri={val.imageURI}
								eventName={val.eventName}
								description={val.descriptions}
                dateStart={val.beginDatetime}
                detailLink={val.detailLink}
								dateEnd={val.endDatetime}></ItemEventComponent>
						))}
					</div>
				</div>
			</>
		);
	})
);
