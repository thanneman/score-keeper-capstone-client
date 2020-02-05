import React, { Component } from 'react'
import GameApiService from '../services/game-api-service'
import { Link } from 'react-router-dom'


export default class extends Component {
    static defaultProps = {
        onAddGame: () => {},
        onSetError: () => {},
    }

    handleSubmit = e => {
        e.preventDefault()
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
            .catch(this.props.onSetError)
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
                        <input type="text" name="course_name" id="course_name" />

                        <label>Course Par:</label>
                        <input type="text" name="course_par" id="course_par" />

                        <label>Enter Front 9 Score:</label>
                        <input type="text" name="front_score" id="front_score" />

                        <label>Enter Back 9 Score:</label>
                        <input type="text" name="back_score" id="back_score" />

                        <label>Notes:</label>
                        <textarea rows="8" cols="40" name="notes" id="notes" />
                        
                        <button type='submit'>Submit</button>
                    </form>
                    <button><Link to="/dashboard">Cancel</Link></button>
                </div>
                </div>
            </section>
        )
    }
}