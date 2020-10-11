import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FETCH_ALL_COMMENT_API } from '../../../api/API';
import ItemClientCommentComponent from './item-client-comment-component/item-client-comnent-component';
import './client-comment-component.css';
import { AnonymousComment } from 'src/models/AnonymousComment';
import ItemClientCommentFullComponent from './item-client-comment-full-component/item-client-comment-full-component';

interface State {
	comment: AnonymousComment[];
	fetching: boolean;
	error: boolean;
	message: string;
}

enum ActionEnum {
	FETCH_ALL_COMMENT,
	FETCH_ALL_COMMENT_SUCCESSFUL,
	FETCH_ALL_COMMENT_FAILED,
}

type Action =
	| { type: ActionEnum.FETCH_ALL_COMMENT }
	| { type: ActionEnum.FETCH_ALL_COMMENT_SUCCESSFUL; comment: AnonymousComment[]; message: string }
	| { type: ActionEnum.FETCH_ALL_COMMENT_FAILED; message: string };

const initialState: State = { comment: [], fetching: false, error: false, message: '' };

function reducer(state: State = initialState, action: Action): State {
	switch (action.type) {
		case ActionEnum.FETCH_ALL_COMMENT:
			return { ...state, fetching: true };
		case ActionEnum.FETCH_ALL_COMMENT_SUCCESSFUL:
			return { ...state, comment: action.comment, fetching: false, message: action.message, error: false };
		case ActionEnum.FETCH_ALL_COMMENT_FAILED:
			return { ...state, message: action.message, error: true };
		default:
			throw new Error();
	}
}

export const ClientCommentComponent = withRouter(
	React.memo((props: any) => {
		const [state, dispatch] = React.useReducer(reducer, initialState);
		const [comment, setComment] = React.useState(state.comment);

		const loadData = async () => {
			try {
				dispatch({
					type: ActionEnum.FETCH_ALL_COMMENT,
				});

				const response = await fetch(FETCH_ALL_COMMENT_API);
				if (response) {
					const results = await response.json();
					if (results.code != 0) {
						dispatch({
							type: ActionEnum.FETCH_ALL_COMMENT_FAILED,
							message: results.message.sqlMessage,
						});

						throw Error(results.message.sqlMessage);
					}

					dispatch({
						type: ActionEnum.FETCH_ALL_COMMENT_SUCCESSFUL,
						comment: results.data as AnonymousComment[],
						message: 'Fetch comment successfull !!!',
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
			const comments = state.comment;
			setComment(comments);
		}, [state.comment]);

		let arrTmp: any[] = [];
		let arrEvent: any[] = [];
		comment.map((valEv, ind) => {
			if (valEv.show == 1) {
				arrTmp.push(valEv);
				
      }
      
    });
    let arr: any[] = [];
    arrTmp.map((vl, inde) => {
      arr.push(vl);
      if (arr.length === 2) {
        arrEvent.push(arr);
        arr = [];
      }
      if (inde === arrTmp.length - 1) {
        arr.push(arrTmp[0]);
         arrEvent.push(arr);
					arr = [];
      }

    })

		return (
			<>
				<div className="pb-4 pt-4 bg-white">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-5">
								<div className="main_title">
									<h3 className="mb-3">CÁC DOANH NHÂN ĐANG NÓI GÌ VỀ MVAGROUP</h3>
									<p>Bạn sẽ trở thành thành viên MVAGroup từng bước trở thành doanh nhân Tài Chính</p>
								</div>
							</div>
						</div>
					</div>
					<div className="container container-custom">
						<div className="row">
							<div className="testi_slider owl-carousel owl-loaded owl-drag">
								<div className="owl-stage-outer">
									<Carousel>
										{arrEvent.map((valueEvent, indexEvent) => (
											<Carousel.Item key={indexEvent}>
												<div className="container ">
													<div className="row">
														{valueEvent.map((vl: AnonymousComment, ind: number) => (
															<ItemClientCommentComponent
																userImage={vl.userImage}
																userName={vl.name}
																content={vl.contents}
																key={ind}></ItemClientCommentComponent>
														))}
													</div>
												</div>
											</Carousel.Item>
										))}
									</Carousel>
								</div>
							</div>
						</div>
					</div>
					<div className="container w-100 text-center">
						<button className="btn primary-btn2" data-toggle="modal" data-target="#myModal">
							{' '}
							Hiển thị tất cả bình luận
						</button>
					</div>
				</div>

				<div className="modal" id="myModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Bình luận</h4>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body" style={{ height: '500px', overflow: 'auto' }}>
								{comment.map((valueEvent, indexEvent) =>
									valueEvent.show == 1 ? (
										<ItemClientCommentFullComponent
											userImage={valueEvent.userImage}
											userName={valueEvent.name}
											content={valueEvent.contents}
											key={indexEvent}
											createDate={valueEvent.createdDate}></ItemClientCommentFullComponent>
									) : (
										<div></div>
									)
								)}
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">
									Đóng
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	})
);
