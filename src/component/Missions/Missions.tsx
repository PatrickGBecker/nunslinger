import React from 'react';
import { Route, Link } from 'react-router-dom';
import fetchApiData from '../fetch/fetchApiData';
import confessionImage from '../../Assets/Backgrounds/Priest-poses2.png'
import './Missions.css';

const Missions = () => {

    return(
        <section className='missions-container'>
            <img className='confessional-image' src={confessionImage} alt='the confessional'/>
            <div className='sister-textbox'></div>
            <div className='father-textbox'></div>
            <button className='next-button'>Next</button>
            <Link to='/game'>
                <button className='start-button'>Accept Mission</button>
            </Link>
        </section>
    )
}

export default Missions