import * as React from 'react';
import './item-client-comment-component.css';
export interface IItemClientCommentComponentProps {
  userImage: string;
  userName: string;
  content: string
}

export default class ItemClientCommentComponent extends React.Component<IItemClientCommentComponentProps> {
  constructor(props: IItemClientCommentComponentProps) {
    super(props);
  }
  public render() {
    const { userImage,userName,content } = this.props;
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
									<p className="ellipse-custom" data-toggle="tooltip" title={content}>
										{content}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
  }
}
