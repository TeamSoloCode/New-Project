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
        {console.log("feature:",features)}
			<div className="feature_area section_gap_top">
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

// export default class FeatureComponent extends React.Component<IFeatureComponentProps> {

//   public render() {
//     return (
// 			<div className="feature_area section_gap_top">
// 				<div className="container">
// 					<div className="row justify-content-center">
// 						<div className="col-lg-5">
// 							<div className="main_title">
// 								<h3 className="mb-3">CÁC TÍNH NĂNG CỦA SÀN WEFINEX</h3>
// 								<p>Dễ dàng giao dịch và gia tang tài sản trong tích tắc</p>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="row">
// 						<ItemFeatureComponent
// 							title={'CÁC CÔNG CỤ GIAO DỊCH CHUYÊN NGHIỆP '}
// 							description={
// 								'Nhanh chóng có được cái nhìn sâu sắc về biến động thị trường . Ra quyết định chính xác và kiếm lời trong phút chốc'
// 							}></ItemFeatureComponent>
// 						<ItemFeatureComponent
// 							title={'DEMO KHÔNG GIỚI HẠN'}
// 							description={
// 								'Bạn luôn có thể cải thiện kỹ năng giao dịch của mình trên tài khoản demo và kiếm tiền sau khi hoàn thiện chiến lược của mình.'
// 							}></ItemFeatureComponent>
// 						<ItemFeatureComponent
// 							title={'HỢP ĐỒNG THÔNG MINH TRÊN BLOCKCHAIN'}
// 							description={
// 								'Sử dụng hợp đồng thông minh trên Blockchain, chúng tôi tạo ra một môi trường an toàn và mình bạch để bảo vệ tài sản của bạn.'
// 							}></ItemFeatureComponent>
// 						<ItemFeatureComponent
// 							title={'THU NHẬP KHÔNG GIỚI HẠN'}
// 							description={
// 								'Chương trình khuyến mãi và lien kết sang tạo giúp bạn kiếm tiền ngay cả khi đang ngủ.'
// 							}></ItemFeatureComponent>
// 						<ItemFeatureComponent
// 							title={'SỬ DỤNG NHIỀU LOẠI TIỀN VÀ TÀI SẢN'}
// 							description={
// 								'Sử dụng hợp đồng thông minh trên Blockchain, chúng tôi tạo ra một môi trường an toàn và mình bạch để bảo vệ tài sản của bạn.'
// 							}></ItemFeatureComponent>
// 					</div>
// 				</div>
// 			</div>
// 		);
//   }
// }
