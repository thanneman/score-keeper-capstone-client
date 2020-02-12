import React, { Component } from 'react'
import ValidationError from '../components/validation-error'
import LoadingSpinner from '../components/LoadingSpinner'
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
            loading: null,
        }
    }

    // Check that the users credentials are valid
    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null, loading: true })
        const { email, password } = ev.target
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = ''
                password.value = ''
                this.setState({loading: false })
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
        // Display loader if the request is taking too long
        const { loading } = this.state;
        let errorLoad;
        if (loading === true) {
            errorLoad = <LoadingSpinner />;
        } 
        if (this.state.error) {
            errorLoad = <ValidationError message={this.state.error} />;
        } else {
            errorLoad = '';
        }

        return (
            <main role="main" className="login-container">
                <header role="banner">
                    <div className="login-logo">
                        <img id="login-logo" src={logo} alt="DiscScore Logo" />
                    </div>
                    <h2>Quickly track your disc golf games, scores, and locations.</h2>
                    <p>Record data about disc golf games to refenece at a later date.</p>
                    <p>Login or <Link to="/signup">sign up</Link> to get started.</p>
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
                        {errorLoad}
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