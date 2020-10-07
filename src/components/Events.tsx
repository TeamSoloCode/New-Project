import * as React from "react";
import { WinfunEvent } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import MaterialTable from "material-table";
import { FETCH_ALL_EVENT_API, IMAGE_STORAGE_API } from "../api/APIs";

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
      return state;
  }
}

export default withRouter(
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
      setEvents(events);
    }, [state.events]);

    return (
      <>
        <MaterialTable
          title="Events"
          onRowClick={(_, rowData: WinfunEvent) => {
            props.history.push("/update_event/" + rowData.id);
          }}
          columns={[
            { title: "Name", field: "eventName", cellStyle: { fontSize: 14 } },
            { title: "Location", field: "location", cellStyle: { fontSize: 14 } },
            { title: "Begin date", field: "beginDatetime", cellStyle: { fontSize: 14 } },
            { title: "End date", field: "endDatetime", cellStyle: { fontSize: 14 } },
            { title: "Detail link", field: "detailLink", cellStyle: { fontSize: 14 } },
            {
              title: "Descriptions",
              field: "descriptions",
              render: (rowData) => (
                <p style={{ maxHeight: 50, overflow: "auto", wordBreak: "break-word" }}>{rowData.descriptions}</p>
              ),
            },
            {
              title: "Show on client",
              field: "show",
              lookup: { 1: "Yes" },
              align: "center",
            },
            { title: "Sequence", field: "sequence", type: "numeric" },
            {
              title: "Image",
              render: (rowData) => <img src={prepareImageSrc(rowData.imageURI)} width={64} height={64} />,
            },
            { title: "Created Date", field: "createdDate", type: "datetime" },
          ]}
          data={events}
        />
      </>
    );
  })
);

const prepareImageSrc = (uri: string | undefined) => {
  if (!uri) return undefined;
  if (uri.includes("https") || uri.includes("http")) {
    return uri;
  }
  return IMAGE_STORAGE_API + uri;
};
