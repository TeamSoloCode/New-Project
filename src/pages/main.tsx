import * as React from 'react';
import Footer from '../components/share-component/footer/footer';
import RegisterComponent from '../components/common-component/register-component/register-component';
import HeaderBar from '../components/share-component/header-bar/header-bar';

import './main.css';
import IntroduceTrainerComponent from '../components/common-component/intoduce-trainer-component/introduce-trainer-component';
// import EventBannerComponent from '../components/common-component/event-banner-component/event-banner-component';
import { EventBannerComponent } from '../components/common-component/event-banner-component/event-banner-component';
import { ClientCommentComponent } from '../components/common-component/client-comment-component/client-comment-component';
import { Route, Switch } from 'react-router-dom';
import ProfileExpertIntroduceComponent from '../components/common-component/profile-expert-introduce-component/profile-expert-introduce-component';
import { FeatureComponent } from '../components/common-component/Feature-component/feature-component';
import { OurAdvantageComponent } from '../components/common-component/our-advantage-component/our-advantage-component';
import { ListAllEventComponent } from '../components/common-component/list-all-event-component/list-all-event-component';
import { preparedImageSrc } from '../utils';
// import { Events } from '../components/common-component/event-banner-component/testEvents';
export interface IMainProps {}

export default class Main extends React.Component<IMainProps> {
	private featureSection: React.RefObject<HTMLDivElement>;
	private benefitSection: React.RefObject<HTMLDivElement>;
	private registerSection: React.RefObject<HTMLDivElement>;
	private introduceTrainerSection: React.RefObject<HTMLDivElement>;
	private eventSection: React.RefObject<HTMLDivElement>;
  private clientSection: React.RefObject<HTMLDivElement>;
  private contactSection: React.RefObject<HTMLDivElement>

	constructor(props: IMainProps) {
		super(props);
		this.featureSection = React.createRef();
		this.benefitSection = React.createRef();
		this.registerSection = React.createRef();
		this.introduceTrainerSection = React.createRef();
		this.eventSection = React.createRef();
    this.clientSection = React.createRef();
    this.contactSection = React.createRef();
	}
	componentDidUpdate() {
	}
	componentDidCatch() {
	}
	scrollTo(elementName: React.RefObject<HTMLHeadingElement>) {
			if (elementName.current !== null) {
				window.scrollTo({
					behavior: 'smooth',
					top: elementName.current.offsetTop - 90,
				});
				// elementName.current.scrollIntoView({behavior: 'smooth' });
			}
	}
  public render() {
      const backgroundBanner = {
				backgroundImage: 'url(' + preparedImageSrc('banner_custom1.jpg') + ')',
				backgroundPosition: 'center',
				height: '77vh',
				width: '100%',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			};
		return (
			<div>
				<HeaderBar
					trainerSection={this.introduceTrainerSection}
					registerSection={this.registerSection}
					contactSection={this.contactSection}
				/>
				<Switch>
					<Route exact path="/">
						<div style={backgroundBanner}>
							<div className="d-flex justify-content-center align-items-center inner-banner">
								<span className="w-100 text-center ">
									<span>
										<span className="content-banner">
											<strong>KỸ THUẬT VÀ KINH NGHIỆM QUYẾT ĐỊNH NÊN THÀNH BẠI</strong>
										</span>{' '}
										<br />
										<h1 className="title-banner mt-4 mb-5">
											<strong>TỨ TRỤ MVAGROUP CÙNG BẠN TẠO NÊN THÀNH CÔNG</strong>
										</h1>
									</span>
									<div className="mt-lg-5">
										<a className=" primary-btn2 mr-2" onClick={() => this.scrollTo(this.registerSection)}>
											Đăng ký ngay
										</a>
										{/* <a className=" primary-btn ">See course</a> */}
									</div>
								</span>
							</div>
						</div>
						<div ref={this.featureSection}>
							<FeatureComponent />
						</div>
						<div ref={this.benefitSection}>
							<OurAdvantageComponent />
						</div>
						<div ref={this.registerSection}>
							<RegisterComponent></RegisterComponent>
						</div>
						<div ref={this.introduceTrainerSection}>
							<IntroduceTrainerComponent></IntroduceTrainerComponent>
						</div>
						<div ref={this.eventSection}>
							<EventBannerComponent />
						</div>
						<div ref={this.clientSection}>
							<ClientCommentComponent />
						</div>
					</Route>
					<Route path="/detail-user">
						<ProfileExpertIntroduceComponent></ProfileExpertIntroduceComponent>
						<div ref={this.registerSection}>
							<RegisterComponent></RegisterComponent>
						</div>
					</Route>
					<Route path="/all-events">
						<ListAllEventComponent />
						<div ref={this.registerSection}>
							<RegisterComponent></RegisterComponent>
						</div>
					</Route>
					<Route path="/expert">
						<div ref={this.introduceTrainerSection}>
							<IntroduceTrainerComponent></IntroduceTrainerComponent>
						</div>
						<div ref={this.registerSection}>
							<RegisterComponent></RegisterComponent>
						</div>
					</Route>
				</Switch>
				<div ref={this.contactSection}>
					<Footer></Footer>
				</div>
			</div>
		);
	}
}
