import React, {Component} from 'react';
//css
import './game-field.css';
//redux
import { connect }  from 'react-redux';
//actions
import { onItemClick }  from '../../actions/actions';
//components
import Spinner from '../spinner'

class GameField extends Component {

	renderGameField(data, modeSettings) {
		if (this.props.itemsLoading) {
			return <Spinner />
		}
		const items = data.map((item) => {
			const { id, blue, green, red } = item;
			let classNames = 'game-btn-default';
		  if (blue) {classNames += ' item-blue'}
		  if (red) {classNames += ' item-red'}
		  if (green) {classNames += ' item-green'}	  
			return (
				<button
				key={id}
				className={classNames}
				onClick={() => this.props.onItemClick(id)}>						
				</button>
			)
		})
		const { field } = modeSettings;
		const { itemsLoading } = this.props;
		let clazz = 'game-container';
		  if (field === 5) {clazz  += ' easy-field'}
		  if (field === 10) {clazz  += ' normal-field'}
		  if (field === 15) {clazz  += ' hard-field'}
		return (
			<div className={clazz}>
				{items}			
			</div>
		)
	};

	render() {
		const { buttons, modeSettings } = this.props;
		const items = this.renderGameField(buttons, modeSettings); 
		return (
			<div className="row">
				<div className="col-md-12">
					{items}
				</div> 	
			</div>
		)
	}
};

const mapStateToProps = ({ buttons, modeSettings, itemsLoading }) => {
  return { buttons, modeSettings, itemsLoading }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	onItemClick: (id) => dispatch(onItemClick(id))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameField);