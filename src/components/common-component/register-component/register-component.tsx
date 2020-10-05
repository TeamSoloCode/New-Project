import * as React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { LocalStorageKeys, COUNTDOWN_TIME_AS_HOURS } from '../../../constants';
import { getDataFromLocalStorage } from '../../../utils';
import RegisterFormComponent from '../register-form-component/register-form-component';
import * as moment from 'moment';
// import TimeCountDownComponent from '../time-count-down-component/time-count-down-component';
import './register-component.css';
export interface IRegisterComponentProps {}

export default React.memo((props: IRegisterComponentProps) => {
	const [days, setDay] = React.useState(0);
	const [hours, setHours] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);

	React.useEffect(() => {
		let intervalId: any = undefined;
		const loadPageTime = getDataFromLocalStorage(LocalStorageKeys.LOAD_PAGE_AT);
		const endTime = moment(loadPageTime).add(COUNTDOWN_TIME_AS_HOURS, 'hours');
		intervalId = setInterval(() => {
			const now = moment();
			const duration = moment.duration(now.diff(endTime));
			setDay(parseInt(`${duration.days()}`) >= 0 ? 0 : Math.abs(duration.days()));
			setHours(parseInt(`${duration.hours()}`) >= 0 ? 0 : Math.abs(duration.hours()));
			setMinutes(parseInt(`${duration.minutes()}`) >= 0 ? 0 : Math.abs(duration.minutes()));
			setSeconds(parseInt(`${duration.seconds()}`) >= 0 ? 0 : Math.abs(duration.seconds()));
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			{/* {`${days} ${hours} ${minutes} ${seconds}`} */}
			<Jumbotron className="registration_area">
				<Container>
					<div className="row">
						<div className="col-lg-8">
							<div>
								<h2 className="text-white">Đăng ký ngay</h2>
								<span className="text-white">
									There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope.
									It’s exciting to think about setting up your own viewing station.
								</span>
              </div>
              <br/>
							<div className=" d-flex">
								{/* <div className="register-info"><TimeCountDownComponent/></div> */}
								<div className="date-col">{days} Days</div>
								<div className="date-col">{hours} Hours</div>
								<div className="date-col">{minutes} Minutes</div>
								<div className="date-col">{seconds} Seconds</div>
							</div>
						</div>
						<div className="col">
							<RegisterFormComponent />
						</div>
					</div>
				</Container>
			</Jumbotron>
		</>
	);
});
