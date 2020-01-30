import React from 'react'
import { Link } from 'react-router-dom'


export default function AddDetails() {
    return(
        <section className="game-detail">
            <div className="game-card-lg">
            <div className="game-card-title">
                <h4>New Game</h4>
            </div>
            <div className="game-card-info">
                <form className="new-game-form">
                <label>Enter Course Name:</label>
                <input type="text" name="course_name" id="course_name" />

                <label>Game Date:</label>
                <input type="date" name="date" id="date" />

                <label>Course Par:</label>
                <input type="text" name="course_par" id="course_par" />

                <label>Enter Front 9 Score:</label>
                <input type="text" name="user_front_score" id="user_front_score" />

                <label>Enter Back 9 Score:</label>
                <input type="text" name="user_back_score" id="user_back_score" />

                <label>Notes:</label>
                <textarea rows="8" cols="40" name="notes" id="notes" />
                </form>
                <button><Link to="/dashboard">Submit</Link></button>
            </div>
            </div>
        </section>
    )
}