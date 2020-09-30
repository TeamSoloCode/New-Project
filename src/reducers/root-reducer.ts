import { combineReducers } from 'redux';
/**
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {}

/**
 * initialState
 * InitialState is the same as in our reducer.
 * For each reducer, we add a “default state” in our initialState.
 */
export const initialState: State = {};

/**
 * Root reducer
 * The root reducer of the app is the reducer combined by all other reducers of the app.
 */
export const reducers = combineReducers<State>({});

export type AppState = ReturnType<typeof reducers>;
