import renderer from 'react-test-renderer'
import React from 'react'
import ReactDOM from 'react-dom'

describe('Profile page tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Profile />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})