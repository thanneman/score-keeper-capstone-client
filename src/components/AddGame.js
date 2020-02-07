import React, { Component } from 'react'
import GameApiService from '../services/game-api-service'
import ValidationError from './validation-error'
import { Link } from 'react-router-dom'


export default class AddGame extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

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

    updateCourse(course_name) {
        this.setState({ course_name: { value: course_name, touched: true } });
    }

    updatePar(course_par) {
        this.setState({ course_par: { value: course_par, touched: true } });
    }

    updateFront(front_score) {
        this.setState({ front_score: { value: front_score, touched: true } });
    }

    updateBack(back_score) {
        this.setState({ back_score: { value: back_score, touched: true } });
    }

    updateNotes(notes) {
        this.setState({ notes: { value: notes, touched: true } });
    }

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
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    validateCourse() {
        const course_name = this.state.course_name.value.trim();
        if (course_name.length === 0 ) {
            return 'Please enter course name';
        }
    }

    validatePar() {
        const course_par = this.state.course_par.value.trim();
        if (course_par.length === 0 ) {
            return 'Please enter course par';
        } else if (!isNaN(course_par.value)) {
            return 'Must be a number';
        }
    }

    validateFront() {
        const front_score = this.state.front_score.value.trim();
        if (front_score.length === 0 ) {
            return 'Please enter front 9 score';
        } else if (!isNaN(front_score.value)) {
            return 'Must be a number';
        }
    }

    validateBack() {
        const back_score = this.state.back_score.value.trim();
        if (back_score.length === 0 ) {
            return 'Please enter back 9 score';
        } else if (!isNaN(back_score.value)) {
            return 'Must be a number';
        }
    }

    validateNotes() {
        const notes = this.state.notes.value.trim();
        if (notes.length === 0 ) {
            return 'Please enter a note';
        }
    }

    render() {
        return(
            <section className="game-detail">
                <div className="game-card-lg">
                <div className="game-card-title">
                    <h4>New Game</h4>
                </div>
                <div className="game-card-info">
                    <form className="new-game-form" onSubmit={this.handleSubmit}>
                        <label>Enter Course Name:</label>
                        <input type="text" name="course_name" id="course_name" required onChange={e => this.updateCourse(e.target.value)} />
                        {this.state.course_name.touched && (<ValidationError message={this.validateCourse()} />)}

                        <label>Course Par:</label>
                        <input type="number" name="course_par" id="course_par" required onChange={e => this.updatePar(e.target.value)} />
                        {this.state.course_par.touched && (<ValidationError message={this.validatePar()} />)}

                        <label>Enter Front 9 Score:</label>
                        <input type="number" name="front_score" id="front_score" placeholder="36" required onChange={e => this.updateFront(e.target.value)} />
                        {this.state.front_score.touched && (<ValidationError message={this.validateFront()} />)}

                        <label>Enter Back 9 Score:</label>
                        <input type="number" name="back_score" id="back_score" placeholder="36" required onChange={e => this.updateBack(e.target.value)} />
                        {this.state.back_score.touched && (<ValidationError message={this.validateBack()} />)}

                        <label>Notes:</label>
                        <textarea rows="8" cols="50" name="notes" id="notes" placeholder="Watch out for Carl Spackler on hole 3." required onChange={e => this.updateNotes(e.target.value)} />
                        {this.state.notes.touched && (<ValidationError message={this.validateNotes()} />)}
                        {this.state.error && (<ValidationError message={this.state.error} />)}
                        <button type='submit'>Submit</button>
                    </form>
                    <button><Link to="/dashboard">Cancel</Link></button>
                </div>
                </div>
            </section>
        )
    }
}