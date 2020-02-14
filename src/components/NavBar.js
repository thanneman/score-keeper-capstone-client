import React, { Component } from 'react'
import TokenService from '../services/token-service'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default class NavBar extends Component {

    handleLogout = () => {
        TokenService.clearAuthToken()
        window.location = '/'
    }

    render() {
        return (
            <nav role="navigation">
                <div className="logo"><NavLink to="/dashboard"><img id="nav-logo" src={logo} alt="DiscScore Logo" /></NavLink></div>
                <ul>
                    <li><NavLink to="/newgame"><FontAwesomeIcon icon={faPlusCircle} size="lg" /> New Game</NavLink></li>
                    <li><NavLink to="/" onClick={this.handleLogout}><FontAwesomeIcon icon={faSignOutAlt} size="lg" /> Logout</NavLink></li>
                </ul>
            </nav>
        )
    }
}