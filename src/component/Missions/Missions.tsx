import React from 'react';
import fetchApiData from '../fetch/fetchApiData';
import confessionImage from '../../Assets/Backgrounds/Priest-poses2.png'
import './Missions.css';

const Missions = () => {

    return(
        <section className='missions-container'>
            <img className='confessional-image' src={confessionImage} alt='the confessional'/>
            <div className='sister-textbox'></div>
            <div className='father-textbox'></div>
        </section>
    )
}

export default Missions