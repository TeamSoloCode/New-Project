import * as React from "react";
import { RegisterNow } from "src/ModelDeclare";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import * as moment from "moment";
import MaterialTable from "material-table";
import { FETCH_ALL_REGISTER_NOW, RESEND_REGISTER_INFO_TO_HOST_EMAIL } from "../api/APIs";
import { EmailConfig } from './EmailConfig';

interface State {
  registers: RegisterNow[];
  fetching: boolean;
  updating: boolean;
  resending: boolean;
  error: boolean;
  message: string;
}

enum ActionEnum {
  FETCH_ALL_REGISTER_NOW,
  FETCH_ALL_REGISTER_NOW_SUCCESSFUL,
  FETCH_ALL_REGISTER_NOW_FAILED,
  RESEND_EMAIL,
  RESEND_EMAIL_SUCCESSFUL,
  RESEND_EMAIL_FAILED,
}

type Actions =
  | { type: ActionEnum.FETCH_ALL_REGISTER_NOW }
  | { type: ActionEnum.FETCH_ALL_REGISTER_NOW_SUCCESSFUL; registers: RegisterNow[]; message: string }
  | { type: ActionEnum.FETCH_ALL_REGISTER_NOW_FAILED; message: string }
  | { type: ActionEnum.RESEND_EMAIL }
  | { type: ActionEnum.RESEND_EMAIL_SUCCESSFUL; message: string }
  | { type: ActionEnum.RESEND_EMAIL_FAILED; message: string };

const initialState: State = {
  registers: [],
  updating: false,
  resending: false,
  fetching: false,
  error: false,
  message: "",
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionEnum.FETCH_ALL_REGISTER_NOW:
      return { ...state, fetching: true };
    case ActionEnum.FETCH_ALL_REGISTER_NOW_SUCCESSFUL:
      return { ...state, registers: action.registers, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_REGISTER_NOW_FAILED:
      return { ...state, message: action.message, error: true };
    case ActionEnum.RESEND_EMAIL_SUCCESSFUL:
      return { ...state, resending: true };
    case ActionEnum.RESEND_EMAIL_SUCCESSFUL:
      return { ...state, resending: false, message: action.message, error: false };
    case ActionEnum.RESEND_EMAIL_FAILED:
      return { ...state, resending: false, message: action.message, error: true };
    default:
      return state;
  }
}

export default React.memo(() => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [registers, setRegisters] = React.useState(state.registers);
  const [showAlert, setShowAlert] = React.useState(false);

  const loadData = async () => {
    try {
      dispatch({
        type: ActionEnum.FETCH_ALL_REGISTER_NOW,
      });

      const response = await fetch(FETCH_ALL_REGISTER_NOW);
      if (response) {
        const results = await response.json();
        if (results.code != 0) {
          dispatch({
            type: ActionEnum.FETCH_ALL_REGISTER_NOW_FAILED,
            message: results.message.sqlMessage,
          });

          throw Error(results.message.sqlMessage);
        }

        dispatch({
          type: ActionEnum.FETCH_ALL_REGISTER_NOW_SUCCESSFUL,
          registers: results.data as RegisterNow[],
          message: "Load comment successful !!",
        });
      }
    } catch (err) {
    } finally {
      // setShowAlert(true)
    }
  };

  const resendEmail = React.useCallback(async (e) => {
    try {
      dispatch({
        type: ActionEnum.RESEND_EMAIL,
      });

      const response = await fetch(RESEND_REGISTER_INFO_TO_HOST_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerId: e.target.dataset.id }),
      });

      if (response) {
        const results = await response.json();
        if (results.code != 0) {
          dispatch({
            type: ActionEnum.RESEND_EMAIL_FAILED,
            message: results.message.sqlMessage,
          });

          throw Error(results.message.sqlMessage);
        }

        dispatch({
          type: ActionEnum.RESEND_EMAIL_SUCCESSFUL,
          message: "Re-sending email successful !!",
        });
      }
    } catch (err) {
    } finally {
      setShowAlert(true);
      setTimeout(() =>{loadData();}, 1000)
    }
  }, []);

  // const updateCommentSequence = React.useCallback(async (commentId: number, sequence: number) => {
  //   try {
  //     dispatch({
  //       type: ActionEnum.UPDATE_COMMENT_SEQUENCE,
  //     });

  //     const response = await fetch(UPDATE_ANONYMOUS_COMMENT_SEQUENCE, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ commentId: commentId, sequence: sequence }),
  //     });

  //     if (response) {
  //       const results = await response.json();
  //       if (results.code != 0) {
  //         dispatch({
  //           type: ActionEnum.UPDATE_COMMENT_SEQUENCE_FAILED,
  //           message: results.message.sqlMessage,
  //         });

  //         throw Error(results.message.sqlMessage);
  //       }

  //       dispatch({
  //         type: ActionEnum.UPDATE_COMMENT_SEQUENCE_SUCCESSFULL,
  //         message: "Update comment sequence successful !!",
  //       });
  //       loadData();
  //     }
  //   } catch (err) {
  //   } finally {
  //     setShowAlert(true)
  //   }
  // }, []);

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    const registers = state.registers.map((register) => ({
      ...register,
      createdDate: moment(register.createdDate).local().format("MM-DD-YYYY HH:mm"),
    }));
    setRegisters(registers);
  }, [state.registers]);

  return (
    <>
      <Toast className="ml-2" onClose={() => setShowAlert(false)} show={showAlert} delay={3000} autohide>
        <Toast.Header>
          <Button className="mr-1" variant="success" style={{ width: 16, height: 16, borderRadius: 8 }} />
          <strong className="mr-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{state.message}</Toast.Body>
      </Toast>

      <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} eventKey="0">
              Update receiving email
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <EmailConfig />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <MaterialTable
        title="Event Registers"
        columns={[
          { title: "Name", field: "name", cellStyle: { fontSize: 14 }, editable: "never" },
          { title: "Email", field: "email", cellStyle: { fontSize: 14 }, editable: "never" },
          { title: "Phone", field: "phoneNumber", cellStyle: { fontSize: 14 }, editable: "never" },
          {
            title: "Sending status",
            render: (rowData) => (
              <Button className="w-100" disabled variant={rowData.sent ? "outline-success" : "dark"}>
                {rowData.sent ? "Sent" : "Not yet"}
              </Button>
            ),
            align: "center",
            editable: "never",
          },
          {
            title: "",
            render: (rowData) => (
              <Button data-id={rowData.id} className="w-100" onClick={resendEmail} variant={"primary"}>
                Re-send
              </Button>
            ),
            align: "center",
            editable: "never",
          },
          { title: "Created Date", field: "createdDate", type: "datetime", editable: "never" },
        ]}
        data={registers}
      />
    </>
  );
});
