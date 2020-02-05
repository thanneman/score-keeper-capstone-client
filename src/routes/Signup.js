import React, { Component } from 'react'
import ValidationError from './validation-error'
import AuthApiService from '../services/auth-api-service'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'


export default class Signup extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

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

    updateEmail(email) {
        this.setState({ email: { value: email, touched: true } });
    }

    updatePassword(password) {
        this.setState({ password: { value: password, touched: true } });
    }

    updateRepeatPassword(repeatPassword) {
        this.setState({ email: { value: password, touched: true } });
    }

    handleLoginSuccess = user => {
        window.location = '/login'
    }

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
                this.handleLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    validateEmail(fieldValue) {
        const email = this.state.email.value.trim();
        if (email.length === 0 ) {
            return 'Email is required';
        } else if (email.length < 5) {
            return 'Email must be at least 5 characters long'
        }
    }

    validatePassword(fieldValue) {
        const password = this.state.password.value.trim();
        if (email.length === 0 ) {
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
            <main role="main">
                <header role="banner">
                    <div className="login-logo">
                        <img id="login-logo" src={logo} alt="DiscScore Logo" />
                    </div>
                    <h3>Keep track and score your disc golf games, locations, and any notes about a course. </h3>
                </header>
                <div className="login">
                    <h3>Sign Up</h3>
                    <form className='signup-form' onSubmit={this.handleSubmitBasicAuth}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" name='email' id='email' onChange={e => this.updateEmail(e.target.value)} />
                            {this.state.email.touched && (<ValidationError message={this.validateEmail()} />)}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' id='password' onChange={e => this.updatePassword(e.target.value)} />
                            {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
                        </div>
                        <div>
                            <label htmlFor="repeat-password">Password</label>
                            <input type='password' name='repeatPassword' id='repeatPassword' onChange={e => this.updateRepeatPassword(e.target.value)} />
                            {this.state.repeatPassword.touched && (<ValidationError message={this.validateRepeatPassword()} />)}
                        </div>
                        <button type='submit'>Sign up</button>
                    </form>
                    <div>
                        <p>Already have an account? Login <Link to="/">here</Link></p>
                    </div>
                </div>
            </main>
        )
    }

}