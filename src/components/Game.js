import React, { Component } from 'react'
import GameContext from '../GameContext'
import GameApiService from '../services/game-api-service'
import moment from 'moment'
//import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    static contextType = GameContext;
    state = {
        games: []
    }

    deleteGame = gameId => {
        const newGames = this.state.games.filter(rec =>
            rec.id !== gameId
        )
        this.setState({
            games: newGames
        })
    }

    componentDidMount() {
        GameApiService.getUserGames()
            .then(resJson =>
                this.setState({
                    games: resJson
                }))
    }

    handleDelete = e => {
        e.preventDefault()
        const { id } = e.target
        const gameId = Number(id)
        GameApiService.deleteGame(gameId, this.deleteGame(gameId))
    }

    render() {
        return (
            <>
                {this.state.games.map(game => (
                <div className="game-card" key={game.id}>
                    <div className="game-card-title">
                    <h4>{game.course_name}</h4>
                    </div>
                    <div className="game-card-info">
                        <p><span className="detail-label">Game Date: </span>{moment(game.date).format("MMMM D, YYYY")}</p>
                        <p><span className="detail-label">Course Par: </span>{game.course_par}</p>
                        <p><span className="detail-label">Your Score: </span>{addScores(game.front_score, game.back_score)}</p>
                        <p><span className="detail-label">Notes: </span>{game.notes}</p>
                    </div>
                    <button id={game.id} type='submit' onClick={this.handleDelete}>Delete</button>
                </div>
                ))}
            </>
        )
    }
}

function addScores(scoreOne, scoreTwo) {
    const score = scoreOne + scoreTwo;
    return score;
}