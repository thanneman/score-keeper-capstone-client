import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddGame from './AddGame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddGame />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});