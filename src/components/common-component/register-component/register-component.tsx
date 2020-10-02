import * as React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import RegisterFormComponent from '../register-form-component/register-form-component';
// import TimeCountDownComponent from '../time-count-down-component/time-count-down-component';
import './register-component.css';
export interface IRegisterComponentProps {}

export default class RegisterComponent extends React.Component<IRegisterComponentProps> {
	public render() {
		return (
			<Jumbotron className="registration_area">
				<Container>
					<div className="row">
						<div className="col-lg-8">
							<div className="register-info">
              {/* <TimeCountDownComponent></TimeCountDownComponent> */}
              </div>
              </div>
						<div className="col">
							<RegisterFormComponent></RegisterFormComponent>
						</div>
					</div>
				</Container>
			</Jumbotron>
		);
	}
}
