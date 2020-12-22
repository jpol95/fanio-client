import FandomForm from '../FandomForm/FandomForm'
import React from 'react'
import FetchService from '../FetchService'
import FanioContext from '../FanioContext'

export default class CreateFandom extends React.Component{
    

  userId = this.props.match.params.userId
  static contextType = FanioContext
  handleSubmit = async (e, fandom) => {
    e.preventDefault()
    const fandomResult = await FetchService.postFandom({...fandom, userId: this.userId})
    // console.log(fandom)
    this.props.history.push(`/users/${this.userId}/fandom-view/${fandomResult.id}`)
    this.context.handleAddFandom(fandomResult)
  }

  render(){
      return (   
      <FandomForm handleSubmit={this.handleSubmit} />
      )
      //YOU ARE HERE. FIGURE OUT WHY THIS PROP IS NOT COMING THROUGH
  }
}