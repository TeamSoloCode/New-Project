import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import Events from 'src/models/Events';
import { events } from '../../../data-test/data-test';
import './event-banner-component.css';
import ITemEventComponent from './item-event-component/item-event-component';
export interface IEventBannerComponentProps {}
export interface IEventBannerComponentState {}

export default class EventBannerComponent extends React.Component<
	IEventBannerComponentProps,
	IEventBannerComponentState
> {
	constructor(props: IEventBannerComponentProps) {
		super(props);
	}
	public render() {
    let arrTmp: any[] = [];
		let arrEvent: any[] = [];
    events.data.map((valEv,ind) => {
			arrTmp.push(valEv);
			if (arrTmp.length === 2 ) {
				arrEvent.push(arrTmp);
        arrTmp = [];
      } 
      if (ind === (events.data.length -1) ) {
        arrEvent.push(arrTmp);
        arrTmp = [];
      }
      console.log(arrTmp);
    });
    console.log(arrEvent);
		return (
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
										<div className="row ">
											{valueEvent.map((vl: Events, ind: number) => (
                        <ITemEventComponent key={ind}
                          location={vl.location}
                          beginDateTime={vl.beginDateTime}
                          endDateTime={vl.endDateTime}
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
		);
	}
}
