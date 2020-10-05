import * as React from "react";
import DatePicker from "react-datepicker";
import { WinfunEvent } from "src/ModelDeclare";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
// import FormFile from "react-bootstrap/FormFile";
import Button from "react-bootstrap/Button";
import { ADD_WINFUN_EVENT_API } from "../api/APIs";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import { Toast } from "react-bootstrap";
// import { Form } from "react-bootstrap";

interface State {
  event: WinfunEvent | null;
  results: WinfunEvent | null;
  creating: boolean;
  error: boolean;
  message: string;
}

enum ActionEnum {
  CREATE_EVENT,
  CREATE_EVENT_SUCCESSFUL,
  CREATE_EVENT_FAILED,
}

type Action =
  | { type: ActionEnum.CREATE_EVENT }
  | { type: ActionEnum.CREATE_EVENT_SUCCESSFUL; results: WinfunEvent | null; message: string }
  | { type: ActionEnum.CREATE_EVENT_FAILED; message: string };

const initialState: State = { event: null, results: null, creating: false, error: false, message: "" };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.CREATE_EVENT:
      return { ...state, creating: true };
    case ActionEnum.CREATE_EVENT_SUCCESSFUL:
      return { ...state, results: action.results, creating: false, message: action.message, error: false };
    case ActionEnum.CREATE_EVENT_FAILED:
      return { ...state, message: action.message, error: true };
    default:
      throw new Error();
  }
}

export const InsertEventForm = withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [startDateAsString, setStartDateAsString] = React.useState("");
    const [endDateAsString, setEndAsString] = React.useState("");
    const [eventName, setEventName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [descriptions, setDescriptions] = React.useState("");
    const [detailLink, setDetailLink] = React.useState("");
    const [show, setShow] = React.useState(undefined);
    const [sequence, setSequence] = React.useState<number | undefined>(undefined);
    const [showAlert, setShowAlert] = React.useState(false);

    const onChangeEventName = React.useCallback((e) => {
      setEventName(e.target.value);
    }, []);

    const onChangeLocation = React.useCallback((e) => {
      setLocation(e.target.value);
    }, []);

    const onChangeDescription = React.useCallback((e) => {
      setDescriptions(e.currentTarget.value);
    }, []);

    const onChangeDetailLink = React.useCallback((e) => {
      setDetailLink(e.currentTarget.value);
    }, []);

    const onChangeShowStatus = React.useCallback((e) => {
      setShow(e.currentTarget.value);
    }, []);

    const onChangeSequence = React.useCallback((e) => {
      setSequence(e.currentTarget.value);
    }, []);

    const onClickSubmit = React.useCallback(async () => {
      try {
        dispatch({
          type: ActionEnum.CREATE_EVENT,
        });

        const event: WinfunEvent = {} as WinfunEvent;
        if (eventName) event.eventName = eventName;
        if (location) event.location = location;
        if (startDateAsString) event.beginDatetime = startDateAsString;
        if (endDateAsString) event.endDatetime = endDateAsString;
        if (descriptions) event.descriptions = descriptions;
        if (detailLink) event.detailLink = detailLink;
        if (sequence) event.sequence = sequence;
        if (show) event.show = show;

        const response = await fetch(ADD_WINFUN_EVENT_API, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });

        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.CREATE_EVENT_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.CREATE_EVENT_SUCCESSFUL,
            results: results.data as WinfunEvent,
            message: "Insert event successfull !!!",
          });

          props.history.push("/update_event/" + results.data.id);
        }
      } catch (err) {
        // alert(err.message);
      } finally {
        setShowAlert(true);
      }
    }, [eventName, location, startDateAsString, endDateAsString, descriptions, detailLink, show, sequence]);

    React.useLayoutEffect(() => {});

    React.useEffect(() => {
      if (!state.creating) return;
    }, [state.creating]);

    // @ts-ignore
    const CustomStartTime = ({ value, onClick }) => {
      setStartDateAsString(value);
      return (
        <InputGroup.Prepend onClick={onClick}>
          <InputGroup.Text className="w-100">Calendar</InputGroup.Text>
        </InputGroup.Prepend>
      );
    };

    // @ts-ignore
    const CustomEndTime = ({ value, onClick }) => {
      setEndAsString(value);
      return (
        <InputGroup.Prepend onClick={onClick}>
          <InputGroup.Text className="w-100">Calendar</InputGroup.Text>
        </InputGroup.Prepend>
      );
    };

    return (
      <>
        <h1>Add New Event</h1>
        <Toast className="ml-2" onClose={() => setShowAlert(false)} show={showAlert} delay={3000} autohide>
          <Toast.Header>
            <Button className="mr-1" variant="success" style={{ width: 16, height: 16, borderRadius: 8 }} />
            <strong className="mr-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{state.message}</Toast.Body>
        </Toast>
        <div className="m-4">
          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100" id="basic-addon1">
                Event name
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={eventName}
              onChange={onChangeEventName}
              style={{ width: "90%" }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100" id="basic-addon1">
                Location
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={location}
              onChange={onChangeLocation}
              style={{ width: "90%" }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100" id="basic-addon1">
                Link to detail
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={detailLink}
              onChange={onChangeDetailLink}
              style={{ width: "90%" }}
              placeholder="https://example.com/users/"
              aria-label="linkToDetail"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100">Start Time</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={startDateAsString} aria-describedby="basic-addon2" />
            <InputGroup.Append>
              <DatePicker
                className="h-100"
                id="basic-addon2"
                selected={startDate}
                withPortal={true}
                onChange={(date: any) => setStartDate(date)}
                timeInputLabel="Time:"
                // @ts-ignore
                customInput={<CustomStartTime />}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />
            </InputGroup.Append>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100">End Time</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={endDateAsString} aria-describedby="basic-addon2" />
            <InputGroup.Append>
              <DatePicker
                className="h-100"
                id="basic-addon2"
                selected={endDate}
                withPortal={true}
                onChange={(date: any) => setEndDate(date)}
                timeInputLabel="Time:"
                // @ts-ignore
                customInput={<CustomEndTime />}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />
            </InputGroup.Append>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100">Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={descriptions}
              onChange={onChangeDescription}
              style={{ width: "90%" }}
              as="textarea"
              placeholder="Event description"
              aria-label="eventDescription"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100" id="basic-addon1">
                Show on client
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={show}
              onChange={onChangeShowStatus}
              style={{ width: "90%" }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100" id="basic-addon1">
                Sequence
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={sequence}
              onChange={onChangeSequence}
              style={{ width: "90%" }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <Toast className="ml-2" onClose={() => setShowAlert(false)} show={showAlert} delay={3000} autohide>
          <Toast.Header>
            <Button className="mr-1" variant="success" style={{ width: 16, height: 16, borderRadius: 8 }} />
            <strong className="mr-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{state.message}</Toast.Body>
        </Toast>
        <div className="text-center mb-2">
          <Button variant="primary" onClick={onClickSubmit}>
            Submit
          </Button>
        </div>
      </>
    );
  })
);
