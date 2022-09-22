import React, { useEffect, useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Missions from '../Missions/Missions';
import Game from '../Game/Game';
import './App.css';
const DeathTheme = require('../../Assets/Music/death-theme.mp3')

const App = () => {

  const [missionCount, setMissionCount] = useState<number>(0)
  const [gameCount, setGameCount] = useState<number>(0)

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/nunslinger/' >
          <div className='title-page'>
            <h1 className='main-title'>NUNSLINGER</h1>
            <Link to='/missions'>
              <div className='play-game-button-container'>
                <button className='play-game-button'>Confess Your Sins</button>
              </div>
            </Link>
            <div className='logo-container'>
              <p>©Black Cat City Gameworks, LLC 2022</p>
            </div>
          </div>
        </Route>

        <Route exact path='/nunslinger/missions'>
          <Missions missionCount={missionCount} gameCount={gameCount} />
        </Route>

        <Route exact path='/nunslinger/game'>
          <Game
            missionCount={missionCount}
            gameCount={gameCount}
            setMissionCount={setMissionCount}
            setGameCount={setGameCount} />
        </Route>
        <Route render={() => <h1>This Path Does Not Exist!</h1>} />
      </Switch>

    </div>
  );
}


export default App;