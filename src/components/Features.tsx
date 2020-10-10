import * as React from "react";
import { Feature } from "src/ModelDeclare";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import MaterialTable from "material-table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FETCH_ALL_FEATURES_API, UPDATE_FEATURE_API } from "../api/APIs";
import { preparedImageSrc } from "../utils";

interface State {
  features: Feature[];
  fetching: boolean;
  updating: boolean;
  error: boolean;
  message: string;
}

enum ActionEnum {
  FETCH_ALL_FEATURES,
  FETCH_ALL_FEATURES_SUCCESSFUL,
  FETCH_ALL_FEATURES_FAILED,
  UPDATE_FEATURE,
  UPDATE_FEATURE_SUCCESSFUL,
  UPDATE_FEATURE_FAIL,
}

type Action =
  | { type: ActionEnum.FETCH_ALL_FEATURES }
  | { type: ActionEnum.FETCH_ALL_FEATURES_SUCCESSFUL; features: Feature[]; message: string }
  | { type: ActionEnum.FETCH_ALL_FEATURES_FAILED; message: string }
  | { type: ActionEnum.UPDATE_FEATURE }
  | { type: ActionEnum.UPDATE_FEATURE_SUCCESSFUL; message: string }
  | { type: ActionEnum.UPDATE_FEATURE_FAIL; message: string };

const initialState: State = { features: [], fetching: false, error: false, updating: false, message: "" };

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
    default:
      return state;
  }
}

export default withRouter(
  React.memo((props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [features, setFeatures] = React.useState(state.features);

    const loadData = async () => {
      try {
        dispatch({
          type: ActionEnum.FETCH_ALL_FEATURES,
        });

        const response = await fetch(FETCH_ALL_FEATURES_API);
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
            message: "Fetch event successfull !!!",
          });
        }
      } catch (err) {
        alert(err.message);
      } finally {
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
