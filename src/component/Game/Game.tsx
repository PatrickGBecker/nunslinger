import React, { Component } from 'react';
import './Game.css';

type Props = {};

class Game extends Component<Props> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }


    
    render() {
        
        return (
            <section className='game'>
                <h1>test</h1>
                <div className='player-health-bar'> </div>
                <div className='enemy-health-bar'> </div>
                <img className='player-model' src='💃' />
                <img className='enemy-model' src='😈' />
                <button className='trigger-button'> </button>
            </section>
        )
    }
    
}

export default Game;