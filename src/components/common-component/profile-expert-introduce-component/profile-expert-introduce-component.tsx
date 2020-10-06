import * as React from 'react';
import './profile-expert-introduce-component.css';
import user1 from '../../../assets/images/trainer/user1.png';
export interface IProfileExpertIntroduceComponentProps {
}

export default class ProfileExpertIntroduceComponent extends React.Component<IProfileExpertIntroduceComponentProps> {
  public render() {
    return (
			<div>
				<div className="container bg d-flex align-items-center">
					<div className="row">
						<div className="col">
							<div>
								<img src={user1} className="image-avata" />
							</div>
							<p className="qodef-m-text" style={{ color: '#f15b43' }}>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
							</p>
						</div>
						<div className="col">
							<h5 className="qodef-m-subtitle">CEO of Hope </h5>
							<h2 className="qodef-m-title">Elena Jackson </h2>
							<p className="qodef-m-text">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
								ex ea commodo consequat.
							</p>
							<div className="wpb_text_column wpb_content_element ">
								<div className="wpb_wrapper">
									<p>
										Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
										pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
										anim id est laborum.
									</p>
								</div>
							</div>
							<h3>
								<span>Contact details</span>
							</h3>
							<div className="row">
								<div className="col">
									<p>Phone number: </p>
									<p>Email: </p>
									<br />
									<br />
									<p>Birthday:</p>
									<p>Location:</p>
									<p>Experience:</p>
								</div>
								<div className="col">
									<p>+ 0110 554 1234</p>
									<p>elena@hope.com</p>
									<br />
									<br />
									<p>September 20, 1986</p>
									<p>Sao Paolo</p>
									<p>
										PQASSO Programme Head of Volunteering Circle Coordinator Head of Fundraising Events Manager
										Investment Manager Volunteering Manager
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
