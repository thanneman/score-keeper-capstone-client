import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import AddGame from '../components/AddGame'


export default class NewGame extends Component {


    render() {
        return (
            <>
                <main role="main">
                    <NavBar />
                    <AddGame />
                </main>
                <Footer />
            </>
        )
    }

}