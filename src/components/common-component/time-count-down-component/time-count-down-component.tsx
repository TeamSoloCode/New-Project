import * as React from 'react';

export interface ITimeCountDownComponentProps {}

export interface ITimeCountDownComponentState {}

export default class TimeCountDownComponent extends React.Component<
	ITimeCountDownComponentProps,
	ITimeCountDownComponentState
> {
	constructor(props: ITimeCountDownComponentProps) {
		super(props);
		this.state = {
			countdown: [
				{
					unit: 'days',
					value: '',
				},
				{
					unit: 'hours',
					value: '',
				},
				{
					unit: 'mins',
					value: '',
				},
				{
					unit: 'secs',
					value: '',
				},
			],
			dateInput: '',
			timeInput: '',
			ampm: 'am',
			modalStyle: { display: 'none' },
			countdownStyle: { display: 'none' },
			infoMessage: '',
			infoStyle: { display: 'none' },
			errorMessage: '',
			errorStyle: { display: 'none' },
		};
	}

	render() {
		return (
			<div className="body">
				<main>
					{/* SETTINGS MODAL */}
					<div className="modal" id="modal">
						<div className="modal-content">
							<div className="modal-header">Set New Countdown</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label htmlFor="date-input">Date</label>
										<input type="text" name="dateInput" placeholder="MM-DD-YYYY" id="date-input" value="1/1/1" required />
									</div>
									<div className="form-group">
										<label htmlFor="time-input">Time</label>
										<input type="text" name="timeInput" placeholder="hh:mm" id="time-input" required />
									</div>
									<div className="form-group">
										<label htmlFor="ampm-input">AM/PM</label>
										<div className="select-wrapper">
											<select name="ampm" id="ampm-input">
												<option value="am">AM</option>
												<option value="pm">PM</option>
											</select>
										</div>
									</div>
									{/* ERROR MESSAGE */}
									<p className="message error-message">
										<span className="fa fa-exclamation-circle fa-lg fa-fw"></span>
									</p>
									<div className="button-group">
										<input type="submit" className="button modal-button" value="Start" />
										<input type="button" className="button modal-button" value="Cancel" />
									</div>
								</form>
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}
