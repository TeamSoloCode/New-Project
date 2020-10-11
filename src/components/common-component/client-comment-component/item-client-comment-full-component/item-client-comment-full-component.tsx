import * as moment from 'moment';
import * as React from 'react';
import './item-client-comment-full-component.css';
export interface IItemClientCommentFullComponentProps {
	userImage: string;
	userName: string;
	content: string;
	createDate: string;
}

export default class ItemClientCommentFullComponent extends React.Component<IItemClientCommentFullComponentProps> {
	constructor(props: IItemClientCommentFullComponentProps) {
		super(props);
	}
	formatDate(date: string) {
		let dateString = date;
		let dateObj = new Date(dateString);
		let momentObj = moment(dateObj) ;
		return momentObj.format('Do MMMM-YYYY HH:mm');
	}
	public render() {
		const { userImage, userName, content, createDate } = this.props;
		console.log(createDate);
		return (
			<div className="col">
				<div className="item">
					<div className="testi_item mr-2">
						<div className="row">
							<div className="col-9 col-md-2 col-lg-1 ">
								<div className="circle-avata d-flex justify-content-center align-items-center">
									<img src={userImage} alt="" className="avata-user"></img>
								</div>
							</div>
							<div className="col">
								<div className="testi_text mt-2 ml-2">
									<h4>{userName}</h4>
									<div>
										<span className="time-cmt">{this.formatDate(createDate)}</span>
									</div>
									<p className="content">{content}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}