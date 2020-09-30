import * as React from 'react';
import './App.css';
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
		return <p>New Web</p>;
	}
}

export default App;
