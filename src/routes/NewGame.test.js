import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import NewGame from './NewGame'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NewGame />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});