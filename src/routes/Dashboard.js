import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import GameList from '../components/GameList'
import Footer from '../components/Footer'


export default class Dashboard extends Component {


    render() {
        return (
            <>
                <main role="main">
                    <NavBar />
                    <GameList />
                </main>
                <Footer />
            </>
        )
    }

}