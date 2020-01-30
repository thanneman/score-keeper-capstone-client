import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'


export default class Signup extends Component {
    render() {
        return (
            <main role="main">
                <header role="banner">
                    <div className="login-logo">
                        <img id="login-logo" src={logo} alt="DiscScore Logo" />
                    </div>
                    <h3>Keep track and score your disc golf games, locations, and any notes about a course. </h3>
                </header>
                <div className="login">
                    <h3>Sign Up</h3>
                    <form className='signup-form'>
                        <div>
                            <label htmlFor="username">Email</label>
                            <input type="text" name='username' id='username' />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' />
                        </div>
                        <div className="error">
                            <p>error message here</p>
                        </div>
                        <button><Link to="/dashboard">Sign Up</Link></button>
                    </form>
                    <div>
                        <p>Already have an account? Login <Link to="/">here</Link></p>
                    </div>
                </div>
            </main>
        )
    }

}