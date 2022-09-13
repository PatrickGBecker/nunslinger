import React from 'react';
import { Route, Link } from 'react-router-dom';
import fetchApiData from '../fetch/fetchApiData';
import confessionImage from '../../Assets/Backgrounds/confess.jpeg'
import './Missions.css';

const Missions = () => {

    return(
        <section className='missions-container' style={{backgroundImage: `url(${confessionImage}`}}>
            <div className='textbox-style'>
                <div className='sister-textbox'></div>
                <div className='father-textbox'></div>
            </div>
            
            <div className='button-style'>
                <button className='next-button'>Next</button>
                <Link to='/game'>
                    <button className='start-button'>Accept Mission</button>
                </Link>
            </div>
        </section>
    )
}

export default Missions