import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
import './register-form-component.css';
export interface IRegisterFormComponentProps {}
export interface IRegisterFormComponentState {
	email: string;
	username: string;
	phonenumber: number;
}

export default class RegisterFormComponent extends React.Component<
	IRegisterFormComponentProps,
	IRegisterFormComponentState
> {
	constructor(props: IRegisterFormComponentProps) {
		super(props);
		this.state = {
			email: '',
			username: '',
			phonenumber: 0,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeEmailInput = this.handleChangeEmailInput.bind(this);
		this.handleChangeUserNameInput = this.handleChangeUserNameInput.bind(this);
		this.handleChangePhoneNumberInput = this.handleChangePhoneNumberInput.bind(this);
	}
	handleChangeEmailInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ email: e.currentTarget.value });
	}
  handleChangePhoneNumberInput(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ phonenumber: Number(e.currentTarget.value) });
  }

	handleChangeUserNameInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value });
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
						<h3>Đăng ký</h3>
					</span>
				</div>
				<Form>
					<Form.Group>
						<Form.Control type="email" placeholder="Enter email" onChange={this.handleChangeEmailInput} />
					</Form.Group>

					<Form.Group>
						<Form.Control type="text" placeholder="Enter username" onChange={this.handleChangeUserNameInput} />
					</Form.Group>

					<Form.Group>
						<Form.Control type="text" placeholder="Enter phone number" onChange={this.handleChangePhoneNumberInput} />
					</Form.Group>

					<Button variant="primary" onClick={this.handleSubmit} className="btn primary-btn">
						Register
					</Button>
				</Form>
			</div>
		);
	}
}
