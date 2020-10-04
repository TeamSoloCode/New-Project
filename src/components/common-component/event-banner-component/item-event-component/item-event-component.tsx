import * as React from 'react';
import './item-event-component.css';
export interface IITemEventComponentProps {
  location: string;
  beginDateTime: string;
  endDateTime: string;
  description: string;
  detailLink: string;
  evenName:string;
  imageUri: string;

}

export default class ITemEventComponent extends React.Component<IITemEventComponentProps> {
  constructor(props: IITemEventComponentProps) {
    super(props);
  }
  public render() {
    const { location,beginDateTime,endDateTime,description,detailLink ,evenName,imageUri} = this.props;
		return (
			<div className="col">
				<div className="col-lg-6 col-md-6 ">
					<div className="single_event position-relative">
						<div className="event_thumb">
							<img src={imageUri} alt="" className="event_img"></img>
						</div>
						<div className="event_details">
							<div className="d-flex mb-4">
								<div className="date">
									<span>15</span> Jun
								</div>

								<div className="time-location">
									<p>
										<span className="ti-time mr-2"></span> {beginDateTime}dasd
									</p>
									<p>
										<span className="ti-time mr-2"></span> {endDateTime}asda
									</p>
									<p>
										<span className="ti-time mr-2"></span> {evenName}
									</p>
									<p>
										<span className="ti-location-pin mr-2"></span> {location}
									</p>
								</div>
							</div>
							<p>{description}</p>

							<a href={detailLink} className="primary-btn rounded-0 mt-3">
								View Details
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
