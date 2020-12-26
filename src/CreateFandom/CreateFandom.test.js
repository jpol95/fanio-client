import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CreateFandom from './CreateFandom';

describe('Messages component', () => {
    const props ={
    match: {
        params: {
            userId: 1
        }
    }
}
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateFandom {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<CreateFandom {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});