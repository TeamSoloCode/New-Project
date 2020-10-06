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
	public render() {
    const { userImage, userName, content, createDate } = this.props;
    console.log(createDate);
		return (
			<div className="col">
				<div className="item">
					<div className="testi_item mr-2">
						<div className="row">
							<div className="col-4 col-lg-4 col-md-6 ">
								<img src={userImage} alt="" className="avata-user"></img>
							</div>
							<div className="col col-lg-8">
								<div className="testi_text">
									<h4>{userName}</h4>
                  <p className="content">{content}</p>
                  <div>
                    <span>{createDate}</span>
                  </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
