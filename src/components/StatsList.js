import React, { Component } from 'react'
import GameContext from '../GameContext'
import ValidationError from './validation-error'
import GameApiService from '../services/game-api-service'

export default class StatsList extends Component {
    static contextType = GameContext;
    state = {
        stats: '',
        error: null,
    }

    // Fetches games and updates state when the component mounts
    componentDidMount() {
        GameApiService.getUserStats()
            .then(resJson =>
                this.setState({
                    stats: resJson
                }))
                .catch(res => {
                    this.setState({ error: res.error })
                })
        GameApiService.getUserStats()
            .then(resJson =>
                this.setState({
                    statsTwo: resJson
                }))
                .catch(res => {
                    this.setState({ error: res.error })
                })
    }

    render() {
        return (
                <section className="game-list">
                    {this.state.error && (<ValidationError message={this.state.error} />)}
                    
                    <div className="stat-card">
                        <div className="stat-card-title">
                            <h4>Number of Games:</h4>
                        </div>
                        <div className="stat-data">
                            <p></p>
                        </div>
                    </div>
                    
                </section>
        )
    }

}