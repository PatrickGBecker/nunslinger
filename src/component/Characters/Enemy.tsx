import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import Demon1Bishop from "../../Assets/Models/Demon-1-Bishop.png";
import Demon2Bishop from "../../Assets/Models/Demon-2-Bishop.png";
import Demon1Cardinal from "../../Assets/Models/Demon-Leaving1-Cardinal.png";
import Demon2Cardinal from "../../Assets/Models/Demon-Leaving2-Cardinal.png";
import DemonLeaving1 from "../../Assets/Models/Demon-Leaving-1.png";
import DemonLeaving2 from "../../Assets/Models/Demon-Leaving-2.png";
import DemonLeaving1Pope from "../../Assets/Models/Demon-Leaving-1-Pope.png";
import DemonLeaving2Pope from "../../Assets/Models/Demon-Leaving-2-Pope.png";
import DemonSpirit from "../../Assets/Models/Demon-Spirit.png";
import DevilSpirit from "../../Assets/Models/Devil-Spirit-Side.png"
import DyingBishop from "../../Assets/Models/Dying-Bishop.png";
import DyingCardinal from "../../Assets/Models/Dying-Cardinal.png";
import DyingPope from "../../Assets/Models/Dying-Pope.png";
import DyingPriest from "../../Assets/Models/Dying-Priest.png"
import ForwardBishop from "../../Assets/Models/Forward-Bishop.png";
import ForwardCardinal from "../../Assets/Models/Forward-Cardinal.png";
import ForwardPope from "../../Assets/Models/Forward-Pope.png";
import ForwardPriest from "../../Assets/Models/Forward-Priest.png";
import HitBishop from "../../Assets/Models/Hit-Bishop.png";
import HitCardinal from "../../Assets/Models/Hit-Cardinal.png";
import HitPope from "../../Assets/Models/Hit-Pope.png";
import HitPriest from "../../Assets/Models/Hit-Priest.png";
import Shooting1Bishop from "../../Assets/Models/Shoot-1-Bishop.png";
import Shooting2Bishop from "../../Assets/Models/Shoot-2-Bishop.png";
import Shooting1Cardinal from "../../Assets/Models/Shoot-1-Cardinal.png";
import Shooting2Cardinal from "../../Assets/Models/Shoot-2-Cardinal.png";
import Shooting1Pope from "../../Assets/Models/Shooting-1-Pope.png";
import Shooting2Pope from "../../Assets/Models/Shooting-2-Pope.png";
import Shooting1Priest from "../../Assets/Models/Shoot-Right-Priest.png";
import Shooting2Priest from "../../Assets/Models/Shoot-Left-Priest.png";
import RevivedBishop from "../../Assets/Models/Revived-Bishop.png";
import RevivedCardinal from "../../Assets/Models/Revived-Cardinal.png";
import RevivedPope from "../../Assets/Models/Revived-Pope.png";
import RevivedPriest from "../../Assets/Models/Revived-Priest.png";
const death = require('../../Assets/Music/sfx/demondeath.mp3');
const grunt = require('../../Assets/Music/sfx/demongrunt.mp3');
const gun = require('../../Assets/Music/sfx/priestbishopcardinalgun.wav');
const popeGun = require('../../Assets/Music/sfx/popegun.mp3');

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

const images = {
    priest: {
        forwardImage: ForwardPriest,
        shooting1Image: Shooting1Priest,
        shooting2Image: Shooting2Priest,
        hitImage: HitPriest,
        dyingImage: DyingPriest,
        demonLeaving1: DemonLeaving1,
        demonLeaving2: DemonLeaving2,
        revivedImage: RevivedPriest
    },
    bishop: {
        forwardImage: ForwardBishop,
        shooting1Image: Shooting1Bishop,
        shooting2Image: Shooting2Bishop,
        hitImage: HitBishop,
        dyingImage: DyingBishop,
        demonLeaving1: Demon1Bishop,
        demonLeaving2: Demon2Bishop,
        revivedImage: RevivedBishop
    },
    cardinal: {
        forwardImage: ForwardCardinal,
        shooting1Image: Shooting1Cardinal,
        shooting2Image: Shooting2Cardinal,
        hitImage: HitCardinal,
        dyingImage: DyingCardinal,
        demonLeaving1: Demon1Cardinal,
        demonLeaving2: Demon2Cardinal,
        revivedImage: RevivedCardinal
    },
    pope: {
        forwardImage: ForwardPope,
        shooting1Image: Shooting1Pope,
        shooting2Image: Shooting2Pope,
        hitImage: HitPope,
        dyingImage: DyingPope,
        demonLeaving1: DemonLeaving1Pope,
        demonLeaving2: DemonLeaving2Pope,
        revivedImage: RevivedPope
    }

};

const Enemy = ( { enemyHealth, enemyHasShot, youLose, gameCount, fireIndicatorDate }: ICharacterProps) => {

const [initialEnemyHealth, setInitialEnemyHealth] = useState(0);
const [enemyImage, setImage] = useState('');
const [gruntFX, setGruntFX] = useState(false);
const [shotFX, setShotFX] = useState(false);
const [deathFX, setDeathFX] = useState(false);
const [currentCharacter, setCurrentCharacter] = useState<'priest' | 'bishop' | 'cardinal' |'pope'>('priest');
//add bishop, pope to useState types^^^^
useEffect(() => {
    setInitialEnemyHealth(enemyHealth)
}, [])
//make function that checks game level and selects the enemy accordingly, make it then assign models and fire times accordingly as well
useEffect(() => {
    if (gameCount === 0) {
        setCurrentCharacter('priest')
        setImage(images.priest.forwardImage)
    } else if (gameCount === 1) {
       setCurrentCharacter('bishop')
       setImage(images.bishop.forwardImage)
    } else if (gameCount === 2) {
        setCurrentCharacter('cardinal')
        setImage(images.cardinal.forwardImage)
    } else if (gameCount === 3) {
        setCurrentCharacter('pope')
        setImage(images.pope.forwardImage)
    }
}, [gameCount])

    

useEffect(() => {
    if (enemyHasShot) {
        console.log("enemyTest: ", enemyHasShot)
        setImage(images[currentCharacter].shooting1Image)
        handleShotFX()
    } else if (fireIndicatorDate) {
        setImage(images[currentCharacter].shooting2Image)
        handleShotFX()
    }
}, [enemyHasShot, fireIndicatorDate])
    
        
 useEffect(() => {
     if (enemyHealth === 0) {
        setImage(images[currentCharacter].dyingImage)
        handleDeathFX()
        setTimeout(() => {
            setImage(images[currentCharacter].demonLeaving1)
        }, 1000)
        setTimeout(() => {
            setImage(images[currentCharacter].demonLeaving2)
        }, 2000)
        setTimeout(() => {
            setImage(images[currentCharacter].revivedImage)
        }, 3000)
     } else if (enemyHealth < initialEnemyHealth) {
         setImage(images[currentCharacter].hitImage)
         handleGruntFX()
         setInitialEnemyHealth(enemyHealth)
     }
 }, [enemyHealth])      
           
useEffect(() => {
    if (youLose) {
        setImage(images[currentCharacter].forwardImage)
    }
}, [youLose])

const handleShotFX = () => {
    setShotFX(true)
    setTimeout(() => {
        setShotFX(false)
    }, 1000)
}

const handleGruntFX = () => {
    setGruntFX(true)
    setTimeout(() => {
        setGruntFX(false)
    }, 1000)
}

const handleDeathFX = () => {
    setDeathFX(true)
    setTimeout(() => {
        setDeathFX(false)
    }, 4000)
}

    return (
        <div>
            {gruntFX && 
                <div className="grunt">
                    <ReactPlayer
                        className='music-player'
                        url={grunt}
                        width='0vw'
                        height='0vh'
                        volume={0.2}
                        playing={true}
                    />
                </div>
            }
            {deathFX &&
                <div className="death">
                    <ReactPlayer
                        className='music-player'
                        url={death}
                        width='0vw'
                        height='0vh'
                        volume={0.2}
                        playing={true}
                    />
                </div>
            }       
            {shotFX && 
                <div className="gun">
                    <ReactPlayer
                    className='music-player'
                    url={gun}
                    width='0vw'
                    height='0vh'
                    volume={0.2}
                    playing={true}
                    />
                </div>
            }
                <div className="right-side">
                        <div className="enemy-image">
                            <img src={enemyImage} />
                        </div>
                </div>

        </div>
    );
}

export default Enemy;