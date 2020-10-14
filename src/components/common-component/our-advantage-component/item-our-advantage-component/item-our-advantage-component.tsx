import * as React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { preparedImageSrc } from '../../../../utils';
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
			<div className="item-our-advantage col-lg-4 col-md-6 mt-2">
				<Card className="h-card">
					<div className="thump">
						<Card.Img className="img-our-advantage" variant="top" src={preparedImageSrc(imageHead)} />
					</div>
					<Card.Body className="bg-body">
						<Card.Title className="title-body">{title}</Card.Title>
						<OverlayTrigger
							placement={'bottom'}
							overlay={
								<Tooltip>
								{description}
								</Tooltip>
							}>
							<Card.Text className="ellipse-custom-benefit">{description}</Card.Text>
						</OverlayTrigger>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
