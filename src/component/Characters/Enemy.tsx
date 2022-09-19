import React, { useState, useEffect } from 'react';
import Character from './character';
import Demon1Bishop from "../../Assets/Models/Demon-1-Bishop.png";
import Demon2Bishop from "../../Assets/Models/Demon-2-Bishop.png";
import DemonLeaving1 from "../../Assets/Models/Demon-Leaving-1.png";
import DemonLeaving2 from "../../Assets/Models/Demon-Leaving-2.png";
import DemonLeaving1Pope from "../../Assets/Models/Demon-Leaving-1-Pope.png";
import DemonLeaving2Pope from "../../Assets/Models/Demon-Leaving-2-Pope.png";
import DemonSpirit from "../../Assets/Models/Demon-Spirit.png";
import DevilSpirit from "../../Assets/Models/Devil-Spirit-Side.png"
import DyingBishop from "../../Assets/Models/Dying-Bishop.png";
import DyingPope from "../../Assets/Models/Dying-Pope.png";
import DyingPriest from "../../Assets/Models/Dying-Priest.png"
import ForwardBishop from "../../Assets/Models/Forward-Bishop.png";
import ForwardPope from "../../Assets/Models/Forward-Pope.png";
import ForwardPriest from "../../Assets/Models/Forward-Priest.png";
import HitBishop from "../../Assets/Models/Hit-Bishop.png";
import HitPope from "../../Assets/Models/Hit-Pope.png";
import HitPriest from "../../Assets/Models/Hit-Priest.png";
import Shooting1Bishop from "../../Assets/Models/Shoot-1-Bishop.png";
import Shooting2Bishop from "../../Assets/Models/Shoot-2-Bishop.png";
import Shooting1Pope from "../../Assets/Models/Shooting-1-Pope.png";
import Shooting2Pope from "../../Assets/Models/Shooting-2-Pope.png";
import Shooting1Priest from "../../Assets/Models/Shoot-Right-Priest.png";
import Shooting2Priest from "../../Assets/Models/Shoot-Left-Priest.png";
import RevivedBishop from "../../Assets/Models/Revived-Bishop.png";
import RevivedPope from "../../Assets/Models/Revived-Pope.png";
import RevivedPriest from "../../Assets/Models/Revived-Priest.png";

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

const [initialEnemyHealth, setInitialEnemyHealth] = useState(0) 
const [enemyImage, setImage] = useState('')
const [currentCharacter, setCurrentCharacter] = useState<'priest' | 'bishop' | 'pope'>('priest')
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
        setCurrentCharacter('pope')
        setImage(images.pope.forwardImage)
    }
}, [gameCount])

    

useEffect(() => {
    if (enemyHasShot) {
        console.log("enemyTest: ", enemyHasShot)
        setImage(images[currentCharacter].shooting1Image)
    } else if (fireIndicatorDate) {
        setImage(images[currentCharacter].shooting2Image)
    }
}, [enemyHasShot, fireIndicatorDate])
    
        
 useEffect(() => {
     if (enemyHealth === 0) {
        setImage(images[currentCharacter].dyingImage)
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
         setInitialEnemyHealth(enemyHealth)
     }
 }, [enemyHealth])      
           
useEffect(() => {
    if (youLose) {
        setImage(images[currentCharacter].forwardImage)
    }
}, [youLose])

    return (
        <div className="right-side">
                <div className="enemy-image">
                    <img src={enemyImage} />
                </div>
        </div>
    );
}

export default Enemy;