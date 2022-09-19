import React, { useEffect, useState } from 'react';
import titleImage from '../../Assets/Backgrounds/cathedral.jpeg'
import { Route, Link } from 'react-router-dom';
import Missions from '../Missions/Missions';
import Game from '../Game/Game';
import BlackCatCity from "../../Assets/Models/BlackCatCity-Logo.png"
import './App.css';

const App = () => {

const [missionCount, setMissionCount] = useState<number>(0)
const [gameCount, setGameCount] = useState<number>(0)

    return (
      <div className='App'>
       
          <Route exact path='/' >
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