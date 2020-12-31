import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import EditPersonal from './EditPersonal';
import FanioContext from '../FanioContext'

describe('Edit personal component', () => {
    const props = {
    match: {
        params: {
            userId: 1, 
            fandomId: 1, 
            installmentId: 1
        }
    }, 
    installId: 1
}
const currentLoadedUser = {
    id: 1,
    username: "kingbumii",
    fullname: "Jesse A Pollack",
    password: "$2y$12$4R1JkopQ4LgjXH27bUAV5OwezOQLoBP6Yv7mbd.Nv7V67yBSmepZq",
    education: "Purple University",
    interests: ["skating", "softball", "listending to show tunes", "knitting"],
    city: "Gallifrey",
  }
  

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FanioContext.Provider value={{currentLoadedUser}}> <EditPersonal {...props} /> </FanioContext.Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<FanioContext.Provider value={{currentLoadedUser}}> <EditPersonal {...props} /> </FanioContext.Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});