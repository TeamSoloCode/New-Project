import * as React from 'react';
import { Card } from 'react-bootstrap';
import './item-our-advantage-component.css';
export interface IItemOurAdvantageComponentProps {
  imageHead: string;
	title: string;
	description: string;
}

export default class ItemOurAdvantageComponent extends React.Component<IItemOurAdvantageComponentProps> {
	constructor(props: IItemOurAdvantageComponentProps) {
		super(props);
	}
	public render() {
		const { title, description,imageHead } = this.props;
		return (
			<div  className="item-our-advantage col-lg-4 col-md-6 mt-2">
				<Card className="h-card">
					<div className="thump">
						<Card.Img className="img-our-advantage1" variant="top" src={imageHead} />
					</div>
					<Card.Body className="bg-body">
            <Card.Title className="title-body">{title}</Card.Title>
						<Card.Text>{description}</Card.Text>
						{/* <Button variant="primary">Go somewhere</Button> */}
					</Card.Body>
				</Card>
				{/* <div className="single_course">
					<div className="course_head">
						<img className="img-fluid" src={imageHead} alt="" />
					</div>
					<div className="course_content mt-4">
						<h4 className="mb-3">
							<a href="course-details.html">{title}</a>
						</h4>
						<p>{description}</p>
						<div className="course_meta d-flex justify-content-lg-between align-items-lg-center flex-lg-row flex-column mt-4">
							<div className="authr_meta">
								<img src="img/courses/author3.png" alt="" />
								<span className="d-inline-block ml-2">Cameron</span>
							</div>
							<div className="mt-lg-0 mt-3">
								<span className="meta_info mr-4">
									<a href="#">
										{' '}
										<i className="ti-user mr-2"></i>25{' '}
									</a>
								</span>
								<span className="meta_info">
									<a href="#">
										{' '}
										<i className="ti-heart mr-2"></i>35{' '}
									</a>
								</span>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}
