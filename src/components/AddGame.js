import React, { Component } from 'react'
import GameApiService from '../services/game-api-service'
import ValidationError from './validation-error'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'


export default class AddGame extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    // Create initial state before fetching data
    constructor(props) {
        super(props);
        this.state = {
            course_name: {
                value: '',
                touched: false
            },
            course_par: {
                value: '',
                touched: false
            },
            front_score: {
                value: '',
                touched: false
            },
            back_score: {
                value: '',
                touched: false
            },
            notes: {
                value: '',
                touched: false
            },
        }
    }

    // Update course name state if input updated
    updateCourse(course_name) {
        this.setState({ course_name: { value: course_name, touched: true } });
    }

    // Update course par state if input updated
    updatePar(course_par) {
        this.setState({ course_par: { value: course_par, touched: true } });
    }

    // Update front score state if input updated
    updateFront(front_score) {
        this.setState({ front_score: { value: front_score, touched: true } });
    }

    // Update back score state if input updated
    updateBack(back_score) {
        this.setState({ back_score: { value: back_score, touched: true } });
    }

    // Update notes state if input updated
    updateNotes(notes) {
        this.setState({ notes: { value: notes, touched: true } });
    }

    // Handle submit to POST new game for logged in user
    handleSubmit = e => {
        e.preventDefault()
        this.setState({ error: null })
        const newGame = {
            course_name: e.target.course_name.value,
            course_par: e.target.course_par.value,
            front_score: e.target.front_score.value,
            back_score: e.target.back_score.value,
            notes: e.target.notes.value,
        }
        GameApiService.postUserGame(newGame.id, newGame.course_name, newGame.date, newGame.course_par, newGame.front_score, newGame.back_score, newGame.notes)
            .then(() => {
                window.location = '/dashboard'
            })
            .catch(this.state.error)
    }

    // Validates that a course name has been entered
    validateCourse() {
        const course_name = this.state.course_name.value.trim();
        if (course_name.length === 0 ) {
            return 'Please enter course name';
        }
    }

    // Validates that a course par has been entered and it's a number
    validatePar() {
        const course_par = this.state.course_par.value.trim();
        if (course_par.length === 0 ) {
            return 'Please enter course par';
        } else if (!isNaN(course_par.value)) {
            return 'Must be a number';
        } else if (course_par.length >= 4) {
            return 'Must be under 4 digits';
        }
    }

    // Validates that a front score has been entered and it's a number
    validateFront() {
        const front_score = this.state.front_score.value.trim();
        if (front_score.length === 0 ) {
            return 'Please enter front 9 score';
        } else if (!isNaN(front_score.value)) {
            return 'Must be a number';
        } else if (front_score.length >= 4) {
            return 'Must be under 4 digits';
        }
    }

    // Validates that a back score has been entered and it's a number
    validateBack() {
        const back_score = this.state.back_score.value.trim();
        if (back_score.length === 0 ) {
            return 'Please enter back 9 score';
        } else if (!isNaN(back_score.value)) {
            return 'Must be a number';
        } else if (back_score.length >= 4) {
            return 'Must be under 4 digits';
        }
    }

    // Validates that a note has been entered
    validateNotes() {
        const notes = this.state.notes.value.trim();
        if (notes.length === 0 ) {
            return 'Please enter a note';
        } else if (notes.length > 50) {
            return 'Must be under 50 characters'
        }
    }

    render() {
        return(
            <section className="game-list">
                <div className="game-card-lg">
                <div className="game-card-title">
                    <h4>New Game</h4>
                </div>
                <div className="game-card-info">
                    <form className="new-game-form" onSubmit={this.handleSubmit}>
                        <label>Enter Course Name:</label>
                        <input type="text" name="course_name" id="course_name" required placeholder="Shady Acres" onChange={e => this.updateCourse(e.target.value)} />
                        {this.state.course_name.touched && (<ValidationError message={this.validateCourse()} />)}

                        <label>Course Par:</label>
                        <input type="number" name="course_par" id="course_par" required placeholder="72" onChange={e => this.updatePar(e.target.value)} />
                        {this.state.course_par.touched && (<ValidationError message={this.validatePar()} />)}

                        <label>Enter Front 9 Score:</label>
                        <input type="number" name="front_score" id="front_score" placeholder="36" required onChange={e => this.updateFront(e.target.value)} />
                        {this.state.front_score.touched && (<ValidationError message={this.validateFront()} />)}

                        <label>Enter Back 9 Score:</label>
                        <input type="number" name="back_score" id="back_score" placeholder="36" required onChange={e => this.updateBack(e.target.value)} />
                        {this.state.back_score.touched && (<ValidationError message={this.validateBack()} />)}

                        <label>Notes:</label>
                        <textarea rows="6" name="notes" id="notes" placeholder="Watch out for Carl Spackler on hole 3." required onChange={e => this.updateNotes(e.target.value)} />
                        {this.state.notes.touched && (<ValidationError message={this.validateNotes()} />)}
                        {this.state.error && (<ValidationError message={this.state.error} />)}
                        <button
                            type='submit'
                            disabled={
                                this.validateCourse() ||
                                this.validatePar() ||
                                this.validateFront() ||
                                this.validateBack() ||
                                this.validateNotes()
                                }
                                >
                                Submit <FontAwesomeIcon icon={faCheckCircle} size="lg" /></button>
                    </form>
                    <Link className='game-cancel' to="/dashboard"><button>Cancel <FontAwesomeIcon icon={faTimesCircle} size="lg" /></button></Link>
                </div>
                </div>
            </section>
        )
    }
}