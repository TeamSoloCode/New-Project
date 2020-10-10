import * as React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { REGISTER_NOW_API } from '../../../api/API';
import './register-form-component.css';
export interface IRegisterFormComponentProps {}
export interface IRegisterFormComponentState {
	email: string;
	username: string;
	phoneNumber: string;
	errorEmail: string;
	errorPhone: string;
	errorForm: string;
	errorUserName: string;
	showModal: boolean;
}
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex: RegExp = /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;

export default class RegisterFormComponent extends React.Component<
	IRegisterFormComponentProps,
	IRegisterFormComponentState
> {
	constructor(props: IRegisterFormComponentProps) {
		super(props);
		this.state = {
			email: '',
			username: '',
			phoneNumber: '',
			errorEmail: '',
			errorPhone: '',
			errorForm: '',
			errorUserName: '',
			showModal: false,
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeEmailInput = this.handleChangeEmailInput.bind(this);
		this.handleChangeUserNameInput = this.handleChangeUserNameInput.bind(this);
		this.handleChangePhoneNumberInput = this.handleChangePhoneNumberInput.bind(this);
	}

	handleClose() {
		this.setState({ showModal: false });
	}
	handleShow() {
		this.setState({ showModal: true });
	}
	handleChangeEmailInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ email: e.currentTarget.value });
		// if (!emailRegex.test(this.state.email)) {
		// 	this.setState({ errorEmail: 'Email không đúng định dạng !' });
		// } else {
		// 	this.setState({ errorEmail: '' });
		// }
	}

	handleChangePhoneNumberInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ phoneNumber: e.currentTarget.value });
		// console.log(this.state.phoneNumber);
		// if (!phoneRegex.test(this.state.phoneNumber)) {
		// 	this.setState({ errorPhone: 'Số điện thoại chưa đúng định dạng !' });
		// } else if (!phoneRegex.test(this.state.phoneNumber) && this.state.phoneNumber.length == 9) {
		// 	this.setState({ errorPhone: '' });
		// } else {
		// 	this.setState({ errorPhone: '' });
		// }
	}

	handleChangeUserNameInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value });
		// if (this.state.username === '') {
		// 	this.setState({ errorUserName: 'Họ tên không được để trống' });
		// } else {
		// 	this.setState({ errorUserName: '' });
		// }
	}

	resetState = () => {
		this.setState({ username: '', phoneNumber: '', email: '' });
	};

	handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({ errorEmail: '', errorPhone: '', errorUserName: '' });

		e.preventDefault();
		if (this.state.username !== '' && this.state.email !== '' && this.state.phoneNumber !== '') {
			if (!emailRegex.test(this.state.email)) {
				this.setState({ errorEmail: 'Email không đúng định dạng !' });
			}
			if (!phoneRegex.test(this.state.phoneNumber)) {
				this.setState({ errorPhone: 'Số điện thoại chưa đúng định dạng !' });
			}
			if (emailRegex.test(this.state.email) && phoneRegex.test(this.state.phoneNumber)) {
				console.log('Asdasdasdasd');
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
						return;
					}
					this.resetState();
					// handle submit success
					this.setState({ errorEmail: '', errorPhone: '', username: '' });
					this.handleShow();
				} catch (err) {
					console.log(err);
				}
			}
		} else {
			console.log('error');
			if (this.state.username === '') {
				this.setState({ errorUserName: 'Họ tên không được để trống !' });
			}
			if (this.state.phoneNumber.length === 0) {
				this.setState({ errorPhone: 'Số điện thoại không được để trống !' });
			}
			if (this.state.email === '') {
				this.setState({ errorEmail: 'Email không được để trống !' });
			}
		}
	};
	public render() {
		const { email, username, phoneNumber, errorEmail, errorPhone, errorUserName, showModal } = this.state;
		return (
			<>
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
								type="name"
								value={username}
								placeholder="Họ tên"
								onChange={this.handleChangeUserNameInput}
								isInvalid={errorUserName.length != 0}
							/>
							<Form.Control.Feedback type="invalid">{errorUserName}</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Control
								type="text"
								value={phoneNumber}
								placeholder="Số điện thoại"
								onChange={this.handleChangePhoneNumberInput}
								isInvalid={errorPhone.length != 0}
							/>

							<Form.Control.Feedback type="invalid">{errorPhone}</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Control
								type="text"
								value={email}
								placeholder="Địa chỉ Email"
								onChange={this.handleChangeEmailInput}
								isInvalid={errorEmail.length != 0}
							/>
							<Form.Control.Feedback type="invalid">{errorEmail}</Form.Control.Feedback>
						</Form.Group>

						<Button variant="primary" onClick={this.handleSubmit} className="btn primary-btn">
							Đăng ký
						</Button>
					</Form>
					<Modal size="sm" show={showModal} onHide={this.handleClose} backdrop="static" keyboard={false}>
						<Modal.Header closeButton>
							<Modal.Title>Thông báo</Modal.Title>
						</Modal.Header>
						<Modal.Body>Bạn đã đăng ký thành công !</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={this.handleClose}>
								Đóng
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</>
		);
	}
}
