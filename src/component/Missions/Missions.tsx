import React from 'react';
import { Route, Link } from 'react-router-dom';
import confessionImage from '../../Assets/Backgrounds/confessMission.png'
import DialogBox from '../Missions/DialogBox';
import './Missions.css';

interface Props{
    missionCount: number
    gameCount: number
}

const Missions = (props: Props) => {

    return(
        <div className='mission-background'>
            <section className='missions-container' style={{backgroundImage: `url(${confessionImage}`}}>
                <div className='dialog-box-container'>
                <DialogBox missionCount={props.missionCount} gameCount={props.gameCount}/>
                </div>
                <div className='button-style'>
                    <Link to='/nunslinger/game'>
                        <button className='start-button'>Accept Mission</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Missions