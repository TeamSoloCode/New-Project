import * as React from "react";
import { AnonymousComment } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import MaterialTable from "material-table";
import { FETCH_ALL_ANO_COMMENTS, UPDATE_ANONYMOUS_COMMENT_SHOW_STATUS } from "../api/APIs";
import { Button, Toast } from "react-bootstrap";

interface State {
  comments: AnonymousComment[];
  fetching: boolean;
  updating: boolean;
  error: boolean;
  message: string;
}

enum ActionEnum {
  FETCH_ALL_ANO_COMMENTS,
  FETCH_ALL_ANO_COMMENTS_SUCCESSFUL,
  FETCH_ALL_ANO_COMMENTS_FAILED,
  UPDATE_COMMENT_SHOW_STATUS,
  UPDATE_COMMENT_SHOW_STATUS_SUCCESSFUL,
  UPDATE_COMMENT_SHOW_STATUS_FAILED,
  UPDATE_COMMENT_SEQUENCE,
  UPDATE_COMMENT_SEQUENCE_SUCCESSFULL,
  UPDATE_COMMENT_SEQUENCE_FAILED
}

type Action =
  | { type: ActionEnum.FETCH_ALL_ANO_COMMENTS }
  | { type: ActionEnum.FETCH_ALL_ANO_COMMENTS_SUCCESSFUL; events: AnonymousComment[]; message: string }
  | { type: ActionEnum.FETCH_ALL_ANO_COMMENTS_FAILED; message: string }
  | { type: ActionEnum.UPDATE_COMMENT_SHOW_STATUS }
  | { type: ActionEnum.UPDATE_COMMENT_SHOW_STATUS_SUCCESSFUL; message: string }
  | { type: ActionEnum.UPDATE_COMMENT_SHOW_STATUS_FAILED; message: string }
  | { type: ActionEnum.UPDATE_COMMENT_SEQUENCE }
  | { type: ActionEnum.UPDATE_COMMENT_SEQUENCE_SUCCESSFULL; message: string }
  | { type: ActionEnum.UPDATE_COMMENT_SEQUENCE_FAILED; message: string };

const initialState: State = { comments: [], updating: false, fetching: false, error: false, message: "" };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.FETCH_ALL_ANO_COMMENTS:
      return { ...state, fetching: true };
    case ActionEnum.FETCH_ALL_ANO_COMMENTS_SUCCESSFUL:
      return { ...state, comments: action.events, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_ANO_COMMENTS_FAILED:
      return { ...state, message: action.message, error: true };
    case ActionEnum.UPDATE_COMMENT_SHOW_STATUS, ActionEnum.UPDATE_COMMENT_SEQUENCE:
      return { ...state, updating: true };
    case ActionEnum.UPDATE_COMMENT_SHOW_STATUS_SUCCESSFUL, ActionEnum.UPDATE_COMMENT_SEQUENCE_SUCCESSFULL:
      return { ...state, updating: false, message: action.message, error: false };
    case ActionEnum.UPDATE_COMMENT_SHOW_STATUS_FAILED, ActionEnum.UPDATE_COMMENT_SEQUENCE_FAILED:
      return { ...state, message: action.message, error: true };
    default:
      throw new Error();
  }
}

export const AnonymousComments = withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [comments, setComments] = React.useState(state.comments);
    const [showAlert, setShowAlert] = React.useState(false);

    const loadData = async () => {
      try {
        dispatch({
          type: ActionEnum.FETCH_ALL_ANO_COMMENTS,
        });

        const response = await fetch(FETCH_ALL_ANO_COMMENTS);
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.FETCH_ALL_ANO_COMMENTS_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.FETCH_ALL_ANO_COMMENTS_SUCCESSFUL,
            events: results.data as AnonymousComment[],
            message: "Load comment successful !!",
          });
        }
      } catch (err) {
      } finally {
        // setShowAlert(true)
      }
    };

    const updateShowStatus = React.useCallback(async (e) => {
      try {
        dispatch({
          type: ActionEnum.UPDATE_COMMENT_SHOW_STATUS,
        });

        const response = await fetch(UPDATE_ANONYMOUS_COMMENT_SHOW_STATUS, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentId: e.target.dataset.id, status: e.target.dataset.show == 1 ? 0 : 1 }),
        });
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.UPDATE_COMMENT_SHOW_STATUS_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.UPDATE_COMMENT_SHOW_STATUS_SUCCESSFUL,
            message: "Update comment status successful !!",
          });
          loadData();
        }
      } catch (err) {
      } finally {
        setShowAlert(true)
      }
    }, []);

    React.useEffect(() => {
      loadData();
    }, []);

    React.useEffect(() => {
      const comments = state.comments.map((comment) => ({
        ...comment,
        createdDate: moment(comment.createdDate).local().format("YYYY-MM-DD HH:mm"),
      }));
      setComments(comments);
    }, [state.comments]);

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
          title="Anonymous Commnets"
          columns={[
            { title: "Name", field: "name", cellStyle: { fontSize: 14 }, editable: 'never'  },
            { title: "Email", field: "email", cellStyle: { fontSize: 14 }, editable: 'never'  },
            { title: "Phone", field: "phoneNumber", cellStyle: { fontSize: 14 }, editable: 'never' },
            {
              title: "Contents",
              field: "contents",
              editable: 'never',
              render: (rowData) => (
                <p style={{ maxHeight: 50, overflow: "auto", wordBreak: "break-word" }}>{rowData.contents}</p>
              ),
            },
            {
              title: "Show on client",
              render: (rowData) => (
                <Button
                  data-id={rowData.id}
                  data-show={rowData.show}
                  className="w-100"
                  onClick={updateShowStatus}
                  variant={rowData.show ? "success" : "outline-dark"}
                >
                  {rowData.show ? "Yes" : "No"}
                </Button>
              ),
              align: "center",
              editable: 'never' 
            },
            { title: "Sequence", field: "sequence", type: "numeric", editable: 'onUpdate' },
            { title: "Created Date", field: "createdDate", type: "datetime", editable: 'never' },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) => {
              console.log("abcd", newData)
              return new Promise((resolve, reject) => {
                // setTimeout(() => {
                //   const dataUpdate = [...data];
                //   const index = oldData.tableData.id;
                //   dataUpdate[index] = newData;
                //   setData([...dataUpdate]);
    
                //   resolve();
                // }, 1000)
              })
            }
          }}
          data={comments}
        />
      </>
    );
  })
);
