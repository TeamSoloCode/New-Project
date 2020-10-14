import * as React from 'react';
import { preparedImageSrc } from '../../../../utils';
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
			<div className="col item-client-cmmt">
				<div className="item mt-2 mb-2">
					<div className="testi_item-1 mr-2">
						<div className="row">
							<div className="col-3 col-lg-2 col-md-3 ">
								<div className="thump circle-avata1">
									<img src={preparedImageSrc(userImage)} alt="" className="avata-user1"></img>
								</div>
							</div>
							<div className="col col-lg pl-4">
								<div className="testi_text">
									<span className="user-title">{userName}</span>
									<p className="ellipse-custom line-clamp-3" data-toggle="tooltip" title={content}>
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
