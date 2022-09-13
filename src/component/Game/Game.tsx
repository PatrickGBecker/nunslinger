import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Player from '../Characters/Player';
import Enemy from '../Characters/Enemy';
import gunTrigger from '../../Assets/Models/trigger.png'
import gamePage from '../../Assets/Backgrounds/battlePage.jpeg'
import '../../Assets/Music/testMusic.mp3';
import './Game.css';

interface IAppProps {
    celebration: string
  };

class Game extends React.Component<IAppProps> {
    constructor(props: IAppProps) {
        super(props)

        this.state = {
            missionCount: 0,
            gameCount: 0,
            playerHealth: 5,
            enemyHealth: 5,
            playerShotFirst: false,
            enemyShotFirst: false,
            celebration: ''
        }
    }

    // handleChange = () => {
    //     return (
           
    //     )
    // }

    render() {
        
        return (
            <section className='game' style={{backgroundImage: `url(${gamePage}`}}>
                <ReactPlayer
                    className='music-player'
                    url={'../../Assets/Music/testMusic.mp3'}
                    width='0vw'
                    height='0vh'
                    volume={0.3}
                    loop={true}
                />

                <h1>{this.props.celebration}</h1>

                <div className='health-bar-container'>
                    <div className='player-health-bar'>💃</div>
                    <div className='enemy-health-bar'>😈</div>
                </div>

                <img className='trigger-button' src={gunTrigger} alt='gun trigger avatar'/>

                <Player />
                <Enemy />
                <div className='button-style'>
                    <Link to='/missions'>
                        <button className='next-mission-button'>Next Mission</button>
                    </Link>

                    <Link to='/'>
                        <button className='back-to-main-page'>Retire from Hunting?</button>
                    </Link>
                </div>
            </section>
        )
    }
    
}

export default Game;