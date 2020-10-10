import * as React from 'react';
import ItemOurAdvantageComponent from './item-our-advantage-component/item-our-advantage-component';
import './our-advantage-component.css';
import eventImage from  '../../../assets/images/icons/Event.jpg'
export interface IOurAdvantageComponentProps {
}

export default class OurAdvantageComponent extends React.Component<IOurAdvantageComponentProps> {
  public render() {
    return (
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
						<ItemOurAdvantageComponent
							imageHead={eventImage}
							title={'Đào tạo kỹ thuật trade miễn phí'}
							description={'Được chuyên gia đào tạo theo mô hình 1 kèm 1'}></ItemOurAdvantageComponent>
						<ItemOurAdvantageComponent
							imageHead={eventImage}
							title={'Chuyên gia đọc lệnh cho bạn '}
							description={
								'Đánh lệnh theo chuyên gia sẽ mang đến tỷ lệ win cho bạn trên 90%'
							}></ItemOurAdvantageComponent>
						<ItemOurAdvantageComponent
							imageHead={eventImage}
							title={'Tứ trụ MVAGROUP giúp bạn phát triển hệ thống '}
							description={
								'Hệ thống của bạn sẽ vững mạnh, giúp bạn gia tăng thu nhập theo từng ngày '
							}></ItemOurAdvantageComponent>
					</div>
				</div>
			</div>
		);
  }
}
