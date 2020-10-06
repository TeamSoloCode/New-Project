import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { REGISTER_NOW_API } from "src/api/API";
import "./register-form-component.css";
export interface IRegisterFormComponentProps {}
export interface IRegisterFormComponentState {
  email: string;
  username: string;
  phoneNumber: number;
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
      phoneNumber: 0,
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
    this.setState({ phoneNumber: Number(e.currentTarget.value) });
  }

  handleChangeUserNameInput(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ username: e.currentTarget.value });
  }
  handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const { email, username, phoneNumber } = this.state;
      const response = await fetch(REGISTER_NOW_API, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name: username, phoneNumber }),
      });

      if (!response) throw new Error("Can't connect to database");
      const data = await response.json();
      if (data.code != 0) throw Error(data.message);

      // handle submit success
    } catch (err) {
      // please handle error here
    }
  };
  public render() {
    return (
      <div className="register_form">
        <div className="mb-5">
          <span>
            <h3>Register</h3>
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
