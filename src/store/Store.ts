import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { State, reducers } from '../reducers/root-reducer';
import { rootSaga } from '../sagas/root-saga';

const sagaMiddleware = createSagaMiddleware();

const store: Store<State> = createStore(reducers, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(rootSaga);
