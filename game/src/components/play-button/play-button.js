import React, {Component} from 'react';
//css
import './play-button.css';
//redux
import { connect }  from 'react-redux';
//actions
import { onPlayClick }  from '../../actions/actions';

class PlayButton extends Component {

	startGame = () => {
		const { delay } = this.props.modeSettings;
		this.props.buttonAction();
		if (this.props.playButton === true) {
			setTimeout(() => this.props.game(), 0)
		}
	};
  render() {
  	const { playButton } = this.props;
		return (
			<div className="col-md-4">
				<div className="btn-container">
					<button type="button"
						className="play-btn"
						onClick={this.startGame}>
							{ playButton ? 'PLAY' : 'PLAY AGAIN' }
					</button>
				</div>
			</div>
		)
	}	
}

const mapStateToProps = ({ playButton, modeSettings }) => {
  return { playButton, modeSettings }
};
const mapDispatchToProps = (dispatch) => {
  return {
  	buttonAction: () => dispatch(onPlayClick())
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);