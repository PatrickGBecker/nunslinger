import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Player from '../Characters/Player';
import Enemy from '../Characters/Enemy';
import gunTrigger from '../../Assets/Models/trigger.png'
import '../../Assets/Music/testMusic.mp3';
import './Game.css';

type Props = {};

class Game extends Component<Props> {
    constructor(props: Props) {
        super(props)

        this.state = {
            missionCount: 0,
            gameCount: 0,
            playerHealth: 5,
            enemyHealth: 5,
            playerShotFirst: false,
            enemyShotFirst: false,
        }
    }


    
    render() {
        
        return (
            <section className='game'>
                <ReactPlayer
                    className='music-player'
                    url={'../../Assets/Music/testMusic.mp3'}
                    width='0vw'
                    height='0vh'
                    volume={0.3}
                    loop={true}
                    />
                <h1>test</h1>
                <div className='health-bar-container'>
                    <div className='player-health-bar'> </div>
                      <img className='player-model' src='💃' alt='nun emoji'/>
                    <div className='enemy-health-bar'> </div>
                      <img className='enemy-model' src='😈' alt='demon emoji'/>
                </div>
                <img className='trigger-button' src={gunTrigger} alt='gun trigger avatar'/>
                <Player />
                <Enemy />
                <Link to='/missions'>
                    <button className='next-mission-button'>Next Mission</button>
                </Link>
                <Link to='/'>
                    <button className='back-to-main-page'>Retire from Hunting?</button>
                </Link>
            </section>
        )
    }
    
}

export default Game;