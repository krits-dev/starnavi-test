import React, {Component} from 'react';
//css
import './player-name.css';
//redux
import { connect }  from 'react-redux';
//actions
import { changeName } from '../../actions/actions';

class PlayerName extends Component {

	onNameChange = (event) => {
		const value = event.target.value;
		this.props.nameAction(value);
	}

	render() {
		const { playerName } = this.props;
		return (
			<div className="col-md-4">
				<div className="name-input">
					<input type="text"
		        className="player-name"
		        placeholder="Enter your name"
		        value={playerName}
		        onChange={this.onNameChange} />
	      </div>  
			</div>
		)
	};
};

const mapStateToProps = ({ playerName }) => {
  return { playerName }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	nameAction: (value) => dispatch(changeName(value))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerName);