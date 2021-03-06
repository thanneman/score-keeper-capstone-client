import React, { Component } from 'react'
import ValidationError from './validation-error'
import GameContext from '../GameContext'
import GameApiService from '../services/game-api-service'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


export default class Game extends Component {
    static contextType = GameContext;
    // Set initial state for user before fetch
    state = {
        loading: true,
        games: [],
        error: null,
    }

    // Updates states when a game has been deleted
    deleteGame = gameId => {
        const newGames = this.state.games.filter(rec =>
            rec.id !== gameId
        )
        this.setState({
            games: newGames
        })
    }

    // Fetches games and updates state when the component mounts
    componentDidMount() {
        GameApiService.getUserGames()
            .then(resJson =>
                this.setState({
                    games: resJson
                }))
                .catch(res => {
                    this.setState({ error: res.error })
                })
    }

    // Handles delete for logged in user
    handleDelete = e => {
        e.preventDefault()
        const { id } = e.target
        const gameId = Number(id)
        GameApiService.deleteGame(gameId, this.deleteGame(gameId))
    }

    render() {
        // If the user has no games display a prompt to add a game
        if (this.state.games.length === 0) {
            return <div className="no-games">
                        You haven't entered any games yet. Please enter a new game!
                        <NavLink className='no-game-btn' to="/newgame"><FontAwesomeIcon icon={faPlusCircle} size="lg" /> Start New Game</NavLink>
                    </div>
        }
        return (
            <>
                {this.state.error && (<ValidationError message={this.state.error} />)}
                {this.state.games.map(game => (
                <div className="game-card" key={game.id} id={game.id}>
                    <div className="game-card-title">
                    <h4>{game.course_name}</h4>
                    </div>
                    <div className="game-card-info">
                        <p><span className="detail-label">Game Date: </span>{moment(game.date).format("MMMM D, YYYY")}</p>
                        <p><span className="detail-label">Game Time: </span>{moment(game.date).format("h:mm A")}</p>
                        <p><span className="detail-label">Course Par: </span>{game.course_par}</p>
                        <p><span className="detail-label">Your Score: </span>{addScores(game.front_score, game.back_score)}</p>
                        <p><span className="detail-label">Notes: </span>{game.notes}</p>
                    </div>
                    <button id={game.id} type='submit' onClick={this.handleDelete}>Delete <FontAwesomeIcon icon={faTrashAlt} size="lg" /></button>
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