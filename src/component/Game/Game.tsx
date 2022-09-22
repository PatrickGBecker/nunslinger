import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import Player from '../Characters/Player';
import Enemy from '../Characters/Enemy';
import gunTrigger from '../../Assets/Models/gunTrigger.png'
import BuddyChrist from '../../Assets/Models/BuddyChrist.png'
import fireFont from '../../Assets/Fonts/FIRE.gif'
import './Game.css';
import Character from '../Characters/character';
import gamePage from '../../Assets/Backgrounds/battlePage.jpeg'
import bishopBackground from '../../Assets/Backgrounds/bishop-background.png'
import cardinalBackground from '../../Assets/Backgrounds/cardinal-background.jpeg'
import popeBackground from '../../Assets/Backgrounds/pope-background.jpeg'
import { fetchApiDataEn, fetchApiDataLa } from '../fetch/fetchApiData';
const VictoryTheme = require('../../Assets/Music/victory-theme.mp3')
const DeathTheme = require('../../Assets/Music/death-theme.mp3')


const battleBackgrounds = [gamePage, bishopBackground, cardinalBackground, popeBackground]

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
    const [secretCelebration, setSecretCelebration] = useState<boolean>(false)
    const [backgrounds, setBackgrounds] = useState<any>(battleBackgrounds[0])
    let playerShotFirst = false



    useEffect(() => {
        fetchApiDataEn()
            .then(data => {
                setCelebrationEn(data.celebrations[0].title)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetchApiDataLa()
            .then(data => {
                setCelebrationLa(data.celebrations[0].title)
            })
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

    const closeInstructionsStartGame = () => {
        hideInstructions()
        startGame()
    }

    const startGame = () => {
        resetGameState()
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
        resetRoundState()
        fireIndicator()
    }

    useEffect(() => {
        nextSpeed()
        nextBackGround()
    }, [props.missionCount, props.gameCount])

    const nextBackGround = () => {
        if (props.gameCount === 0) {
            setBackgrounds(battleBackgrounds[0])
        } else if (props.gameCount === 1) {
            setBackgrounds(battleBackgrounds[1])
        } else if (props.gameCount === 2) {
            setBackgrounds(battleBackgrounds[2])
        } else if (props.gameCount === 3) {
            setBackgrounds(battleBackgrounds[3])
        }
    }

    const nextSpeed = () => {
        if (props.missionCount === 0) {
            setCurrentCharacter(priest)
        } else if (props.missionCount === 1) {
            setCurrentCharacter(bishop)
        } else if (props.missionCount === 2) {
            setCurrentCharacter(cardinal)
        } else if (props.missionCount === 3) {
            setCurrentCharacter(pope)
        }
    }

    useEffect(() => {
        // console.log('useEffect triggered')
        if (playerHasShot && enemyHasShot === true) {
            compareShots()
        }
    }, [playerHasShot, enemyHasShot])


    const viewInstructions = () => {

        if (props.gameCount === 0 && instructions === true) {
            return (
                <div className="game-instructions">
                    <h1>Time to exorcise!</h1>
                    <h2>When the FIRE indicator appears, click the TRIGGER to shoot.</h2>
                    <h2>If you shoot first, you're guaranteed to hit!</h2>
                    <h2>Shoot second, and your shot is not likely to connect.</h2>
                    <h2>It could happen, but don't count on it!</h2>
                    <h2>Your life force and the demon's hold on its possessee will deplete when shot.</h2>
                    <h2>Outgun your demonic foe and save that priest!</h2>
                    <h2>GODSPEED!</h2>
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
    }

    const enemyShoot: any = () => {
        setTimeout(enemyShotHelper, shotRandomizer(currentCharacter.minFireTime, currentCharacter.maxFireTime))
    }

    const capturePlayerShot = () => {
        setPlayerShotDate(Date.now())
        setPlayerHasShot(true)
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
        } else if (playerShotFirst === false) {
            setPlayerHealth(playerMinusTwenty)
        } 
    }

    const shotSecondHitCheck = () => {
        const playerMinusTwenty = playerHealth - 20
        const enemyMinusTwenty = enemyHealth - 20
        let hitRoll = shotRandomizer(0, 3)
        if (hitRoll > 2 && playerShotFirst === false) {
            setEnemyHealth(enemyMinusTwenty)
        } else if (hitRoll > 2 && playerShotFirst === true) {
            setPlayerHealth(playerMinusTwenty)
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
        } else if (playerHealth !== 100 || enemyHealth !== 100) {
            nextRound()
        }
    }

    const gameLoss = () => {
        setYouLose(true)
    }

    const gameWin = () => {
        setYouWin(true)
        increaseMissionCount()
    }

    const nextRound = () => {
        setTimeout(() => {
            startRound()
        }, 1000);
    }

    const increaseMissionCount = () => {
        const missionIncremented = props.missionCount + 1
        props.setMissionCount(missionIncremented)
    }

    const increaseGameCount = () => {
        const gameIncremented = props.gameCount + 1
        props.setGameCount(gameIncremented)
        
    }

    const toggleLanguages = () => {
        if (isEnglish === false) {
            setIsEnglish(true)
        } else {
            setIsEnglish(false)
        }
    }

    const showSecretCelebration = () => {
        setSecretCelebration(true)
    }


    return (
        
        <div className="game-background">
            <section className='game' style={{ backgroundImage: `url(${backgrounds}` }}>
                <div className='health-bar-container'>
                    <div className='player-health-bar'>
                        <progress className='player-healthBar' id="health" value={playerHealth} max="100"></progress>
                    </div>
                    <button className='secret-celebration-button' onClick={showSecretCelebration}></button>
                    <div className='enemy-health-bar'>
                        <progress className='enemy-healthBar' id="health" value={enemyHealth} max="100"></progress>
                    </div>
                </div>
                <div className='fire-container'>
                    {fireIndicatorDate ? <img className='fire-indicator' src={fireFont} /> : null}
                    {viewInstructions()}
                </div>

                {youWin === true &&
                    <div className='win-screen'>
                        <ReactPlayer
                            className='music-player'
                            url={VictoryTheme}
                            width='0vw'
                            height='0vh'
                            volume={0.2}
                            loop={true}
                            playing={true}
                        />
                        <h2>Thanks for kicking ass for The Lord, I mean, for me! Here's your daily bread, sister!</h2>
                        <img className='buddy-christ' src={BuddyChrist}/>
                        <h2>Today is</h2>
                        <h2>{!isEnglish && celebrationLa}</h2>
                        <h2>{isEnglish && celebrationEn}</h2>
                        <h2>Rejoice and be glad, because great is your reward in heaven!</h2>
                        <div className='win-screen-buttons}'>
                            <Link to='/missions'>
                                <button className='next-mission-button' onClick={increaseGameCount}>Next Mission</button>
                            </Link>
                            <Link to='/nunslinger/'>
                            <button className='back-to-main-page'>Retire from Hunting?</button>
                            </Link>
                            <button className='toggle-languages' onClick={toggleLanguages}> toggle languages </button>
                        </div>
                    </div>
                }

                {secretCelebration === true &&
                    <div className='win-screen'>
                        <h1 className='demon-exorcised'>DEMON EXORCISED</h1>
                        <h2>Thanks for kicking ass for The Lord, I mean, for me! Here's your daily bread, sister!</h2>
                        <h2>Today is</h2>
                        <h2>{!isEnglish && celebrationLa}</h2>
                        <h2>{isEnglish && celebrationEn}</h2>
                        <h2>Rejoice and be glad, because great is your reward in heaven!</h2>
                        <div className='win-screen-buttons}'>
                            <Link to='/missions'>
                                <button className='next-mission-button' onClick={increaseGameCount}>Next Mission</button>
                            </Link>
                            <Link to='/nunslinger/'>
                            <button className='back-to-main-page'>Retire from Hunting?</button>
                            </Link>
                            <button className='toggle-languages' onClick={toggleLanguages}> toggle languages </button>
                        </div>
                    </div>
                }

                {youLose === true &&
                    <div className='lose-screen'>
                        <ReactPlayer
                            className='music-player'
                            url={DeathTheme}
                            width='0vw'
                            height='0vh'
                            volume={0.2}
                            loop={true}
                            playing={true}
                        />
                        <h1 className='there-were-nun'>AND THEN THERE WERE NUN</h1>
                        <div className='failure-buttons'>
                            <button className='next-mission-button-failure' onClick={startGame}>Try Again</button>
                            <Link to='/nunslinger/'>
                            <button className='back-to-main-page'>Retire from Hunting?</button>
                            </Link>
                        </div>
                    </div>
                }

                <div className="trigger-button-container">
                    {fireIndicatorDate ? <button className='trigger-container' disabled={playerHasShot}>
                        <img className='trigger-button' onClick={capturePlayerShot} src={gunTrigger} alt='gun trigger avatar' />
                    </button>: null}
                </div>

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

            </section>
        </div>
    )
}


export default Game;