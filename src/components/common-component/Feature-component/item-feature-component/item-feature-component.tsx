import * as React from 'react';
import './item-feature-component.css';
export interface IItemFeatureComponentProps {
  image: string;
  title: string;
  description: string;
}

export default class ItemFeatureComponent extends React.Component<IItemFeatureComponentProps> {
  constructor(props: IItemFeatureComponentProps) {
    super(props);
  }
  public render() {
    const { title, description, image } = this.props;
    return (
			<div className="col-lg-4 col-md-6">
				<div className="single_feature">
					<div className="icon">
						<img src={image} className="img-feature" />
					</div>
					<div className="desc">
						<h4 className="mt-3 mb-2 title-feature">{title}</h4>
						<p>{description}</p>
					</div>
				</div>
			</div>
		);
  }
}
