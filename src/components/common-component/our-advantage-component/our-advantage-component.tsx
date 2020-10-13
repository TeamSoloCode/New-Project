import * as React from 'react';
import ItemOurAdvantageComponent from './item-our-advantage-component/item-our-advantage-component';
import './our-advantage-component.css';
import Benefit from '../../../models/Benefit';
import { withRouter } from 'react-router-dom';
import { FETCH_ALL_BENEFIT_API } from '../../../api/API';
export interface IOurAdvantageComponentProps {}

interface State {
	benefits: Benefit[];
	fetching: boolean;
	error: boolean;
	message: string;
}

enum ActionEnum {
	FETCH_ALL_BENEFIT,
	FETCH_ALL_BENEFIT_SUCCESSFUL,
	FETCH_ALL_BENEFIT_FAILED,
}

type Action =
	| { type: ActionEnum.FETCH_ALL_BENEFIT }
	| { type: ActionEnum.FETCH_ALL_BENEFIT_SUCCESSFUL; benefits: Benefit[]; message: string }
	| { type: ActionEnum.FETCH_ALL_BENEFIT_FAILED; message: string };

const initialState: State = { benefits: [], fetching: false, error: false, message: '' };

function reducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case ActionEnum.FETCH_ALL_BENEFIT:
			return { ...state, fetching: true };
		case ActionEnum.FETCH_ALL_BENEFIT_SUCCESSFUL:
			return { ...state, benefits: action.benefits, fetching: false, message: action.message, error: false };
		case ActionEnum.FETCH_ALL_BENEFIT_FAILED:
			return { ...state, message: action.message, error: true };
		default:
			throw new Error();
	}
}
export const OurAdvantageComponent = withRouter(
	React.memo((props: any) => {
		const [state, dispatch] = React.useReducer(reducer, initialState);
		const [benefits, setBenefit] = React.useState(state.benefits);

		const loadData = async () => {
			try {
				dispatch({
					type: ActionEnum.FETCH_ALL_BENEFIT,
				});

				const response = await fetch(FETCH_ALL_BENEFIT_API);
				if (response) {
					const results = await response.json();
					if (results.code != 0) {
						dispatch({
							type: ActionEnum.FETCH_ALL_BENEFIT_FAILED,
							message: results.message.sqlMessage,
						});

						throw Error(results.message.sqlMessage);
					}

					dispatch({
						type: ActionEnum.FETCH_ALL_BENEFIT_SUCCESSFUL,
						benefits: results.data as Benefit[],
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
			const benefits = state.benefits;
			setBenefit(benefits);
		}, [state.benefits]);

		return (
			<>
				<div className="popular_courses">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-7 col">
								<div className="main_title">
									<h3 className="mb-3">
										Tham gia cùng TỨ TRỤ MVA để trở thành một Nhà Giao dịch thành công ngay hôm nay!
									</h3>
									{/* <p></p> */}
								</div>
							</div>
						</div>
						<div className="row">
							{benefits.map((valBenefit, indBenefit) => (
								<ItemOurAdvantageComponent key={indBenefit}
									imageHead={valBenefit.image}
									title={valBenefit.title}
									description={valBenefit.descriptions}></ItemOurAdvantageComponent>
							))}
						</div>
					</div>
				</div>
			</>
		);
	})
);
