import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Player from '../Characters/Player';
import Enemy from '../Characters/Enemy';
import gunTrigger from '../../Assets/Models/trigger.png'
import gamePage from '../../Assets/Backgrounds/battlePage.jpeg'
import fireFont from '../../Assets/Fonts/FIRE.gif'
import './Game.css';
import Character from '../Characters/character';
import { fetchApiDataEn, fetchApiDataLa } from '../fetch/fetchApiData';
// import HealthBar from '../HealthBar/HealthBar'
const music = require('../../Assets/Music/testMusic.mp3');

interface ICharacterProps {
    playerHealth: number;
    enemyHealth: number;
    playerHasShot: boolean;
    enemyHasShot: boolean;
    youLose: boolean;
    youWin: boolean;
    gameCount: number;
    fireIndicatorDate: number;
}

interface Props {
    missionCount: number
    gameCount: number
    setMissionCount: any
    setGameCount: any
}

const Game = (props: Props) => {

    const priest = new Character(1700, 2500)
    const bishop = new Character(1500, 2000)
    const cardinal = new Character(1300, 1750)
    const pope = new Character(1100, 1300)

    const [instructions, setInstructions] = useState<any>(false)
    const [fireIndicatorDate, setFireIndicatorDate] = useState<number>(0)
    const [enemyShotDate, setEnemyShotDate] = useState<number>(0)
    const [playerShotDate, setPlayerShotDate] = useState<number>(0)
    const [playerHealth, setPlayerHealth] = useState<number>(100)
    const [enemyHealth, setEnemyHealth] = useState<number>(100)
    const [currentCharacter, setCurrentCharacter] = useState<Character>(priest)
    const [playerHasShot, setPlayerHasShot] = useState<boolean>(false)
    const [enemyHasShot, setEnemyHasShot] = useState<boolean>(false)
    const [youWin, setYouWin] = useState<boolean>(false)
    const [youLose, setYouLose] = useState<boolean>(false)
    const [celebrationEn, setCelebrationEn] = useState<string>('')
    const [celebrationLa, setCelebrationLa] = useState<string>('')
    const [isEnglish, setIsEnglish] = useState<boolean>(true)
    let playerShotFirst = false


    useEffect(() => {
        fetchApiDataEn()
            .then(data => {
                console.log("data: ", data)
                setCelebrationEn(data.celebrations[0].title)
            })
            //   .then(data => console.log('english', data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetchApiDataLa()
            .then(data => {
                console.log("data: ", data)
                setCelebrationLa(data.celebrations[0].title)
            })
            //   .then(data => console.log('latin', data))
            .catch(err => console.log(err))
    }, [])


    const hideInstructions = () => {
        setInstructions(false)
    }

    useEffect(() => {
        if (props.gameCount === 0) {
            setInstructions(true)
        } else {
            startGame()
        }
    }, [])

    const startGame = () => {
        resetGameState()
           //start fight music
   //render forward facing models
   //animate BCs Godspeed message
   //render Countdown
        startRound()
    }

    const resetGameState = () => {
        setPlayerHealth(100)
        setEnemyHealth(100)
    }

    const resetRoundState = () => {
        setPlayerHasShot(false)
        setEnemyHasShot(false)
        playerShotFirst = false
        setFireIndicatorDate(0)
        setEnemyShotDate(0)
        setPlayerShotDate(0)
        setYouLose(false)
        setYouWin(false)
    }

    const startRound = () => {
        //guns out model
        resetRoundState()
        fireIndicator()
    }

    useEffect(() => {
        console.log('useEffect triggered')
        if (playerHasShot && enemyHasShot === true) {
            compareShots()
        }
    }, [playerHasShot, enemyHasShot])

    const closeInstructionsStartGame = () => {
        hideInstructions()
        startGame()
    }

    const viewInstructions = () => {

        if (props.gameCount === 0 && instructions === true) {
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

    const fireRandomizer = (): number => {
        let min = Math.ceil(1000);
        let max = Math.floor(5000);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const fireIndicatorHelper = () => {
        setFireIndicatorDate(Date.now())
        enemyShoot()
        console.log('fire indicator shown')
    }

    const fireIndicator: any = () => {
        setTimeout(fireIndicatorHelper, fireRandomizer())
    }

    const shotRandomizer = (minTime: number, maxTime: number) => {
        let min = Math.ceil(minTime);
        let max = Math.floor(maxTime);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const enemyShotHelper = () => {
        setEnemyShotDate(Date.now())
        setEnemyHasShot(true)
        console.log('enemy has shot')
        //change image from right-left guns
   //gun sound effect

    }

    const enemyShoot: any = () => {
        console.log(currentCharacter.minFireTime)
        console.log(currentCharacter.maxFireTime)
        setTimeout(enemyShotHelper, shotRandomizer(currentCharacter.minFireTime, currentCharacter.maxFireTime))
    }

    const capturePlayerShot = () => {
        setPlayerShotDate(Date.now())
        setPlayerHasShot(true)
        console.log('player has shot')
        //change img from right/left shot
   //gun sound effect

    }

    const compareShots = () => {
        let subtractedPlayerDate = playerShotDate - fireIndicatorDate
        let subtractedEnemyDate = enemyShotDate - fireIndicatorDate


        if (subtractedPlayerDate < 0) {
            playerShotFirst = false
        } else if (subtractedPlayerDate > subtractedEnemyDate) {
            console.log(subtractedEnemyDate, subtractedPlayerDate)
            playerShotFirst = false
        } else if (subtractedPlayerDate < subtractedEnemyDate) {
            playerShotFirst = true
        } else {
            playerShotFirst = false
        }
        shotFirstHitCheck()
        shotSecondHitCheck()
    }


    const shotFirstHitCheck = () => {
        const playerMinusTwenty = playerHealth - 20
        const enemyMinusTwenty = enemyHealth - 20
        console.log(playerShotFirst)
        if (playerShotFirst === true) {
            setEnemyHealth(enemyMinusTwenty)
            //change enemy to hit img for 1 sec
       //play hurt sound effect

            console.log('player shot first and hit')
        } else if (playerShotFirst === false) {
            setPlayerHealth(playerMinusTwenty)
            //change player to hit img for 1 sec
       //play hurt sound effect

            console.log('enemy shot first and hit')
        } else {
            console.log('neither have shot first apparently?')
        }
    }

    const shotSecondHitCheck = () => {
        const playerMinusTwenty = playerHealth - 20
        const enemyMinusTwenty = enemyHealth - 20
        let hitRoll = shotRandomizer(0, 3)
        if (hitRoll > 2 && playerShotFirst === false) {
            setEnemyHealth(enemyMinusTwenty)
            //change enemy to hit img for 1 sec
       //play hurt sound effect

            console.log('player shot second and hit')
        } else if (hitRoll > 2 && playerShotFirst === true) {
            setPlayerHealth(playerMinusTwenty)
            //change player to hit img for 1 sec
       //play hurt sound effect

            console.log('enemy shot second and hit')
        } else {
            console.log('someone shot second and missed')
        }
    }

    useEffect(() => {
        gameOverCheck()
    }, [enemyHealth, playerHealth])

    const gameOverCheck = () => {
        if (playerHealth <= 0) {
            gameLoss()
        } else if (enemyHealth <= 0) {
            gameWin()
        } else {
            nextRound()
        }
    }

    const gameLoss = () => {
        //stop fight music, start lacrimose music
   //change to dying & dead imgs for a few secs
   //play dying sound effects

        console.log('you uhhh died')
        setYouLose(true)
    }

    const gameWin = () => {
        //stop fight music, play victory music
   //change to player img to praying img
   //change enemy img to dying, spirit leaving, then revived img

        console.log('you win nice lady')
        setYouWin(true)
        increaseMissionAndGameCount()
    }

    const nextRound = () => {
        //put damage animations here for 1 second
        setTimeout(() => {
            startRound()
        }, 1000);
    }

    const increaseMissionAndGameCount = () => {
        console.log('pre', props.gameCount, props.missionCount)
        const missionIncremented = props.missionCount + 1
        const gameIncremented = props.gameCount + 1
        props.setMissionCount(missionIncremented)
        props.setGameCount(gameIncremented)
    }

    const log = () => {
        console.log('post', props.gameCount, props.missionCount)
    }

    const toggleLanguages = () => {
        if (isEnglish === false) {
            setIsEnglish(true)
        } else {
            setIsEnglish(false)
        }
    }

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

                <div className='health-bar-container'>
                    <div className='player-health-bar'>💃
                        <progress className='player-healthBar' id="health" value={playerHealth} max="100"></progress>
                    </div>
                    <div className='enemy-health-bar'>😈
                        <progress className='enemy-healthBar' id="health" value={enemyHealth} max="100"></progress>
                    </div>
                </div>
                <div className='fire-container'>
                    {fireIndicatorDate && <img className='fire-indicator' src={fireFont} />}
                </div>
                {fireIndicatorDate && <button className='trigger-container' disabled={playerHasShot}>
                    <img className='trigger-button' onClick={capturePlayerShot} src={gunTrigger} alt='gun trigger avatar' />
                </button>}

                {youWin === true &&
                    <div className='win-screen'>
                        <h1>DEMON EXORCISED</h1>
                        <p>Thanks for kicking ass for The Lord, I mean, for me! Here's your daily bread, sister!</p>
                        {!isEnglish && celebrationLa}
                        {isEnglish && celebrationEn}
                        <Link to='/missions'>
                            <button className='next-mission-button' onClick={log}>Next Mission</button>
                        </Link>
                        <button className='toggle-languages' onClick={toggleLanguages}> toggle languages </button>
                    </div>
                }

                {youLose === true &&
                    <div className='lose-screen'>
                        <h1>AND THEN THERE WERE NUN</h1>
                        <button className='next-mission-button-failure' onClick={startGame}>Try Again</button>
                    </div>
                }

                <div className="model-container">
                    <Player playerHealth={playerHealth} enemyHealth={enemyHealth}
                            playerHasShot={playerHasShot} enemyHasShot={enemyHasShot}
                            youWin={youWin} youLose={youLose} gameCount={props.gameCount} 
                            fireIndicatorDate={fireIndicatorDate}
                    />
                    <Enemy playerHealth={playerHealth} enemyHealth={enemyHealth}
                           playerHasShot={playerHasShot} enemyHasShot={enemyHasShot}
                           youWin={youWin} youLose={youLose} gameCount={props.gameCount} 
                           fireIndicatorDate={fireIndicatorDate}
                    />
                </div>
                <div className='button-style'>

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