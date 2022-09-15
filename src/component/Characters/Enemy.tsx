import React, { useState } from 'react';
import EnemyHealthBar from '../HealthBar/EnemyHealthBar';
import ForwardPriest from "../../Assets/Models/Forward-Priest.png";
import Shooting1Priest from "../../Assets/Models/Shoot-Right-Priest.png";
import Shooting2Priest from "../../Assets/Models/Shoot-Left-Priest.png";
import HitPriest from "../../Assets/Models/Hit-Priest.png";
import DemonLeaving1 from "../../Assets/Models/Demon-Leaving-1.png";
import DemonLeaving2 from "../../Assets/Models/Demon-Leaving-2.png";
import RevivedPriest from "../../Assets/Models/Revived-Priest.png";
import DemonSpirit from "../../Assets/Models/Demon-Spirit.png";

const Enemy = () => {

const [enemyImage, setImage] = useState<string>(ForwardPriest)

    const changeImage = () => {
        if (enemyImage !== Shooting1Priest) {
            setImage(Shooting1Priest)
        } else {
            setImage(Shooting2Priest)
        }
    }

    return (
        <div className="right-side">
            <div className="health-div">
                <EnemyHealthBar />
            </div>
            <div className="enemy-image">
                <img src={enemyImage} onClick={changeImage} />
            </div>
        </div>
    );
}

export default Enemy;