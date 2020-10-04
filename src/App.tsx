import * as React from 'react';
import './App.css';
import Main from './pages/main';
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

	componentWillMount() {}

	render() {
		return <Main/>
	}
}

export default App;
