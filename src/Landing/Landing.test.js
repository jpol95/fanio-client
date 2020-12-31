import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Landing from './Landing';

describe('Landing component', () => {
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Landing /> , div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

