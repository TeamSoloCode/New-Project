import * as moment from 'moment';
import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FETCH_ALL_EVENT_API } from '../../../api/API';
import { WinfunEvent } from '../../../models/WinfunEvent';
// import { events } from '../../../data-test/data-test';
import './event-banner-component.css';
import ITemEventComponent from './item-event-component/item-event-component';
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

export const EventBannerComponent = withRouter(
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
				createdDate: moment(event.createdDate)
					.local()
					.format('YYYY-MM-DD HH:mm'),
			}));
			setEvents(events);
		}, [state.events]);

		let arrTmp: any[] = [];
		let arrEvent: any[] = [];
		events.map((valEv, ind) => {
			arrTmp.push(valEv);
			if (arrTmp.length === 2) {
				arrEvent.push(arrTmp);
				arrTmp = [];
			}
			if (ind === events.length - 1) {
				arrEvent.push(arrTmp);
				arrTmp = [];
			}
		});

		return (
			<>
				<div className="jumbotron events_area">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-5">
								<div className="main_title text-white">
									<h2 className="mb-3 ">Upcoming Events</h2>
									<p>Replenish man have thing gathering lights yielding shall you</p>
								</div>
							</div>
						</div>
						<div className="row justify-content-center">
							<Carousel>
								{arrEvent.map((valueEvent, indexEvent) => (
									<Carousel.Item key={indexEvent}>
										<div className="container">
											<div className="row">
												{valueEvent.map((vl: WinfunEvent, ind: number) => (
													<ITemEventComponent
														key={ind}
														location={vl.location}
														beginDateTime={vl.beginDatetime}
														endDateTime={vl.endDatetime}
														description={vl.descriptions}
														detailLink={vl.detailLink}
														evenName={vl.eventName}
														imageUri={vl.imageURI}></ITemEventComponent>
												))}
											</div>
										</div>
									</Carousel.Item>
								))}
							</Carousel>
						</div>
					</div>
				</div>
			</>
		);
	})
);
