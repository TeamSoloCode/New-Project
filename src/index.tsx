import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/Store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
