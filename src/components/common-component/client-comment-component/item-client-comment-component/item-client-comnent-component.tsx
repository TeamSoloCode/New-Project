import * as React from 'react';
import './item-client-comment-component.css';
import t1 from '../../../../assets/images/banner/t1.jpg';
export interface IItemClientCommentComponentProps {
}

export default class ItemClientCommentComponent extends React.Component<IItemClientCommentComponentProps> {
  public render() {
    return (
			<div className="col">
				<div className="item">
					<div className="testi_item  m-2">
						<div className="row">
							<div className="col-lg-4 col-md-6 ">
								<img src={t1} alt=""></img>
							</div>
							<div className="col-lg-8">
								<div className="testi_text">
									<h4>Elite Martin</h4>
									<p>
										Him, made can't called over won't there on divide there male fish beast own his day third seed sixth
										seas unto. Saw from
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
