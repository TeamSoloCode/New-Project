import * as React from 'react';
import './App.css';
import Main from './pages/main';
import * as moment from 'moment'
import { getDataFromLocalStorage, setDataToLocalStorage } from './utils';
import { LocalStorageKeys, COUNTDOWN_TIME_AS_HOURS } from './constants';
// import { Route } from 'react-router-dom';
// import SelectedNowHomeComponent from 'src/pages/selected-now-home/SelectedNowHome';

// const SelectedNowHome = ({ match }: any) => (
//   <SelectedNowHomeComponent nowhomeId={match.params.id} />
// );
class App extends React.Component<any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		/** only set page loaded time of there is no loadPageAt in local storage or expired */
		const loadedTime = getDataFromLocalStorage(LocalStorageKeys.LOAD_PAGE_AT)
		const isExpired = moment(loadedTime).add(COUNTDOWN_TIME_AS_HOURS, 'hours') <= moment()
		if(!loadedTime || isExpired) setDataToLocalStorage(LocalStorageKeys.LOAD_PAGE_AT, moment().format("MM-DD-YYYY HH:mm:ss"))
	}

	render() {
		return <Main/>
	}
}

export default App;
