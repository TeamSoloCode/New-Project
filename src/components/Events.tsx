import * as React from "react";
import { WinfunEvent } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import MaterialTable from "material-table";
import { FETCH_ALL_EXISTS_EVENT_API, DELETE_EVENT_API } from "../api/APIs";
import { preparedImageSrc } from "../utils";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

interface State {
  events: WinfunEvent[];
  fetching: boolean;
  error: boolean;
  message: string;
  deleting: boolean;
  deletedEvent?: WinfunEvent;
}

enum ActionEnum {
  FETCH_ALL_EVENTS,
  FETCH_ALL_EVENTS_SUCCESSFUL,
  FETCH_ALL_EVENTS_FAILED,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESSFUL,
  DELETE_EVENT_FAILED
}

type Action =
  | { type: ActionEnum.FETCH_ALL_EVENTS }
  | { type: ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL; events: WinfunEvent[]; message: string }
  | { type: ActionEnum.FETCH_ALL_EVENTS_FAILED; message: string }
  | { type: ActionEnum.DELETE_EVENT; }
  | { type: ActionEnum.DELETE_EVENT_SUCCESSFUL; deletedEvent: WinfunEvent; message: string }
  | { type: ActionEnum.DELETE_EVENT_FAILED; message: string };

const initialState: State = { events: [], fetching: false, error: false, message: "", deleting: false };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.FETCH_ALL_EVENTS:
      return { ...state, fetching: true };
    case ActionEnum.FETCH_ALL_EVENTS_SUCCESSFUL:
      return { ...state, events: action.events, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_EVENTS_FAILED:
      return { ...state, message: action.message, error: true };
    case ActionEnum.DELETE_EVENT:
      return { ...state, deleting: true };
    case ActionEnum.DELETE_EVENT_SUCCESSFUL:
      return { ...state, deleting: false, message: action.message, error: false, deletedEvent: action.deletedEvent };
    case ActionEnum.DELETE_EVENT_FAILED:
      return { ...state, deleting: false, message: action.message, error: true };
    default:
      return state;
  }
}

export default withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [events, setEvents] = React.useState(state.events);
    const [showAlert, setShowAlert] = React.useState(false);

    const loadData = async () => {
      try {
        dispatch({
          type: ActionEnum.FETCH_ALL_EVENTS,
        });

        const response = await fetch(FETCH_ALL_EXISTS_EVENT_API);
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

    const deleteEvent = async (eventId: number) => {
      try {
        dispatch({
          type: ActionEnum.DELETE_EVENT,
        });
        const response = await fetch(DELETE_EVENT_API, {
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId }),
        });

        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.DELETE_EVENT_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          await loadData();
          const data = results.data as WinfunEvent;
          dispatch({
            type: ActionEnum.DELETE_EVENT_SUCCESSFUL,
            deletedEvent: data,
            message: `Delete ${data.eventName} event successful`,
          });          
        }
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setShowAlert(true);
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
        <Toast className="ml-2" onClose={() => setShowAlert(false)} show={showAlert} delay={3000} autohide>
          <Toast.Header>
            <Button className="mr-1" variant="success" style={{ width: 16, height: 16, borderRadius: 8 }} />
            <strong className="mr-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{state.message}</Toast.Body>
        </Toast>
        <MaterialTable
          title="Events"
          onRowClick={(_, rowData: WinfunEvent) => {
            props.history.push("/update_event/" + rowData.id);
          }}
          columns={[
            { title: "Name", field: "eventName", cellStyle: { fontSize: 14 }  },
            { title: "Location", field: "location", cellStyle: { fontSize: 14 } },
            { title: "Begin date", field: "beginDatetime", cellStyle: { fontSize: 14 } },
            { title: "End date", field: "endDatetime", cellStyle: { fontSize: 14 } },
            {
              title: "Detail link",
              field: "detailLink",
              cellStyle: { fontSize: 14 },
              render: (rowData) => (
                <p style={{ maxHeight: 50, overflow: "auto", wordBreak: "break-word" }}>{rowData.detailLink}</p>
              ),
            },
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
              align: "center",
              render: (rowData) => <img src={preparedImageSrc(rowData.imageURI)} width={64} height={64} />,
            },
            { title: "Created Date", field: "createdDate", type: "datetime" },
          ]}
          data={events}
          actions={[
            {
              icon: "delete",
              iconProps: { color: "error" },
              tooltip: "Delete User",
              onClick: async (event, rowData) => {
                if (!Array.isArray(rowData) && rowData.id) {                      
                  const res = await confirm(`Do you want delete ${rowData.eventName} event`)
                  if(!res)  return;     
                  deleteEvent(rowData.id);
                }
              }
            },
          ]}
        />
      </>
    );
  })
);
