import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import EditInstallment from './EditInstallment';
import FanioContext from '../FanioContext'

describe('Edit Installment component', () => {
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
const installmentList = [
    { id: 1, title: "Doctor Who TV Series", typeId: 1, fandomId: 1 },
    { id: 2, title: "Parks and Rec TV Series", typeId: 1, fandomId: 3 },
    { id: 3, title: "Buffy TV Series", typeId: 1, fandomId: 4 },
    { id: 4, title: "Buffy Comic Series", typeId: 4, fandomId: 4 },
    { id: 5, title: "Supernatural TV Series", typeId: 1, fandomId: 2 },
    { id: 6, title: "Harry Potter Books", typeId: 2, fandomId: 5 },
  ];
  

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FanioContext.Provider value={{installmentList: installmentList}}> <EditInstallment {...props} /> </FanioContext.Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<FanioContext.Provider value={{installmentList: installmentList}}> <EditInstallment {...props} /> </FanioContext.Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
  });
});