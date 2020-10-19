import * as React from "react";
import {
  Switch, Route,
  // Link
} from "react-router-dom";
import "./App.css";

import Login from "./components/modals/Login";

import PermanentDrawerLeft from './components/share-components/drawer-component/drawer-component';

const AnonymousComments = React.lazy(() => import('./components/AnoComments'));
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const RegisterNows = React.lazy(() => import("./components/RegisterNows"));
const UpdateEventForm = React.lazy(() => import("./components/UpdateEventForm"));
const InsertEventForm = React.lazy(() => import("./components/InsertEventForm"));
const Events = React.lazy(() => import("./components/Events"));
const Features = React.lazy(() => import("./components/Features"));
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		nested: {
			paddingLeft: theme.spacing(4),
		},
    root: {
      width: '100%',
			display: 'flex',
		},
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(3),
		},
	})
);
interface State {
  login: boolean;
}

export enum ActionEnum {
  LOGIN_SUCCESSFUL,
}

type Actions = { type: ActionEnum.LOGIN_SUCCESSFUL };

const initialState: State = {
  login: false,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionEnum.LOGIN_SUCCESSFUL:
      return { ...state, login: true };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const classes = useStyles();

  return (
		<div className={classes.root}>
			<div style={{width: '100%'}} key={JSON.stringify(state)}>
				{!state.login ? <Login dispatch={dispatch} /> : null}
				{state.login ? (
					<>
						<PermanentDrawerLeft />
						<main className={classes.content}>
							<div className={classes.toolbar} />
							<div className="content-body">
								<Switch>
									<Route exact path="/">
										<React.Suspense fallback={<div>Loading</div>}>
											<Events />
										</React.Suspense>
									</Route>
									<Route path="/insert_event">
										<React.Suspense fallback={<div>Loading</div>}>
											<InsertEventForm />
										</React.Suspense>
									</Route>
									<Route path="/update_event/:eventId">
										<React.Suspense fallback={<div>Loading</div>}>
											<UpdateEventForm />
										</React.Suspense>
									</Route>
									<Route path="/events">
										<React.Suspense fallback={<div>Loading</div>}>
											<Events />
										</React.Suspense>
									</Route>
									<Route path="/ano_comments">
										<React.Suspense fallback={<div>Loading</div>}>
											<AnonymousComments />
										</React.Suspense>
									</Route>
									<Route path="/registers">
										<React.Suspense fallback={<div>Loading</div>}>
											<RegisterNows />
										</React.Suspense>
									</Route>
									<Route path="/features">
										<React.Suspense fallback={<div>Loading</div>}>
											<Features />
										</React.Suspense>
									</Route>
								</Switch>
							</div>
						</main>
					</>
				) : null}
			</div>
		</div>
	);
};

export default App;
