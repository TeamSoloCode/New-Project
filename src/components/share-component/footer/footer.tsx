import * as React from 'react';
import { Form } from 'react-bootstrap';
import './footer.css';
export interface IFooterProps {}

export default class Footer extends React.Component<IFooterProps> {
	public render() {
		return (
			<div className="jumbotron-fluid footer-area footer">
				<div className="container">
					<div className="row">
						<div className="col">
							<ul>
								<li>
									<strong>Top Products</strong>
								</li>
								<li>
									<strong>Managed Website</strong>
								</li>
								<li>
									<strong>Power Tools</strong>
								</li>
								<li>
									<strong>Marketing Service</strong>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<strong>Top Products</strong>
								</li>
								<li>
									<strong>Managed Website</strong>
								</li>
								<li>
									<strong>Power Tools</strong>
								</li>
								<li>
									<strong>Marketing Service</strong>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<strong>Top Products</strong>
								</li>
								<li>
									<strong>Managed Website</strong>
								</li>
								<li>
									<strong>Power Tools</strong>
								</li>
								<li>
									<strong>Marketing Service</strong>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<strong>Top Products</strong>
								</li>
								<li>
									<strong>Managed Website</strong>
								</li>
								<li>
									<strong>Power Tools</strong>
								</li>
								<li>
									<strong>Marketing Service</strong>
								</li>
							</ul>
						</div>
						<div className="col">
							<ul>
								<li>
									<strong>Top Products</strong>
								</li>
                <li>
                  <div className="d-flex justify-content-center">
                    <Form.Control type="email" placeholder="Enter email" />
                    <button className="ft-register-btn">register</button>

                  </div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
