import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Player from '../Characters/Player';
import Enemy from '../Characters/Enemy';
import gunTrigger from '../../Assets/Models/trigger.png'
import gamePage from '../../Assets/Backgrounds/battlePage.jpeg'
import fireFont from '../../Assets/Fonts/FIRE.gif'
import './Game.css';
// import HealthBar from '../HealthBar/HealthBar'
const music = require('../../Assets/Music/testMusic.mp3');

interface Props{
    celebration: string
}

const Game = (props: Props) => {

const [instructions, setInstructions] = useState<any>(false)
const [missionCount, setMissionCount] = useState<number>(0)
const [gameCount, setGameCount] = useState<number>(0)
const [playerShotFirst, setPlayerShotFirst] = useState<boolean>(false)
const [enemyShotFirst, setEnemyShotFirst] = useState<boolean>(false)
const [fireImage, setFireImage] = useState<string>('')
const [fireIndicatorDate, setFireIndicatorDate] = useState<number>(0)
const [enemyShotDate, setEnemyShotDate] = useState<number>(0)
const [playerShotDate, setPlayerShotDate] = useState<number>(0)



const hideInstructions = () => {
    setInstructions(false)
}

useEffect(() => {
    if (gameCount === 0){
        setInstructions(true)
    } else {
    startGame() }
}, [])

const startGame = () => {

    startTurn()
}

const startTurn = () => {

    fireIndicator()
    enemyShoot()
    capturePlayerShot()
    compareShots()
}

const closeInstructionsStartGame = () => {
    hideInstructions()
    startGame()
}

const viewInstructions = () => {
    
    if (gameCount === 0 && instructions === true) {
        return (
            <div className="game-instructions">
                <h1>instructions go here</h1>
                <button className='dismiss-instructions-button' onClick={closeInstructionsStartGame}>Less reading, more shooting</button>
            </div>
        )
    } else {
        return null;
    }
}

const fireRandomizer = ():number => {
    let min = Math.ceil(1000);
    let max = Math.floor(5000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fireIndicatorHelper = () => {
    setFireIndicatorDate(Date.now())
    setFireImage(fireFont)
}

const fireIndicator:any = () => {
    setTimeout(fireIndicatorHelper, fireRandomizer())
}

const shotRandomizer = (minTime:number, maxTime:number) => {
    let min = Math.ceil(minTime);
    let max = Math.floor(maxTime);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const enemyShotHelper = () => {
    setEnemyShotDate(Date.now())
}

const enemyShoot:any = () => {
    setTimeout(enemyShotHelper, shotRandomizer(1200, 1400))
}

const capturePlayerShot = () => {
    setPlayerShotDate(Date.now())
}

const compareShots = () => {
    let subtractedPlayerDate = playerShotDate - fireIndicatorDate
    let subtractedEnemyDate = enemyShotDate - fireIndicatorDate
    
    if (subtractedPlayerDate > subtractedEnemyDate) {
        setEnemyShotFirst(true)
        setPlayerShotFirst(false)
    } else if (subtractedPlayerDate < subtractedEnemyDate) {
        setEnemyShotFirst(false)
        setPlayerShotFirst(true)
    } else {
        setPlayerShotFirst(false)
        setEnemyShotFirst(false)
    }
}

const shotSecondHitCheck = () => {
    let hitRoll = shotRandomizer(0, 3)
    if (hitRoll === 3) {
        //decrement hp bar by 20
    }
}

Add enemyShoot, capturePlayerShot, compareShots, shotSecondHitCheck functions and relevant pieces of state 

//save it as a variable that only renders the div if both conditions are met, put the instructions in the useeffect div

    return (
        <div className="game-background">
            <section className='game' style={{ backgroundImage: `url(${gamePage}` }}>
                <ReactPlayer
                    className='music-player'
                    url={music}
                    width='0vw'
                    height='0vh'
                    volume={0.0}
                    loop={true}
                    playing={true}
                />

                <h1></h1>

                <div className='health-bar-container'>
                    <div className='player-health-bar'>💃</div>
                    <div className='enemy-health-bar'>😈</div>
                </div>
                <div className='fire-container'>
                    <img className='fire-indicator' src={fireImage}/>
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
                    {viewInstructions()}
                </div>
            </section>
        </div>
    )
}


export default Game;