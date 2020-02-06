import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ValidationError from './validation-error';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ValidationError />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});