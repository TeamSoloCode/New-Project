import * as React from "react";
import { WinfunEvent } from "src/ModelDeclare";
import { withRouter } from 'react-router-dom';

interface State {
  events: WinfunEvent[];
  fetching: boolean;
  error: boolean;
  message: string;
}

enum ActionEnum {
  FETCH_ALL_EVENTS,
  FETCH_ALL_EVENTS_SUCCESSFUL,
  FETCH_ALL_EVENTS_FAILED,
}

type Action =
  | { type: ActionEnum.FETCH_ALL_EVENTS }
  | { type: ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL; events: WinfunEvent[]; message: string }
  | { type: ActionEnum.FETCH_ALL_EVENTS_FAILED; message: string };

const initialState: State = { events: [], fetching: false, error: false, message: "" };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.FETCH_ALL_EVENTS:
      return { ...state, fetching: true };
    case ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL:
      return { ...state, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_EVENTS_FAILED:
      return { ...state, message: action.message, error: true };
    default:
      throw new Error();
  }
}

export const InsertEventForm = withRouter(React.memo((props : any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
    </>
  );
}));
