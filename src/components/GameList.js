import React, { Component } from 'react'
import Game from '../components/Game'
import dummyStore from '../dummy-store'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            error: null
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({games: dummyStore}), 600)
    }

    render() {
        const games = this.state.games.map((game, i) => {
            return <Game {...game} key={i} />
          });

        return (
            <section className="game-list">
                {games}
            </section>
        )
    }

}