import React, { Component } from 'react'
import ValidationError from '../components/validation-error'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import Footer from '../components/Footer'


export default class Signup extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    // Create initial state before data input
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
            repeatPassword: {
                value: '',
                touched: false
            },
        }
    }



    // Update state if input updated
    
    updateEmail(email) {
        this.setState({ email: { value: email, touched: true } });
    }

    updatePassword(password) {
        this.setState({ password: { value: password, touched: true } });
    }

    updateRepeatPassword(repeatPassword) {
        this.setState({ repeatPassword: { value: repeatPassword, touched: true } });
    }

    handleLoginSuccess = user => {
        window.location = '/dashboard'
    }


    // When submitted check validation and create tokens
    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { email, password, repeatPassword} = ev.target
        this.setState({ error: null })
        AuthApiService.postUser({
            email: email.value,
            password: password.value,
        })
            .then(user => {
                email.value = ''
                password.value = ''
                repeatPassword.value = ''
                TokenService.saveAuthToken(user.authToken)
                TokenService.saveUserId(user.userId)
                alert('User created')
                window.location = '/'
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }



    // Validate inputs

    validateEmail(fieldValue) {
        const email = this.state.email.value.trim();
        if (email.length === 0 ) {
            return 'Email is required';
        } else if (email.length < 5) {
            return 'Email must be at least 5 characters long'
        }else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            return 'Must be a valid email'
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

    validateRepeatPassword() {
        const repeatPassword = this.state.repeatPassword.value.trim();
        const password = this.state.password.value.trim();
        if (repeatPassword !== password) {
            return 'Passwords do not match';
        }
    }

    render() {
        return (
            <>
                <main role="main" className="login-container">
                    <header role="banner">
                        <div className="login-logo">
                            <img id="login-logo" src={logo} alt="DiscScore Logo" />
                        </div>
                        <h2>Quickly track your disc golf games, scores, and locations.</h2>
                    </header>
                    <div className="login">
                        <h3>Sign Up</h3>
                        <form className='signup-form' onSubmit={this.handleSubmitBasicAuth}>
                            <div>
                                <input type="text" name='email' id='email' placeholder='Email' required onChange={e => this.updateEmail(e.target.value)} />
                            </div>
                            <div>
                                <input type='password' name='password' id='password' placeholder='Password' required onChange={e => this.updatePassword(e.target.value)} />
                            </div>
                            <div>
                                <input type='password' name='repeatPassword' id='repeatPassword' placeholder='Repeat Password' required onChange={e => this.updateRepeatPassword(e.target.value)} />
                            </div>
                            <button type='submit'
                                disabled={
                                    this.validateEmail() ||
                                    this.validatePassword() ||
                                    this.validateRepeatPassword()
                                    }
                            >Sign up</button>
                        </form>
                        <div>
                            {this.state.email.touched && (<ValidationError message={this.validateEmail()} />)}
                            {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
                            {this.state.repeatPassword.touched && (<ValidationError message={this.validateRepeatPassword()} />)}
                            {this.state.error && (<ValidationError message={this.state.error} />)}
                        </div>
                        <div>
                            <p>Already have an account? <Link to="/">Login here</Link></p>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

}