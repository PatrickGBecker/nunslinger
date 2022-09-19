import React, { useState, useEffect } from 'react';
import './Player.css';
import DeadBeretta from "../../Assets/Models/Dead-Beretta.png";
import DyingBeretta from "../../Assets/Models/Dying-Beretta.png";
import HitBeretta from "../../Assets/Models/Hit-Beretta.png";
import PrayBeretta from "../../Assets/Models/Pray-Beretta.png";
import Shooting1Beretta from "../../Assets/Models/Shoot-Right-Beretta.png";
import Shooting2Beretta from "../../Assets/Models/Shoot-Left-Beretta.png";

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


const Player = ({ playerHealth, playerHasShot, youLose, youWin, fireIndicatorDate}: ICharacterProps) => {

const [playerImage, setImage] = useState<string>(PrayBeretta)
const [initialEnemyHealth, setInitialPlayerHealth] = useState(0) 
    
    useEffect(() => {
        setInitialPlayerHealth(playerHealth)
    }, [])
    //make function that checks game level and selects the enemy accordingly, make it then assign models and fire times accordingly as well
    useEffect(() => {
        if (playerHasShot) {
            setImage(Shooting1Beretta)
        } else if (fireIndicatorDate) {
            setImage(Shooting2Beretta)
        }
    }, [playerHasShot, fireIndicatorDate])


    useEffect(() => {
        if (playerHealth === 0) {
            setImage(DyingBeretta)
            setTimeout(() => {
                setImage(DeadBeretta)
            }, 1000)
        } else if (playerHealth < initialEnemyHealth) {
            setImage(HitBeretta)
            setInitialPlayerHealth(playerHealth)
        }
    }, [playerHealth])

    useEffect(() => {
        if (youWin) {
            setImage(PrayBeretta)
        }
    }, [youWin])
       //add bishop, pope to useState types^^^^

     return (
         <div className="right-side">
            <div className="player-image">
                <img src={playerImage} />
            </div>
        </div>
    );
}

export default Player;