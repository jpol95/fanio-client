import React from 'react'

export default class CheckUser extends React.Component{
    userId = Number(this.props.match.params.userId)
    componentDidMount(){
        if (this.userId !== this.props.currentLoadedUser){
            this.props.loadData(this.userId)
       }
    }
    render() {
        return this.props.children
    }
}