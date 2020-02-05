import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/utils/PrivateRoute'
import PublicOnlyRoute from './components/utils/PublicOnlyRoute'
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
              <PublicOnlyRoute path={'/signup'} component={Signup} />
              <PrivateRoute path={'/dashboard'} component={Dashboard} />
              <PrivateRoute path={'/newgame'} component={NewGame} />
            </Switch>
        </div>
      )
    }


}