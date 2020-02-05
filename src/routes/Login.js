import React, { Component } from 'react'
import ValidationError from '../components/validation-error'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import GameContext from '../GameContext'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export default class Login extends Component {
    static contextType = GameContext;

    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                touched: false,
            },
            password: {
                value: '',
                touched: false,
            },
        }
    }

    handleLoginSuccess = () => {
        window.location = '/dashboard'
    }

    updateEmail(email) {
        this.setState({ email: { value: email, touched: true } });
    }

    updatePassword(password) {
        this.setState({ password: { value: password, touched: true } });
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { email, password } = ev.target
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveUserId(res.userId)
                window.location = '/dashboard'
            })
            .then()
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    validateEmail() {
        const email = this.state.email.value.trim();
        if (email.length === 0 ) {
            return 'Email is required';
        } else if (email.length < 5) {
            return 'Email must be at least 5 characters long'
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0 ) {
            return 'Password is required';
        } else if (password.length < 6 || password.length > 20) {
            return 'Password must be between 6 and 20 characters long';
        } else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])[\S]+/)) {
            return 'Password must contain 1 upper case, lower case, and a number'
        }
    }

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
                    <h3>Login</h3>
                    <form className='signup-form' onSubmit={this.handleSubmitJwtAuth}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type='text' name='email' id='email' onChange={e => this.updateEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' id='password' onChange={e => this.updatePassword(e.target.value)} />
                        </div>
                        <div className='error'>
                            <p>
                                {this.state.email.touched && (<ValidationError message={this.validateEmail()} />)}
                                {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
                            </p>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                    <div>
                        <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>
                    </div>
                </div>
                <div className="demo">
                    <p>To view a demo use:</p>
                    <p>Email: demo@test.com</p>
                    <p>Password: Password1</p>
                </div>
            </main>
        )
    }

}