import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import './client-comment-component.css';
import ItemClientCommentComponent from './item-client-comment-component/item-client-comnent-component';
export interface IClientCommentComponentProps {
}

export default class ClientCommentComponent extends React.Component<IClientCommentComponentProps> {
  public render() {
    return (
			<div className="jumbotron bg-white">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-5">
							<div className="main_title">
								<h2 className="mb-3">Client say about me</h2>
								<p>Replenish man have thing gathering lights yielding shall you</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="row">
						<div className="testi_slider owl-carousel owl-loaded owl-drag">
							<div className="owl-stage-outer">
								<Carousel>
									<Carousel.Item>
										<div className="row ">
											<ItemClientCommentComponent></ItemClientCommentComponent>
											<ItemClientCommentComponent></ItemClientCommentComponent>
											<ItemClientCommentComponent></ItemClientCommentComponent>
										</div>
									</Carousel.Item>
									<Carousel.Item>
										<div className="row ">
											<ItemClientCommentComponent></ItemClientCommentComponent>
											<ItemClientCommentComponent></ItemClientCommentComponent>
										</div>
									</Carousel.Item>
								</Carousel>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
  }
}
