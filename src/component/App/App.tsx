import React, { useEffect, useState } from 'react';
import titleImage from '../../Assets/Backgrounds/cathedral.jpeg'
import { Route, Link } from 'react-router-dom';
import Missions from '../Missions/Missions';
import fetchApiData from '../fetch/fetchApiData';
import Game from '../Game/Game';
import './App.css';

const App = () => {

const [celebration, setCelebration] = useState<string>('')

useEffect(() => {
  fetchApiData()
    .then(data => {
      console.log("data: ", data)
      setCelebration( data.celebrations[0].title )
    })
    // .then(data => console.log(data))
    .catch(err => console.log(err))
}, [])

    return (
      <div className='App'>
       
          <Route exact path='/' >
            <div className='title-page' style={{backgroundImage: `url(${titleImage}`}}>
              <h1 className='main-title'>NUNSLINGER</h1>
              <Link to='/missions'>
                <button className='play-game-button'>Confess Your Sins</button>
              </Link>
            </div>
          </Route>

          <Route exact path='/missions'>
           <Missions />
          </Route>

          <Route exact path='/game'>
            <Game celebration={celebration}/>
          </Route>
        
      </div>
    );
  }


export default App;
