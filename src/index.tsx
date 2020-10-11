import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/Store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import './index.css';

import registerServiceWorker from './registerServiceWorker';
library.add(fab, faMapMarkerAlt, faCoffee)

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
