import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Stats from './Stats';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Stats />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});