import React, { Component } from 'react';
import titleImage from '../../Assets/Backgrounds/cathedral.jpeg'
import { Route, Link, Switch } from 'react-router-dom';
import fetchApiData from '../fetch/fetchApiData';
import Missions from '../Missions/Missions';
import Game from '../Game/Game';
import './App.css';

interface IAppProps {
  celebration: string
};

interface IState {
  celebration: string
}

class App extends React.Component<IAppProps, IState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      celebration: ''
    }
  }

  componentDidMount = () => {
    fetchApiData()
    .then(data => {
      this.setState({celebration: data.celebrations[0].title})
    })
    // .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  render() {
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
            <Game celebration={this.state.celebration}/>
          </Route>
        
      </div>
    );

  }
}

export default App;
