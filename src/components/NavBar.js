import React, { Component } from 'react'
import TokenService from '../services/token-service'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png'


export default class NavBar extends Component {

    handleLogout = () => {
        TokenService.clearAuthToken()
        window.location = '/'
    }

    render() {
        return (
            <nav role="navigation">
                <div className="nav-header">
                    <div className="nav-logo">
                        <NavLink to="/dashboard"><img id="nav-logo" src={logo} alt="DiscScore Logo" /></NavLink>
                    </div>
                    <div className="nav-link">
                        <NavLink to="/newgame">New Game</NavLink>
                        {' | '}
                        <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}