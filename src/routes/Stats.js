import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import GameContext from '../GameContext'
import NavBar from '../components/NavBar'
import StatsList from '../components/StatsList'
import Footer from '../components/Footer'


export default class Stats extends Component {
    static contextType = GameContext;
    state = {
        stats: [],
        error: null,
    }


    render() {
        const contextValue = {

        }

        return (
            <>
                <GameContext.Provider value={contextValue}>
                    <main role="main">
                        <NavBar />
                        <StatsList />
                    </main>
                    <Footer />
                </GameContext.Provider>
            </>
        )
    }

}