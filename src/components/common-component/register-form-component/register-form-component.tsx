import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import './register-form-component.css';
export interface IRegisterFormComponentProps {}
export interface IRegisterFormComponentState {
  email: string;
  username: string;
}


export default class RegisterFormComponent extends React.Component<IRegisterFormComponentProps, IRegisterFormComponentState> {
	constructor(props: IRegisterFormComponentProps) {
		super(props);
		this.state = {
			email: '',
			username: '',
		};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmailInput = this.handleChangeEmailInput.bind(this);
    this.handleChangeUserNameInput = this.handleChangeUserNameInput.bind(this);
	}
	handleChangeEmailInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ email: e.currentTarget.value });
	}

	handleChangeUserNameInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({username: e.currentTarget.value });
	}
	handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    
    // handle register 
	}
  public render() {
    
		return (
			<div className="register_form">
				<div className="mb-5">
					<span>
						<h3>Courses for Free</h3>
						It is high time for learning
					</span>
				</div>
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Control type="email" placeholder="Enter email" onChange={this.handleChangeEmailInput} />
					</Form.Group>

					<Form.Group controlId="formBasicPhoneNumber">
            <Form.Control type="text" placeholder="Enter username" onChange={this.handleChangeUserNameInput}/>
					</Form.Group>

					<Button variant="primary" onClick={this.handleSubmit} className="btn primary-btn">
						Register
					</Button>
				</Form>
			</div>
		);
	}
}
