import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'


export default function NavBar() {
        return (
            <nav role="navigation">
                <div className="nav-header">
                    <div className="nav-logo">
                        <Link to="/"><img id="nav-logo" src={logo} alt="DiscScore Logo" /></Link>
                    </div>
                    <div className="nav-link">
                        <Link to="/newgame">New Game</Link>
                        {' | '}
                        <Link to="/">Logout</Link>
                    </div>
                </div>
            </nav>
        )
}