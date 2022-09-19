import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './Player.css';
import DeadBeretta from "../../Assets/Models/Dead-Beretta.png";
import DyingBeretta from "../../Assets/Models/Dying-Beretta.png";
import HitBeretta from "../../Assets/Models/Hit-Beretta.png";
import PrayBeretta from "../../Assets/Models/Pray-Beretta.png";
import Shooting1Beretta from "../../Assets/Models/Shoot-Right-Beretta.png";
import Shooting2Beretta from "../../Assets/Models/Shoot-Left-Beretta.png";
const grunt = require('../../Assets/Music/sfx/berettagrunt.mp3');
const death = require('../../Assets/Music/sfx/berettadeath2.mp3');
const gun = require('../../Assets/Music/sfx/berettagun.wav');
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
const [gruntFX, setGruntFX] = useState(false);
const [shotFX, setShotFX] = useState(false);
const [deathFX, setDeathFX] = useState(false);  

    useEffect(() => {
        setInitialPlayerHealth(playerHealth)
    }, [])
    //make function that checks game level and selects the enemy accordingly, make it then assign models and fire times accordingly as well
    useEffect(() => {
        if (playerHasShot) {
            setImage(Shooting1Beretta)
            setShotFX(true)
            setGruntFX(false)
        } else if (fireIndicatorDate) {
            setImage(Shooting2Beretta)
            setShotFX(true)
            setShotFX(false)
        }
    }, [playerHasShot, fireIndicatorDate])


    useEffect(() => {
        if (playerHealth === 0) {
            setImage(DyingBeretta)
            setDeathFX(true)
            setTimeout(() => {
                setImage(DeadBeretta)
            }, 1000)
        } else if (playerHealth < initialEnemyHealth) {
            setImage(HitBeretta)
            setGruntFX(true)
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
        <div>
             {gruntFX &&
                 <div className="grunt">
                     <ReactPlayer
                         className='music-player'
                         url={grunt}
                         width='0vw'
                         height='0vh'
                         volume={0.4}
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
                         volume={0.4}
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
                <div className="player-image">
                    <img src={playerImage} />
                </div>
            </div>
        </div>
    );
}

export default Player;