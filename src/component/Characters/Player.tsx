import React, { useState } from 'react';
import PlayerHealthBar from "../HealthBar/PlayerHealthBar";
import './Player.css';
import PrayBeretta from "../../Assets/Models/Pray-Beretta.png";
import Shooting1Beretta from "../../Assets/Models/Shoot-Right-Beretta.png";
import Shooting2Beretta from "../../Assets/Models/Shoot-Left-Beretta.png";
import HitBeretta from "../../Assets/Models/Hit-Beretta.png";
import DyingBeretta from "../../Assets/Models/Dying-Beretta.png";
import DeadBeretta from "../../Assets/Models/Dead-Beretta.png";


const Player = () => {

const [playerImage, setImage] = useState<string>(PrayBeretta)
    // this page is for the fight page screen view.
    // let navigate = useNavigate();

    // state variables for healthbar
    const [noFirstShot, setFirstShot] = useState(true);
    const [numOfShots, setNumOfShots] = useState(0);
    const [health, setHealth] = useState(100);
   

    /* START OF FUNCTIONS FOR HEALTHBAR */
    function CompleteMove() {
        if (numOfShots !== 0 && !noFirstShot) {
            setNumOfShots(numOfShots - 1);

            // if (numOfShots === 1) {
            //     navigate("/Playerwin");
            // }
        }
        // Attack(noFirstShot ? 0 : health / numOfShots);

        if (health < 6) {
            setImage(HitBeretta);
        } else if (numOfShots < 5) {
            setImage(HitBeretta);
        } else {
            setImage(HitBeretta);
        }
    }

    // decreases health.
    // function Attack(inc) {
    //     if (health > 0) {
    //         setHealth(health - inc);
    //     }
    // }


const changeImage = () => {
    if (playerImage !== Shooting1Beretta) {
        setImage(Shooting1Beretta)
    } else {
        setImage(Shooting2Beretta)
    }
} 

    return (
             <div className="right-side">
                <div className="health-div">
                     <PlayerHealthBar />
                </div>
                <div className="player-image">
                    <img src={playerImage} onClick={changeImage}/>
                </div>
            </div>
    );
}

export default Player;