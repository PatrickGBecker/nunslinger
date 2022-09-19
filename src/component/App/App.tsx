import React, { useEffect, useState } from 'react';
import titleImage from '../../Assets/Backgrounds/cathedral.jpeg'
import { Route, Link } from 'react-router-dom';
import Missions from '../Missions/Missions';
import Game from '../Game/Game';
import './App.css';

const App = () => {

const [missionCount, setMissionCount] = useState<number>(0)
const [gameCount, setGameCount] = useState<number>(0)

    return (
      <div className='App'>
       
          <Route exact path='/' >
            <div className='title-page' style={{backgroundImage: `url(${titleImage}`}}>
              <h1 className='main-title'>NUNSLINGER</h1>
              <Link to='/missions'>
                <button className='play-game-button'>Confess Your Sins</button>
              </Link>
              <p>©  Gameworks Studios LLC Incorporated 2022</p>
            </div>
          </Route>

          <Route exact path='/missions'>
           <Missions missionCount={missionCount} gameCount={gameCount}/>
          </Route>

          <Route exact path='/game'>
            <Game 
            missionCount={missionCount}
            gameCount={gameCount} 
            setMissionCount={setMissionCount} 
            setGameCount={setGameCount}/>
          </Route>
        
      </div>
    );
  }


export default App;