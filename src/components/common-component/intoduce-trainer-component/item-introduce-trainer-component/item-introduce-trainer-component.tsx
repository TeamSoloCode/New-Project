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
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
  onRedirectToDetailExpert() {
    
  }
	public render() {
		const { imageSrc,name,position,overview } = this.props;
    const { changeIconFb, changeIconLinkedIn, changeIconTwitter, changeIconPinteres } = this.state;
    const backgroundAvata = {
			backgroundImage: 'url(' + imageSrc + ')',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
		};
		return (
			<div className="col-lg-3 col-md-6 col-sm-12 single-trainer">
				<div className="item-single-trainer">
					<a href="/detail-user" target="_blank" className="text-underline-none text-black">
						<div className="thumb d-flex justify-content-sm-center" style={backgroundAvata}>
							<img src={''} className="img-fluid" />
						</div>
						<div className="meta-text text-sm-center">
							<h4 className="text-underline-none">{name}</h4>

							<p className="text-underline-none">{position}</p>
							<div className="mb-4">
								<OverlayTrigger placement={'bottom'} overlay={<Tooltip>{overview}</Tooltip>}>
									<p className="text-underline-none ellipse-custom-trainer ">{overview}</p>
								</OverlayTrigger>
							</div>
							<div className="social-group d-flex justify-content-center align-items-center">
								<a href="https://www.facebook.com/" target="_blank">
									<img
										src={!changeIconFb ? facebookIcon : facebookBlueIcon}
										id="fbSocial"
										className="icon-social"
										onMouseOver={this.changeColorSocial}
										onMouseLeave={this.disChangeColorSocial}
									/>
								</a>
								<a href="https://www.linkedin.com/login" target="_blank">
									<img
										src={!changeIconLinkedIn ? linkedinIcon : linkedinBlueIcon}
										id="linkedInSocial"
										className="icon-social"
										onMouseOver={this.changeColorSocial}
										onMouseLeave={this.disChangeColorSocial}
									/>
								</a>
								<a href="https://twitter.com/?lang=vi" target="_blank">
									<img
										src={!changeIconTwitter ? twitterIcon : twitterBlueIcon}
										id="twitterSocial"
										className="icon-social"
										onMouseOver={this.changeColorSocial}
										onMouseLeave={this.disChangeColorSocial}
									/>
								</a>
								<a href="https://www.pinterest.com/" target="_blank">
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
					</a>
				</div>
			</div>
		);
	}
}
