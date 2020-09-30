import * as React from 'react';
import HeaderBar from '../components/common-component/header-bar/header-bar';
import "./main.css";
export interface IMainProps {
}

export default class Main extends React.Component<IMainProps> {

	public render() {
		return (
			<div>
				<HeaderBar />
				<div className="banner">
					<div className="d-flex justify-content-center align-items-center h-100">
						<span className="w-100 text-center">
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
			</div>
		);
	}
}



