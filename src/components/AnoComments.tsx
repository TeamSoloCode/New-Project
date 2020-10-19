import * as React from "react";
import { AnonymousComment } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import MaterialTable from "material-table";
import { FETCH_ALL_ANO_COMMENTS, UPDATE_ANONYMOUS_COMMENT_API } from "../api/APIs";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import FormControl from "react-bootstrap/FormControl";
import { preparedImageSrc } from "../utils";
import { ImageUpdator } from "./ImageUpdator";

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
  UPDATE_REVIEW_COMMENT,
  UPDATE_REVIEW_COMMENT_SUCCESSFUL,
  UPDATE_REVIEW_COMMENT_FAILED,
}

type Action =
  | { type: ActionEnum.FETCH_ALL_ANO_COMMENTS }
  | { type: ActionEnum.FETCH_ALL_ANO_COMMENTS_SUCCESSFUL; events: AnonymousComment[]; message: string }
  | { type: ActionEnum.FETCH_ALL_ANO_COMMENTS_FAILED; message: string }
  | { type: ActionEnum.UPDATE_REVIEW_COMMENT }
  | { type: ActionEnum.UPDATE_REVIEW_COMMENT_SUCCESSFUL; message: string }
  | { type: ActionEnum.UPDATE_REVIEW_COMMENT_FAILED; message: string };

const initialState: State = { comments: [], updating: false, fetching: false, error: false, message: "" };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.FETCH_ALL_ANO_COMMENTS:
      return { ...state, fetching: true };
    case ActionEnum.FETCH_ALL_ANO_COMMENTS_SUCCESSFUL:
      return { ...state, comments: action.events, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_ANO_COMMENTS_FAILED:
      return { ...state, message: action.message, error: true };
    case ActionEnum.UPDATE_REVIEW_COMMENT:
      return { ...state, updating: true };
    case ActionEnum.UPDATE_REVIEW_COMMENT_SUCCESSFUL:
      return { ...state, updating: false, message: action.message, error: false };
    case ActionEnum.UPDATE_REVIEW_COMMENT_FAILED:
      return { ...state, message: action.message, error: true };
    default:
      return state;
  }
}

export default withRouter(
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

    const onChangeShowStatus = React.useCallback(
      (e) => {
        const id = e.currentTarget.dataset.id;
        const reviewComments = [...comments];
        const reviewComment = reviewComments.find((comment) => comment.id == id);
        if (reviewComment) {
          const index = reviewComments.findIndex((comment) => reviewComment.id == comment.id);
          reviewComment.show = reviewComment.show != 0 ? 1 : 0;
          reviewComments[index] = reviewComment;
          setComments(reviewComments);
        }
      },
      [comments]
    );

    const onUpdateReviewImage = React.useCallback((id: number | undefined, imageURL: string) => {
      const cloneComments = [...comments]
      const updateComment = cloneComments.find(comment => comment.id == id)
      if(updateComment && id){
        updateComment.userImage = imageURL
        setComments(cloneComments);
      }
    }, [comments]);

    const updateReviewComment = React.useCallback(async (commentId: number, reviewComment: AnonymousComment) => {
      try {
        dispatch({
          type: ActionEnum.UPDATE_REVIEW_COMMENT,
        });

        const response = await fetch(UPDATE_ANONYMOUS_COMMENT_API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentId: commentId, ...reviewComment }),
        });
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.UPDATE_REVIEW_COMMENT_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.UPDATE_REVIEW_COMMENT_SUCCESSFUL,
            message: "Update review comment successful !!",
          });
          loadData();
        }
      } catch (err) {
      } finally {
        setShowAlert(true);
      }
    }, []);

    React.useEffect(() => {
      loadData();
    }, []);

    React.useEffect(() => {
      const comments = state.comments.map((comment) => ({
        ...comment,
        createdDate: moment(comment.createdDate)
          .local()
          .format("YYYY-MM-DD HH:mm"),
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
            {
              title: "Image",
              align: "center",
              field: "userImage",
              editComponent: (colProps) => (
                <ImageUpdator
                  updateImage={onUpdateReviewImage}
                  id={colProps.rowData.id}
                  src={preparedImageSrc(colProps.rowData.userImage)}
                  width={64}
                  height={64}
                />
              ),
              render: (rowData) => <img src={preparedImageSrc(rowData.userImage)} width={64} height={64} />,
            },
            {
              title: "User Image",
              field: "userImage",
              cellStyle: { fontSize: 14 },
              editComponent: (colProps) => (
                <FormControl
                  as="textarea"
                  value={colProps.rowData.userImage}
                  onChange={(e: any) => colProps.onChange(e.currentTarget.value)}
                />
              ),
            },
            { title: "Name", field: "name", cellStyle: { fontSize: 14 } },
            { title: "Email", field: "email", cellStyle: { fontSize: 14 }, hidden: true },
            { title: "Phone", field: "phoneNumber", cellStyle: { fontSize: 14 }, hidden: true },
            { title: "Job", field: "job", cellStyle: { fontSize: 14 } },
            {
              title: "Contents",
              field: "contents",
              editComponent: (colProps) => (
                <FormControl
                  as="textarea"
                  value={colProps.rowData.contents}
                  onChange={(e: any) => colProps.onChange(e.currentTarget.value)}
                />
              ),
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
                  onClick={onChangeShowStatus}
                  variant={rowData.show ? "success" : "outline-dark"}
                >
                  {rowData.show ? "Yes" : "No"}
                </Button>
              ),
              align: "center",
              editable: "never",
            },
            { title: "Sequence", field: "sequence", type: "numeric", editable: "onUpdate" },
            { title: "Created Date", field: "createdDate", type: "datetime", editable: "never", hidden: true },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise(async (resolve, reject) => {
                if (!newData.id) return resolve();
                await updateReviewComment(newData.id, newData);
                resolve();
              });
            },
          }}
          data={comments}
        />
      </>
    );
  })
);
