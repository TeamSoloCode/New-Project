import { all } from 'redux-saga/effects';

// We `fork()` these tasks so they execute in the background.
export function* rootSaga() {
	yield all([
		// `fork()` any other store sagas down here...
	]);
}
