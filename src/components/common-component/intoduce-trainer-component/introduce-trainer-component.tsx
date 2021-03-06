import * as React from 'react';
import ItemIntroduceTrainerComponent from './item-introduce-trainer-component/item-introduce-trainer-component';
import './introduce-trainer-component.css';
import { dataTrainer } from '../../../data-test/data-test';

export interface IIntroduceTrainerComponentProps {
}

export interface IIntroduceTrainerComponentState {
}

export default class IntroduceTrainerComponent extends React.Component<IIntroduceTrainerComponentProps, IIntroduceTrainerComponentState> {
  constructor(props: IIntroduceTrainerComponentProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
			<div className="jumbotron bg-white">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-5">
							<div className="main_title">
								<h2 className="mb-3">Our Expert Trainers</h2>
								<span>Replenish man have thing gathering lights yielding shall you</span>
							</div>
						</div>
					</div>
					<div className="row">
						{dataTrainer.map((valueTrainer, indexTrainer) => (
							<ItemIntroduceTrainerComponent key={indexTrainer} name={valueTrainer.name} position={valueTrainer.position} overview={valueTrainer.overview} imageSrc={valueTrainer.imageSrc}></ItemIntroduceTrainerComponent>
						))}
					</div>
				</div>
			</div>
		);
  }
}
