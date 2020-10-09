import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { REGISTER_NOW_API } from "../../../api/API";
import "./register-form-component.css";
export interface IRegisterFormComponentProps {}
export interface IRegisterFormComponentState {
  email: string;
  username: string;
  phoneNumber: string;


}

export default class RegisterFormComponent extends React.Component<
  IRegisterFormComponentProps,
  IRegisterFormComponentState
> {
  constructor(props: IRegisterFormComponentProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      phoneNumber: "",
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
    this.setState({ phoneNumber: e.currentTarget.value });
  }

  handleChangeUserNameInput(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ username: e.currentTarget.value });
  }

  resetState = () => {
    this.setState({ username: "", phoneNumber: "", email: "" });
  }

  handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (this.state.username !== "" && this.state.phoneNumber.length === 9 && this.state.email !== "") {
        try {
					const { email, username, phoneNumber } = this.state;
					const response = await fetch(REGISTER_NOW_API, {
						method: 'POST', // or 'PUT'
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, name: username, phoneNumber }),
					});

					if (!response) throw "Can't connect to database";
					const data = await response.json();
					if (data.code != 0) {
						alert('Email, name, or phone number is existed !!');
					}

					this.resetState();
					// handle submit success
					alert('Register successful!');
				} catch (err) {
					console.log(err);
				}
    } else {
      alert("Please , Enter your information correctly!");
    }
  
  };
  public render() {
    return (
			<div className="register_form">
				<div className="mb-5">
					<span>
						<h3>Đăng ký</h3>
						<p>Nhanh tay đăng ký thời gian có hạn</p>
					</span>
				</div>
				<Form>
					<Form.Group>
						<Form.Control
							type="email"
							value={this.state.email}
							placeholder="Họ tên"
							onChange={this.handleChangeEmailInput}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Control
							type="text"
							value={this.state.username}
							placeholder="Số điện thoại"
							onChange={this.handleChangeUserNameInput}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Control
							type="text"
							value={this.state.phoneNumber}
							placeholder="Địa chỉ Email"
							onChange={this.handleChangePhoneNumberInput}
						/>
					</Form.Group>

					<Button variant="primary" onClick={this.handleSubmit} className="btn primary-btn">
						Đăng ký
					</Button>
        </Form>
        

			</div>
		);
  }
}
