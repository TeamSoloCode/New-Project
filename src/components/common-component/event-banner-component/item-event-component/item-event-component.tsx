import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import * as moment from 'moment';
import * as React from 'react';
import './item-event-component.css';
import { preparedImageSrc } from '../../../../utils';
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
    this.redirectToDetailView = this.redirectToDetailView.bind(this);
	}

	getDate(date: string) {
		let dateString = date;
		let dateObj = new Date(dateString);
		let momentObj = moment(dateObj);
		return momentObj.format('DD');
  } 
  
  convertUTCDate(date: string) {
    	let dateString = date;
			let dateObj = new Date(dateString);
			let momentObj = moment(dateObj);
			return momentObj.format('DD MMMM YYYY HH:MM A');
  }

	getMonth(date: string) {
		let dateString = date;
		let dateObj = new Date(dateString);
		let momentObj = moment(dateObj);
		return momentObj.format('MMM');
  }
  redirectToDetailView(url: string) {
    window.open(url, '_blank');
  }
	public render() {
    const { location, beginDateTime, endDateTime, description, detailLink, evenName, imageUri } = this.props;
  const backgroundEvent = {
		backgroundImage: 'url(' + preparedImageSrc(imageUri) + ')',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	};
		return (
			<div className="col col-lg-6 col-md">
				<div className="single_event position-relative">
					<div className="event_thumb" style={backgroundEvent}>
						<div  className="event_img"></div>
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
										<div className="d-flex justify-content-center align-items-center ">|</div>
										<span>{this.getDate(endDateTime)}</span>
										{this.getMonth(endDateTime)}
									</>
								)}
							</div>

							<div className="time-location ml-2">
								<p>
									<FontAwesomeIcon className="mr-2" icon={faClock} />

									<span className="ti-time mr-2">
										{beginDateTime ? 'Từ: ' + this.convertUTCDate(beginDateTime) : ''}
									</span>
								</p>
								<p>
									<FontAwesomeIcon className="mr-2" icon={faClock} />
									<span className="ti-time mr-2">{endDateTime ? 'Đến: ' + this.convertUTCDate(endDateTime) : ''}</span>
								</p>

								<p>
									<FontAwesomeIcon className="mr-2" icon="map-marker-alt" />
									<span className="ti-location-pin mr-2 ">{location}</span>
								</p>
							</div>
						</div>
							
								<h4 className=" event-name mr-2 text-white">{evenName}</h4>
						<p className="ellipse-custom content-ev" data-toggle="tooltip" title={description}>
              <strong>Nội dung :</strong>{description}
						</p>

						<a
							target="_blank"
							style={{ color: 'black' }}
							className="primary-btn rounded-0 mt-3 btn-view-detail"
							onClick={() => this.redirectToDetailView(detailLink)}>
							Chi tiết
						</a>
					</div>
				</div>
			</div>
		);
	}
}
