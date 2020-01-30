import React from 'react'
//import { Link } from 'react-router-dom'


export default function NavBar(props) {
        return (
            <div className="game-card" id={props.id}>
                <div className="game-card-title">
                <h4>{props.course_name}</h4>
                </div>
                <div className="game-card-info">
                    <p><span className="detail-label">Game Date: </span> {props.date}</p>
                    <p><span className="detail-label">Course Par: </span> {props.course_par}</p>
                    <p><span className="detail-label">Your Score: </span> {props.user_score}</p>
                    <p><span className="detail-label">Notes: </span> {props.notes}</p>
                </div>
                <button>Delete</button>
            </div>
        )
}