import * as React from "react";
import { WinfunEvent } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from 'moment'
import MaterialTable from "material-table";
import { FETCH_ALL_EVENT_API } from "../api/APIs";

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
      return { ...state, events: action.events, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_EVENTS_FAILED:
      return { ...state, message: action.message, error: true };
    default:
      throw new Error();
  }
}

export const Events = withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [events, setEvents] = React.useState(state.events);

    const loadData = async () => {
      try {
        dispatch({
          type: ActionEnum.FETCH_ALL_EVENTS,
        });

        const response = await fetch(FETCH_ALL_EVENT_API);
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.FETCH_ALL_EVENTS_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL,
            events: results.data as WinfunEvent[],
            message: "Fetch event successfull !!!",
          });
        }
      } catch (err) {
        alert(err.message);
      } finally {
      }
    };

    React.useEffect(() => {
      loadData();
    }, []);

    React.useEffect(() => {
      const events = state.events.map((event) => ({
        ...event,
        createdDate: moment(event.createdDate).local().format("YYYY-MM-DD HH:mm"),
      }));
      setEvents(events)
    }, [state.events]);

    return (
      <>
        {console.log(events)}
        <MaterialTable
          title="Events"
          onRowClick={(_, rowData: WinfunEvent) => {
            props.history.push("/update_event/" + rowData.id);
          }}
          columns={[
            { title: "Name", field: "eventName" },
            { title: "Location", field: "location" },
            { title: "Begin date", field: "beginDatetime" },
            { title: "End date", field: "endDatetime" },
            { title: "Detail link", field: "detailLink" },
            { title: "Descriptions", field: "descriptions" },
            {
              title: "Show on client",
              field: "show",
              lookup: { 1: "Yes" },
              align: "center",
            },
            { title: "Sequence", field: "sequence", type: "numeric" },
            { title: "Created Date", field: "createdDate", type: 'datetime' },
          ]}
          data={events}
        />
      </>
    );
  })
);