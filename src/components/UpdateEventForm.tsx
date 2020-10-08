import * as React from "react";
import DatePicker from "react-datepicker";
import { WinfunEvent } from "src/ModelDeclare";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { UPDATE_WINFUN_EVENT_API, FETCH_EVENT_BY_ID_API, UPLOAD_IMAGE, IMAGE_STORAGE_API } from "../api/APIs";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

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
      return state;
  }
}

export default withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [oldEvent, setOldEvent] = React.useState<WinfunEvent | null>(null);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [startDateAsString, setStartDateAsString] = React.useState("");
    const [endDateAsString, setEndDateAsString] = React.useState("");
    const [eventName, setEventName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [descriptions, setDescriptions] = React.useState("");
    const [detailLink, setDetailLink] = React.useState("");
    const [show, setShow] = React.useState<number | undefined>(undefined);
    const [sequence, setSequence] = React.useState<number | undefined>(undefined);
    const [imageURI, setImageURI] = React.useState("");
    const [showAlert, setShowAlert] = React.useState(false);
    const imageRef = React.createRef<HTMLInputElement>();

    const onChangeEventName = React.useCallback((e) => {
      setEventName(e.target.value);
    }, []);

    const onChangeImageURI = React.useCallback((e) => {
      setImageURI(e.target.value);
    }, []);

    const onSubmitUploadImage = React.useCallback(
      async (e) => {
        e.preventDefault();
        if (imageRef.current && imageRef.current.files) {
          const file = imageRef.current.files[0];
          if (!file) return;
          const formData = new FormData();
          formData.append("image", file);
          const response = await fetch(UPLOAD_IMAGE, {
            method: "POST", // or 'PUT'
            // headers: {
            //   'Content-Type': file.type,
            // },
            body: formData,
          });
          if (response) {
            const { imageInfo } = await response.json();
            setImageURI(imageInfo.filename);
          }
        }
      },
      [imageRef]
    );

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

        const newEvent: WinfunEvent = {} as WinfunEvent;
        if (eventName) newEvent.eventName = eventName;
        if (location) newEvent.location = location;
        if (startDateAsString) newEvent.beginDatetime = startDateAsString;
        if (endDateAsString) newEvent.endDatetime = endDateAsString;
        if (descriptions) newEvent.descriptions = descriptions;
        if (detailLink) newEvent.detailLink = detailLink;
        if (sequence) newEvent.sequence = sequence;
        if (show) newEvent.show = show;
        if (imageURI) newEvent.imageURI = imageURI;

        const response = await fetch(UPDATE_WINFUN_EVENT_API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newEvent, eventId: params.eventId }),
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
    }, [
      oldEvent,
      eventName,
      location,
      startDateAsString,
      endDateAsString,
      descriptions,
      detailLink,
      show,
      sequence,
      imageURI,
    ]);

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

    const prepareImageSrc = (uri: string) => {
      if (uri.includes("https") || uri.includes("http")) {
        return uri;
      }
      return IMAGE_STORAGE_API + uri;
    };

    React.useEffect(() => {
      try {
        if (!state.event) return;
        setOldEvent(state.event);
      } catch (err) {}
    }, [state.event]);

    React.useEffect(() => {
      if (state.event) {
        const {
          eventName,
          imageURI,
          beginDatetime,
          endDatetime,
          descriptions,
          detailLink,
          sequence,
          location,
          show,
        }: WinfunEvent = { ...state.event };
        if (eventName) setEventName(eventName);
        if (imageURI) setImageURI(imageURI || "");
        if (beginDatetime) setStartDateAsString(beginDatetime);
        if (endDatetime) setEndDateAsString(endDatetime);
        if (descriptions) setDescriptions(descriptions || "");
        if (detailLink) setDetailLink(detailLink);
        if (sequence) setSequence(sequence);
        if (location) setLocation(location);
        if (show) setShow(show);
      }
    }, [state.event]);

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
      setEndDateAsString(value);
      return (
        <InputGroup.Prepend onClick={onClick}>
          <InputGroup.Text className="w-100">Calendar</InputGroup.Text>
        </InputGroup.Prepend>
      );
    };

    return (
      <>
        <h1>Update Event</h1>
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
                Event image
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={imageURI}
              onChange={onChangeImageURI}
              style={{ width: "90%" }}
              aria-describedby="basic-addon1"
            />
            <div className="w-100 text-right">
              {imageURI ? <img className="mt-1 mb-1" src={prepareImageSrc(imageURI)} width={200} height={200} /> : null}
            </div>
            <form
              className="w-100 text-right"
              method="post"
              encType="multipart/form-data"
              onSubmit={onSubmitUploadImage}
            >
              <input ref={imageRef} type="file" name="image" />
              <Button variant="outline-dark" type="submit" name="upload">
                Save image
              </Button>
            </form>
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
              as="textarea"
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
                selected={startDateAsString ? new Date(startDateAsString) : startDate}
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
                selected={endDateAsString ? new Date(endDateAsString) : endDate}
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
