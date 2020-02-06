import React from 'react'
import GameContext from '../GameContext'

export default function Stats() {

    return (
        <GameContext.Consumer>
            {(value) => {
                return (
                    <>
                        <section className='stat-card'>
                            <p>Most played course:</p>
                            <p><span className="stat-info">{value.course_name}</span></p>
                        </section>
                        <section className='stat-card'>
                            <p>Day most played:</p>
                            <p><span className="stat-info">{value.day}</span></p>
                        </section>
                        <section className='stat-card'>
                            <p>Average score:</p>
                            <p><span className="stat-info">{value.front_score}</span></p>
                        </section>
                    </>
                )
            }}
        </GameContext.Consumer>
    )

}