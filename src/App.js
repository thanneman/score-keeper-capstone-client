import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import NewGame from './routes/NewGame'
import './App.css'

export default class App extends Component {
    
    
    render() {
      return (
        <div className="App">
            <Switch>
              <Route exact path={'/'} component={Login} />
              <Route path={'/signup'} component={Signup} />
              <Route path={'/dashboard'} component={Dashboard} />
              <Route path={'/newgame'} component={NewGame} />
            </Switch>
        </div>
      )
    }


}