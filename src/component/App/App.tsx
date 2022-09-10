import React, { Component } from 'react';
import titleImage from '../../Assets/Backgrounds/cathedral.jpeg'
import { Route, Link } from 'react-router-dom';
import fetchApiData from '../fetch/fetchApiData';
import './App.css';

console.log(fetchApiData())

type Props = {};


class App extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }


  render() {
    return (
      <div className='App'>
          <Route exact path='/' />
            <section className='title-page'>'
              <img className='title-image' src={titleImage} alt='A creepy view of a cathedral'/>
              <h1 className='main-title'>NUNSLINGER</h1>
              <Link to='/missions'>
                <button className='play-game-button'>Play Game</button>
              </Link>
            </section>

    
      </div>
    );

  }
}

export default App;
