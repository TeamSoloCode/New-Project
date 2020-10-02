import * as React from 'react';
import './item-introduce-trainer-component.css';
import facebookIcon from '../../../../assets/images/icons/facebook.png';
import facebookBlueIcon from '../../../../assets/images/icons/facebook_blue.png';

import twitterIcon from '../../../../assets/images/icons/twitter.png';
import twitterBlueIcon from '../../../../assets/images/icons/twitter_blue.png';

import linkedinIcon from '../../../../assets/images/icons/linkedin.png';
import linkedinBlueIcon from '../../../../assets/images/icons/linkedin_blue.png';

import pinterestIcon from '../../../../assets/images/icons/pinterest.png';
import pinterestRedIcon from '../../../../assets/images/icons/pinterest_red.png';

// with import
export interface IItemIntroduceTrainerComponentProps {
  imageSrc: string;
  name: string;
  position: string;
  overview: string;
}

export interface IItemIntroduceTrainerComponentState {
	changeIconFb: boolean;
	changeIconTwitter: boolean;
	changeIconLinkedIn: boolean;
	changeIconPinteres: boolean;
}

export default class ItemIntroduceTrainerComponent extends React.Component<
	IItemIntroduceTrainerComponentProps,
	IItemIntroduceTrainerComponentState
> {
	constructor(props: IItemIntroduceTrainerComponentProps) {
		super(props);
		this.changeColorSocial = this.changeColorSocial.bind(this);
		this.disChangeColorSocial = this.disChangeColorSocial.bind(this);
		this.state = {
			changeIconFb: false,
			changeIconTwitter: false,
			changeIconLinkedIn: false,
			changeIconPinteres: false,
		};
	}
	changeColorSocial(e: any) {
		console.log(e.target.id);
		switch (e.target.id) {
			case 'fbSocial':
				this.setState({ changeIconFb: true });

				break;
			case 'linkedInSocial':
				this.setState({ changeIconLinkedIn: true });

				break;
			case 'twitterSocial':
				this.setState({ changeIconTwitter: true });

				break;
			case 'pinteresSocial':
				this.setState({ changeIconPinteres: true });

				break;
		}
	}
	disChangeColorSocial(e: any) {
		switch (e.target.id) {
			case 'fbSocial':
				this.setState({ changeIconFb: false });

				break;
			case 'linkedInSocial':
				this.setState({ changeIconLinkedIn: false });

				break;
			case 'twitterSocial':
				this.setState({ changeIconTwitter: false });

				break;
			case 'pinteresSocial':
				this.setState({ changeIconPinteres: false });

				break;
		}
	}
	public render() {
		const { imageSrc,name,position,overview } = this.props;
		const { changeIconFb, changeIconLinkedIn,changeIconTwitter,changeIconPinteres } = this.state;
		return (
			<div className="col-lg-3 col-md-6 col-sm-12 single-trainer">
				<div className="item-single-trainer">
					<div className="thumb d-flex justify-content-sm-center">
						<img src={imageSrc} className="img-fluid" />
					</div>
					<div className="meta-text text-sm-center">
            <h4>{name}</h4>
            <p>{position}</p>
						<div className="mb-4">
              <p>{overview}</p>
						</div>
						<div className="social-group">
							<a>
								<img
									src={!changeIconFb ? facebookIcon : facebookBlueIcon}
									id="fbSocial"
									className="icon-social"
									onMouseOver={this.changeColorSocial}
									onMouseLeave={this.disChangeColorSocial}
								/>
							</a>
							<a>
								<img
									src={!changeIconLinkedIn ? linkedinIcon : linkedinBlueIcon}
									id="linkedInSocial"
									className="icon-social"
									onMouseOver={this.changeColorSocial}
									onMouseLeave={this.disChangeColorSocial}
								/>
							</a>
							<a>
								<img
									src={!changeIconTwitter ? twitterIcon : twitterBlueIcon}
									id="twitterSocial"
									className="icon-social"
									onMouseOver={this.changeColorSocial}
									onMouseLeave={this.disChangeColorSocial}
								/>
							</a>
							<a>
								<img
									src={!changeIconPinteres ? pinterestIcon : pinterestRedIcon}
									id="pinteresSocial"
									className="icon-social"
									onMouseOver={this.changeColorSocial}
									onMouseLeave={this.disChangeColorSocial}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
