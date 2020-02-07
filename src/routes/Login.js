import React, { Component } from 'react'
import ValidationError from '../components/validation-error'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export default class Login extends Component {

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

    render() {
        return (
            <main role="main" className="login-container">
                <header role="banner">
                    <div className="login-logo">
                        <img id="login-logo" src={logo} alt="DiscScore Logo" />
                    </div>
                    <h2>Quickly track your disc golf games, scores, and locations.</h2>
                </header>
                <div className="login">
                    <h3>Login</h3>
                    <form className='signup-form' onSubmit={this.handleSubmitJwtAuth}>
                        <div>
                            <input type='text' name='email' id='email' placeholder='Email'/>
                        </div>
                        <div>
                            <input type='password' name='password' id='password' placeholder='Password'/>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                    <div>
                        <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>
                    </div>
                    <div>
                        {this.state.error && (<ValidationError message={this.state.error} />)}
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