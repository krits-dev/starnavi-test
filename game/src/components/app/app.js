import React, {Component} from 'react';
//components
import LeaderBoard from '../leader-board';
import GamePage from '../game-page';

 class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <GamePage />  
          <LeaderBoard />       
        </div>
      </div>
    )
  }
};

export default App;