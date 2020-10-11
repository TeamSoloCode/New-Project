import * as React from 'react';
import { Button } from 'react-bootstrap';
// import { Card } from 'react-bootstrap';
import './item-event-component.css';
export interface IItemEventComponentProps {
	imageUri: string | undefined;
	eventName: string;
	description: string | undefined;
	dateStart: string;
  dateEnd: string;
  detailLink: string;
}

export default class ItemEventComponent extends React.Component<IItemEventComponentProps> {
	constructor(props: IItemEventComponentProps) {
		super(props);
	}
	public render() {
		const { imageUri, eventName, description, dateStart, dateEnd, detailLink } = this.props;
		return (
			<div className="item-all-event">
				<div className="row">
					<div className="col col-lg-4">
						<div className="thump h-100">
							<img className="img-event h-100" src={imageUri} />
						</div>
					</div>
					<div className="col col-lg-8 col-md-7">
						<div className="pt-4 pb-2 pl-2 pr-2">
							<h4>Tên sự kiện: {eventName}</h4>
							<p className="ellipse-custom-description mt-3">
								<strong>Nội dung : </strong>
								{description}
							</p>
							<p>
								<strong>Thời gian bắt đầu: </strong>
								{dateStart}
							</p>
							<p>
								<strong>Thời gian kết thúc:</strong> {dateEnd}
							</p>
							<div className="w-100 d-flex align-items-end justify-content-end position-relative bg-btn-detail">
								{/* <button className="primary-btn2 " onClick={() => (window.location.href = detailLink)}>
									Chi tiết
								</button> */}
								<Button
									className="btn-detail"
									onClick={() => (window.location.href = detailLink)}
									variant="outline-info">
									Chi tiết
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
