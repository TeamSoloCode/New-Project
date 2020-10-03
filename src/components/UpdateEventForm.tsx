import * as React from "react";
import DatePicker from "react-datepicker";
import { WinfunEvent } from "src/ModelDeclare";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { UPDATE_WINFUN_EVENT_API, FETCH_EVENT_BY_ID_API } from "../api/APIs";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";

interface State {
  event: WinfunEvent | null;
  results: WinfunEvent | null;
  updating: boolean;
  fetching: boolean;
  error: boolean;
  message: string;
}

enum ActionEnum {
  FETCH_EVENT,
  FETCH_EVENT_SUCCESSED,
  FETCH_EVENT_FAILED,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESSFUL,
  UPDATE_EVENT_FAILED,
}

type Action =
  | { type: ActionEnum.UPDATE_EVENT }
  | { type: ActionEnum.UPDATE_EVENT_SUCCESSFUL; results: WinfunEvent | null; message: string }
  | { type: ActionEnum.UPDATE_EVENT_FAILED; message: string }
  | { type: ActionEnum.FETCH_EVENT }
  | { type: ActionEnum.FETCH_EVENT_SUCCESSED; event: WinfunEvent | null; message: string }
  | { type: ActionEnum.FETCH_EVENT_FAILED; message: string };

const initialState: State = { event: null, results: null, updating: false, fetching: false, error: false, message: "" };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.FETCH_EVENT:
      return { ...state, updating: true };
    case ActionEnum.FETCH_EVENT_SUCCESSED:
      return { ...state, event: action.event, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_EVENT_FAILED:
      return { ...state, message: action.message, error: true };
    case ActionEnum.UPDATE_EVENT:
      return { ...state, updating: true };
    case ActionEnum.UPDATE_EVENT_SUCCESSFUL:
      return { ...state, results: action.results, updating: false, message: action.message, error: false };
    case ActionEnum.UPDATE_EVENT_FAILED:
      return { ...state, message: action.message, error: true };
    default:
      throw new Error();
  }
}

export const UpdateEventForm = withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [currentEvent, setCurrentEvent] = React.useState<WinfunEvent | null>(null);
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
          type: ActionEnum.UPDATE_EVENT,
        });
        const {
          match: { params },
        } = props;
        const response = await fetch(UPDATE_WINFUN_EVENT_API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...currentEvent, eventId: params.eventId }),
        });

        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.UPDATE_EVENT_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.UPDATE_EVENT_SUCCESSFUL,
            results: results.data as WinfunEvent,
            message: "Update event successfull !!!",
          });
        }
      } catch (err) {
        // alert(err.message);
      } finally {
        setShowAlert(true);
      }
    }, [currentEvent]);

    const loadData = async (eventId: number) => {
      try {
        dispatch({
          type: ActionEnum.FETCH_EVENT,
        });

        const url = new URL(FETCH_EVENT_BY_ID_API);
        const params = { eventId: eventId };
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        const response = await fetch(url.href);
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.FETCH_EVENT_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.FETCH_EVENT_SUCCESSED,
            event: results.data as WinfunEvent,
            message: "Fetch event successfull !!!",
          });
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setShowAlert(true);
      }
    };

    React.useEffect(() => {
      try {
        setCurrentEvent(state.event);
      } catch (err) {}
    }, [state.event]);

    React.useEffect(() => {
      if (state.event) {
        const event: WinfunEvent = { ...state.event };
        if (eventName) event.eventName = eventName;
        if (location) event.location = location;
        if (startDateAsString) event.beginDatetime = startDateAsString;
        if (endDateAsString) event.endDatetime = endDateAsString;
        if (descriptions) event.descriptions = descriptions;
        if (detailLink) event.detailLink = detailLink;
        if (sequence) event.sequence = sequence;
        if (show) event.show = show;
        setCurrentEvent(event);
      }
    }, [
      state.event,
      eventName,
      location,
      startDateAsString,
      endDateAsString,
      descriptions,
      detailLink,
      show,
      sequence,
    ]);

    React.useEffect(() => {
      const {
        match: { params },
      } = props;
      loadData(params.eventId);
    }, []);

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
        <h1>Update Event</h1>
        {showAlert ? (
          <Alert
            style={{ height: 50 }}
            variant={state.error ? "danger" : "success"}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <p>{state.message}</p>
          </Alert>
        ) : null}
        <div className="m-4">
          <InputGroup className="mb-3">
            <InputGroup.Prepend style={{ width: "10%" }}>
              <InputGroup.Text className="w-100" id="basic-addon1">
                Event name
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={currentEvent?.eventName}
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
              value={currentEvent?.location}
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
            <FormControl value={currentEvent?.beginDatetime} aria-describedby="basic-addon2" />
            <InputGroup.Append>
              <DatePicker
                className="h-100"
                id="basic-addon2"
                selected={currentEvent?.beginDatetime ? new Date(currentEvent?.beginDatetime) : startDate}
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
            <FormControl value={currentEvent?.endDatetime} aria-describedby="basic-addon2" />
            <InputGroup.Append>
              <DatePicker
                className="h-100"
                id="basic-addon2"
                selected={currentEvent?.endDatetime ? new Date(currentEvent?.endDatetime) : endDate}
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
              value={currentEvent?.descriptions}
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
              value={currentEvent?.show}
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
              value={currentEvent?.sequence}
              onChange={onChangeSequence}
              style={{ width: "90%" }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>

        <div className="text-center">
          <Button variant="primary" onClick={onClickSubmit}>
            Submit
          </Button>
        </div>
      </>
    );
  })
);
