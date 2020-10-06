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
// import { Events } from '../components/common-component/event-banner-component/testEvents';
export interface IMainProps {}

export default class Main extends React.Component<IMainProps> {
  constructor(props: IMainProps) {
    super(props);
  }


	public render() {
		return (
			<div>
				<HeaderBar />
				<Switch>
					<Route exact path="/">
						<div className="banner">
							<div className="d-flex justify-content-center align-items-center inner-banner">
								<span className="w-100 text-center ">
									<span>
										<span className="content-banner">BEST ONLINE EDUCATION SERVICE IN THE WORLD</span> <br />
										<h1 className="title-banner">ONE STEP AHEAD THIS SEASON</h1>
									</span>
									<div className="mt-lg-5">
										<a className=" primary-btn2 mr-2">Learn more</a>
										<a className=" primary-btn ">See course</a>
									</div>
								</span>
							</div>
						</div>
						<RegisterComponent></RegisterComponent>
						<IntroduceTrainerComponent></IntroduceTrainerComponent>
						<EventBannerComponent />
						<ClientCommentComponent />
					</Route>
					<Route  path="/detail-user">
						<ProfileExpertIntroduceComponent></ProfileExpertIntroduceComponent>
					</Route>
				</Switch>
				<Footer></Footer>
			</div>
		);
	}
}
