import * as moment from 'moment';
import * as React from 'react';
import './item-event-component.css';
export interface IITemEventComponentProps {
	location: string;
	beginDateTime: string;
	endDateTime: string;
	description: string | undefined;
	detailLink: string;
	evenName: string;
	imageUri: string | undefined;
}

export default class ITemEventComponent extends React.Component<IITemEventComponentProps> {
	constructor(props: IITemEventComponentProps) {
		super(props);
	}

	getDate(date: string) {
		let dateString = date;
		let dateObj = new Date(dateString);
		let momentObj = moment(dateObj);
		return momentObj.format('DD');
	}

	getMonth(date: string) {
		let dateString = date;
		let dateObj = new Date(dateString);
		let momentObj = moment(dateObj);
		return momentObj.format('MMM');
	}
	public render() {
    const { location, beginDateTime, endDateTime, description, detailLink, evenName, imageUri } = this.props;
    console.log(this.getDate(beginDateTime) + "--" + this.getMonth(beginDateTime));
		return (
				<div className="col-lg-6 col-md-6 ">
					<div className="single_event position-relative">
						<div className="event_thumb">
							<img src={imageUri} alt="" className="event_img"></img>
						</div>
						<div className="event_details">
							<div className="d-flex mb-4">
								<div className="date">
									<span>{this.getDate(beginDateTime)}</span>
									{this.getMonth(beginDateTime)}
									{this.getDate(beginDateTime) === this.getDate(endDateTime) &&
									this.getMonth(beginDateTime) === this.getMonth(endDateTime) ? (
										''
									) : (
										<>
											<p className="text-center">|</p>
											<span>{this.getDate(endDateTime)}</span>
											{this.getMonth(endDateTime)}
										</>
									)}
								</div>

								<div className="time-location ml-2">
									<p>
										<span className="ti-time mr-2">{beginDateTime ? 'Từ: ' + beginDateTime : ''}</span>
									</p>
									<p>
										<span className="ti-time mr-2">{endDateTime ? 'Đến: ' + endDateTime : ''}</span>
									</p>
									<p>
										<span className=" event-name mr-2 ">{'Tên sự kiện: ' + evenName}</span>
									</p>
									<p>
										<span className="ti-location-pin mr-2 ">{location}</span>
									</p>
								</div>
							</div>
							<p className="ellipse-custom">{'Nội dung: ' + description}</p>

							<a href={detailLink} className="primary-btn rounded-0 mt-3">
								View Details
							</a>
						</div>
					</div>
				</div>
		);
	}
}
