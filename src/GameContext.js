import React from 'react'

const GameContext = React.createContext({
    games: [],
    id: '',
    course_name: '',
    date: '',
    course_par: '',
    front_score: '',
    back_score: '',
    notes: '',
    addGame: () => {},
    deleteGame: () => {},
    addUserUser: () => {},
})

export default GameContext