import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Player from '../Characters/Player';
import Enemy from '../Characters/Enemy';
import gunTrigger from '../../Assets/Models/trigger.png'
import gamePage from '../../Assets/Backgrounds/battlePage.jpeg'
import './Game.css';
// import HealthBar from '../HealthBar/HealthBar'
const music = require('../../Assets/Music/testMusic.mp3');

interface Iprops{
    celebration: string
}

const Game = (props: Iprops) => {

const [instructions, setInstructions] = useState<any>(false)
const [missionCount, setmissionCount] = useState<number>(0)
const [gameCount, setGameCount] = useState<number>(0)
const [shotFirst, setShotFirst] = useState<boolean>(false)
let gameInstructions:any

// const setTimeout(() => {
    
// }, timeout);


const hideInstructions = () => {
    setInstructions(false)
}

useEffect(() => {
    if (gameCount === 0){
        setInstructions(true)
    }
}, [])

useEffect(() => {
    
    if (gameCount === 0 || instructions === true) {
        gameInstructions = () => {return(
            <div className="game-instructions">
                instructions go here
            </div>
        )}
    } else {
        gameInstructions = ''
    }
    return gameInstructions
}, [gameCount, instructions])

//save it as a variable that only renders the div if both conditions are met, put the instructions in the useeffect div


    return (
        <div className="game-background">
            <section className='game' style={{ backgroundImage: `url(${gamePage}` }}>
                <ReactPlayer
                    className='music-player'
                    url={music}
                    width='0vw'
                    height='0vh'
                    volume={0.1}
                    loop={true}
                    playing={true}
                />

                <h1></h1>

                <div className='health-bar-container'>
                    <div className='player-health-bar'>💃</div>
                    <div className='enemy-health-bar'>😈</div>
                </div>

                <img className='trigger-button' src={gunTrigger} alt='gun trigger avatar' />
                <div className="model-container">
                    <Player />
                    <Enemy />
                </div>
                <div className='button-style'>
                    <Link to='/missions'>
                        <button className='next-mission-button'>Next Mission</button>
                    </Link>

                    <Link to='/'>
                        <button className='back-to-main-page'>Retire from Hunting?</button>
                    </Link>
                    {gameInstructions}
                    <button className='dismiss-instructions-button' onClick={hideInstructions}>Less reading, more shooting</button>
                </div>
            </section>
        </div>
    )
}


export default Game;