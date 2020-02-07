import React, { Component } from 'react'
import GameContext from '../GameContext'
import Game from '../components/Game'

export default class GameList extends Component {
    state = {
        games: [],
        id: '',
        course_name: '',
        date: '',
        course_par: '',
        front_score: '',
        back_score: '',
        notes: '',
        error: null,
    }

    setError = error => {
        console.error(error)
        this.setState({ error: true })
    }

    addGame = game => {
        this.setState({
            games: [...this.state.games, game],
        })
    }

    deleteGame = gameId => {
        const newGames = this.state.games.filter(rec => 
            rec.id !== gameId
        )
        this.setState({
            games: newGames
        })
    }

    render() {
        const contextValue = {
            id: this.state.id,
            course_name: this.state.course_name,
            date: this.state.date,
            course_par: this.state.course_par,
            front_score: this.state.front_score,
            back_score: this.state.back_score,
            notes: this.state.notes,
            addGame: this.addGame,
            deleteGame: this.deleteGame,
            addUser: this.addUser,
        }

        return (
            <GameContext.Provider value={contextValue}>
                <section className="game-list">
                    <Game />
                </section>
            </GameContext.Provider>
        )
    }

}