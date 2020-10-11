import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { FETCH_ALL_FEATURE_API } from '../../../api/API';
import Feature from '../../../models/Feature';
import './feature-component.css';
import ItemFeatureComponent from './item-feature-component/item-feature-component';
export interface IFeatureComponentProps {}
interface State {
	features: Feature[];
	fetching: boolean;
	error: boolean;
	message: string;
}

enum ActionEnum {
	FETCH_ALL_FEATURE,
	FETCH_ALL_FEATURE_SUCCESSFUL,
	FETCH_ALL_FEATURE_FAILED,
}

type Action =
	| { type: ActionEnum.FETCH_ALL_FEATURE }
	| { type: ActionEnum.FETCH_ALL_FEATURE_SUCCESSFUL; features: Feature[]; message: string }
	| { type: ActionEnum.FETCH_ALL_FEATURE_FAILED; message: string };

const initialState: State = { features: [], fetching: false, error: false, message: '' };

function reducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case ActionEnum.FETCH_ALL_FEATURE:
			return { ...state, fetching: true };
		case ActionEnum.FETCH_ALL_FEATURE_SUCCESSFUL:
			return { ...state, features: action.features, fetching: false, message: action.message, error: false };
		case ActionEnum.FETCH_ALL_FEATURE_FAILED:
			return { ...state, message: action.message, error: true };
		default:
			throw new Error();
	}
}
export const FeatureComponent = withRouter(
	React.memo((props: any) => {
		const [state, dispatch] = React.useReducer(reducer, initialState);
		const [features, setFeature] = React.useState(state.features);

		const loadData = async () => {
			try {
				dispatch({
					type: ActionEnum.FETCH_ALL_FEATURE,
				});

				const response = await fetch(FETCH_ALL_FEATURE_API);
				if (response) {
					const results = await response.json();
					if (results.code != 0) {
						dispatch({
							type: ActionEnum.FETCH_ALL_FEATURE_FAILED,
							message: results.message.sqlMessage,
						});

						throw Error(results.message.sqlMessage);
					}

					dispatch({
						type: ActionEnum.FETCH_ALL_FEATURE_SUCCESSFUL,
						features: results.data as Feature[],
						message: 'Fetch feature successfull !!!',
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
      const feature = state.features;
			setFeature(feature);
		}, [state.features]);

    return (
      <>
			<div className="pb-4 pt-4">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-5">
							<div className="main_title">
								<h3 className="mb-3">CÁC TÍNH NĂNG CỦA SÀN WEFINEX</h3>
								<p>Dễ dàng giao dịch và gia tang tài sản trong tích tắc</p>
							</div>
						</div>
					</div>
					<div className="row">
						{features.map((valueFeature, indexFeature) => (
              <ItemFeatureComponent key={indexFeature}
                image={valueFeature.image}
								title={valueFeature.title}
								description={valueFeature.descriptions
								}></ItemFeatureComponent>
						))}
					</div>
				</div>
        </div>
        </>
		);
	})
);

