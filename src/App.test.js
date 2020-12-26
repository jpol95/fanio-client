import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  const div = document.createElement('div');
  render(<BrowserRouter>
           <App />
         </BrowserRouter>);
 ReactDOM.unmountComponentAtNode(div);
});
