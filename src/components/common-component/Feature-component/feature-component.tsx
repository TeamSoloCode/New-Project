import * as React from 'react';
import './feature-component.css';
import ItemFeatureComponent from './item-feature-component/item-feature-component';
export interface IFeatureComponentProps {
}

export default class FeatureComponent extends React.Component<IFeatureComponentProps> {
  public render() {
    return (
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
						<ItemFeatureComponent
							title={'CÁC CÔNG CỤ GIAO DỊCH CHUYÊN NGHIỆP '}
							description={
								'Nhanh chóng có được cái nhìn sâu sắc về biến động thị trường . Ra quyết định chính xác và kiếm lời trong phút chốc'
							}></ItemFeatureComponent>
						<ItemFeatureComponent
							title={'DEMO KHÔNG GIỚI HẠN'}
							description={
								'Bạn luôn có thể cải thiện kỹ năng giao dịch của mình trên tài khoản demo và kiếm tiền sau khi hoàn thiện chiến lược của mình.'
							}></ItemFeatureComponent>
						<ItemFeatureComponent
							title={'HỢP ĐỒNG THÔNG MINH TRÊN BLOCKCHAIN'}
							description={
								'Sử dụng hợp đồng thông minh trên Blockchain, chúng tôi tạo ra một môi trường an toàn và mình bạch để bảo vệ tài sản của bạn.'
							}></ItemFeatureComponent>
						<ItemFeatureComponent
							title={'THU NHẬP KHÔNG GIỚI HẠN'}
							description={
								'Chương trình khuyến mãi và lien kết sang tạo giúp bạn kiếm tiền ngay cả khi đang ngủ.'
							}></ItemFeatureComponent>
						<ItemFeatureComponent
							title={'SỬ DỤNG NHIỀU LOẠI TIỀN VÀ TÀI SẢN'}
							description={
								'Sử dụng hợp đồng thông minh trên Blockchain, chúng tôi tạo ra một môi trường an toàn và mình bạch để bảo vệ tài sản của bạn.'
							}></ItemFeatureComponent>
					</div>
				</div>
			</div>
		);
  }
}
