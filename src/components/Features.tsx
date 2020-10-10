import * as React from "react";
import { Feature } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import MaterialTable from "material-table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { DELETE_FEATURE_API, FETCH_ALL_EXISTS_FEATURE_API, UPDATE_FEATURE_API } from "../api/APIs";
import { preparedImageSrc } from "../utils";
import Toast from "react-bootstrap/Toast";

interface State {
  features: Feature[];
  fetching: boolean;
  updating: boolean;
  error: boolean;
  message: string;
  deleting: boolean;
  deletedFeature?: Feature;
}

enum ActionEnum {
  FETCH_ALL_FEATURES,
  FETCH_ALL_FEATURES_SUCCESSFUL,
  FETCH_ALL_FEATURES_FAILED,
  UPDATE_FEATURE,
  UPDATE_FEATURE_SUCCESSFUL,
  UPDATE_FEATURE_FAIL,
  DELETE_FEATURE,
  DELETE_FEATURE_SUCCESSFUL,
  DELETE_FEATURE_FAILED
}

type Action =
  | { type: ActionEnum.FETCH_ALL_FEATURES }
  | { type: ActionEnum.FETCH_ALL_FEATURES_SUCCESSFUL; features: Feature[]; message: string }
  | { type: ActionEnum.FETCH_ALL_FEATURES_FAILED; message: string }
  | { type: ActionEnum.UPDATE_FEATURE }
  | { type: ActionEnum.UPDATE_FEATURE_SUCCESSFUL; message: string }
  | { type: ActionEnum.UPDATE_FEATURE_FAIL; message: string }
  | { type: ActionEnum.DELETE_FEATURE }
  | { type: ActionEnum.DELETE_FEATURE_SUCCESSFUL; deletedFeature: Feature; message: string }
  | { type: ActionEnum.DELETE_FEATURE_FAILED; message: string };

const initialState: State = { features: [], fetching: false, error: false, updating: false, message: "", deleting: false };

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionEnum.FETCH_ALL_FEATURES:
      return { ...state, fetching: true };
    case ActionEnum.FETCH_ALL_FEATURES_SUCCESSFUL:
      return { ...state, features: action.features, fetching: false, message: action.message, error: false };
    case ActionEnum.FETCH_ALL_FEATURES_FAILED:
      return { ...state, message: action.message, error: true };
    case ActionEnum.UPDATE_FEATURE:
      return { ...state, updating: true };
    case ActionEnum.UPDATE_FEATURE_SUCCESSFUL:
      return { ...state, updating: false, message: action.message, error: false };
    case ActionEnum.UPDATE_FEATURE_FAIL:
      return { ...state, message: action.message, error: true };
    case ActionEnum.DELETE_FEATURE:
      return { ...state, deleting: true };
    case ActionEnum.DELETE_FEATURE_SUCCESSFUL:
      return { ...state, deleting: false, message: action.message, error: false, deletedFeature: action.deletedFeature };
    case ActionEnum.DELETE_FEATURE_FAILED:
      return { ...state, deleting: true, message: action.message, error: true };
    default:
      return state;
  }
}

export default withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [features, setFeatures] = React.useState(state.features);
    const [showAlert, setShowAlert] = React.useState(false);

    const loadData = async () => {
      try {
        dispatch({
          type: ActionEnum.FETCH_ALL_FEATURES,
        });

        const response = await fetch(FETCH_ALL_EXISTS_FEATURE_API);
        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.FETCH_ALL_FEATURES_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.FETCH_ALL_FEATURES_SUCCESSFUL,
            features: results.data as Feature[],
            message: "Fetch feature successfull !!!",
          });
        }
      } catch (err) {
        alert(err.message);
      } finally {
      }
    };

    const deleteFeature = async (featureId: number) => {
      try {
        dispatch({
          type: ActionEnum.DELETE_FEATURE,
        });
        const response = await fetch(DELETE_FEATURE_API, {
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ featureId }),
        });

        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.DELETE_FEATURE_FAILED,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          await loadData();
          const data = results.data as Feature;
          dispatch({
            type: ActionEnum.DELETE_FEATURE_SUCCESSFUL,
            deletedFeature: data,
            message: `Delete ${data.title} feature successful`,
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

    const updateFeature = React.useCallback(async (featureId: number | undefined, feature: Feature) => {
      try {
        if (!featureId) return;
        dispatch({
          type: ActionEnum.UPDATE_FEATURE,
        });

        const { title, descriptions, image, sequence, show } = feature;
        const response = await fetch(UPDATE_FEATURE_API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ featureId, title, descriptions, image, sequence, show }),
        });

        if (response) {
          const results = await response.json();
          if (results.code != 0) {
            dispatch({
              type: ActionEnum.UPDATE_FEATURE_FAIL,
              message: results.message.sqlMessage,
            });

            throw Error(results.message.sqlMessage);
          }

          dispatch({
            type: ActionEnum.UPDATE_FEATURE_SUCCESSFUL,
            message: "Update comment sequence successful !!",
          });

          loadData();
        }
      } catch (err) {
        console.log(err);
      } finally {
        // setShowAlert(true);
      }
    }, []);

    React.useEffect(() => {
      loadData();
    }, []);

    React.useEffect(() => {
      const events = state.features.map((event) => ({
        ...event,
        createdDate: moment(event.createdDate).local().format("YYYY-MM-DD HH:mm"),
      }));
      setFeatures(events);
    }, [state.features]);

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
            { title: "Title", field: "title", cellStyle: { fontSize: 14 } },
            {
              title: "Descriptions",
              field: "descriptions",
              editable: "onUpdate",
              editComponent: (colProps) => (
                <FormControl
                  as="textarea"
                  value={colProps.rowData.descriptions}
                  onChange={(e: any) => colProps.onChange(e.currentTarget.value)}
                />
              ),
              render: (rowData) => (
                <p style={{ maxHeight: 50, overflow: "auto", wordBreak: "break-word", fontSize: 14 }}>
                  {rowData.descriptions}
                </p>
              ),
            },

            {
              title: "Show on client",
              render: (rowData) => (
                <Button
                  onClick={() => updateFeature(rowData.id, { ...rowData, show: rowData.show != 0 ? 0 : 1 })}
                  className="w-100"
                  style={{ fontSize: 14 }}
                  variant={rowData.show ? "success" : "outline-dark"}
                >
                  {rowData.show ? "Yes" : "No"}
                </Button>
              ),
              align: "center",
            },
            {
              title: "Sequence",
              field: "sequence",
              type: "numeric",
              editable: "onUpdate",
              cellStyle: { fontSize: 14 },
            },
            {
              title: "Image URL",
              field: "image",
              cellStyle: { fontSize: 14 },
              align: 'center',
              editComponent: (colProps) => (
                <FormControl
                  as="textarea"
                  value={colProps.rowData.image}
                  onChange={(e: any) => colProps.onChange(e.currentTarget.value)}
                />
              ),
              render: (rowData) => (
                <p style={{ maxHeight: 50, overflow: "auto", wordBreak: "break-word" }}>{rowData.image}</p>
              ),
            },
            {
              title: "Image",
              align: "center",
              render: (rowData) => <img src={preparedImageSrc(rowData.image)} width={64} height={64} />,
            },
            {
              title: "Created Date",
              field: "createdDate",
              type: "datetime",
              editable: "never",
              align: 'left',
              cellStyle: { fontSize: 14 },
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise(async (resolve, reject) => {
                if (!newData.id) return resolve();
                await updateFeature(newData.id, newData);
                resolve();
              });
            },
          }}
          data={features}
          actions={[
            {
              icon: "delete",
              iconProps: { color: "error" },
              tooltip: "Delete Feature",
              onClick: async (event, rowData) => {
                if (!Array.isArray(rowData) && rowData.id) {                      
                  const res = await confirm(`Do you want delete ${rowData.title} event`);
                  if(!res)  return;     
                  deleteFeature(rowData.id);
                }
              }
            },
          ]}
        />
      </>
    );
  })
);

// const prepareImageSrc = (uri: string | undefined) => {
//   if (!uri) return undefined;
//   if (uri.includes("https") || uri.includes("http")) {
//     return uri;
//   }
//   return IMAGE_STORAGE_API + uri;
// };
