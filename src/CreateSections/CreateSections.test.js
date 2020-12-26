import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CreateSections from './CreateSections';

describe('Create Installment component', () => {
    const props ={
    match: {
        params: {
            userId: 1, 
            installmentId: 1
        }
    }, 
    installId: 1
}
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateSections {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<CreateSections {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});