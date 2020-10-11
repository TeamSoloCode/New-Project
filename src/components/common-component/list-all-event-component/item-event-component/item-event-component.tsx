import * as React from 'react';
// import { Card } from 'react-bootstrap';
import './item-event-component.css';
export interface IItemEventComponentProps {
	imageUri: string | undefined;
	eventName: string;
	description: string | undefined;
	dateStart: string;
	dateEnd: string;
}

export default class ItemEventComponent extends React.Component<IItemEventComponentProps> {
	constructor(props: IItemEventComponentProps) {
		super(props);
	}
	public render() {
		const { imageUri, eventName, description, dateStart, dateEnd } = this.props;
		return (
			<div className="item-all-event">
				<div className="row">
					<div className="col col-lg-4">
						<div className="thump">
							<img className="img-event" src={imageUri} />
						</div>
					</div>
					<div className="col col-lg-8 col-md-7">
						<div className="pt-4 pb-4 pl-2 pr-2">
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
						</div>
					</div>
				</div>
			
			</div>
		);
	}
}
