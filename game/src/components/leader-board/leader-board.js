import React, {Component} from 'react';
//css
import './leader-board.css';
//redux
import { connect }  from 'react-redux';
//actions
import { loadWinners }  from '../../actions/actions';
//components
import Spinner from '../spinner'

class LeaderBoard extends Component {		

	componentDidMount() {
		this.props.loadWinners();	
	};

	renderWinners(data) {
    if (this.props.loading) {
    	return <Spinner />
    }
		return data.map((item) => {
			return (			
        <li className="list-group-item" key={item.id}>
          <span>{item.winner}</span>
          <span className="list-date">{item.date}</span>
        </li>        
			)	
		})
	};
		
	render() {
		const { winners } = this.props;
		const winnersList = this.renderWinners(winners);
		return (		
			<div className="col-md-5">
				<div className="leader-board">
					<h2>Leader Board</h2>
					<ul className="list-group">
						{winnersList}
					</ul>			
				</div>
			</div>
		)
	};
};

const mapStateToProps = ({ winners, loading }) => {
  return { winners, loading }
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { service } = ownProps;
  	return {
    	loadWinners: () => dispatch(loadWinners())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);


