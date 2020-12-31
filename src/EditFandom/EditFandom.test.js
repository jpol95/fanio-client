import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import EditFandom from './EditFandom';
import FanioContext from '../FanioContext'

describe('Edit fandom component', () => {
    const props = {
    match: {
        params: {
            userId: 1, 
            fandomId: 1
        }
    }, 
    installId: 1
}
const fandomList = [
    { id: 1, title: "Doctor Who", user: 1 }, //fk
    { id: 2, title: "Supernatural", user: 1 },
    { id: 3, title: "Parks and Recreation", user: 1 },
    { id: 4, title: "Buffy the Vampire Slayer", user: 1 },
    { id: 5, title: "Harry Potter", user: 1 },
  ];
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FanioContext.Provider value={{fandomList: fandomList}}> <EditFandom {...props} /> </FanioContext.Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<FanioContext.Provider value={{fandomList: fandomList}}> <EditFandom {...props} /> </FanioContext.Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});