import React from "react";
import "./EditPersonal.css";
import FetchService from '../FetchService'
import SignUpForm from '../SignUpForm/SignUpForm'
import FanioContext from '../FanioContext'

export default class EditPersonal extends React.Component {

  static contextType = FanioContext
  userId = Number(this.props.match.params.userId)

  handleSubmitUser = (e, personalInfo) => {
    e.preventDefault()
    const user = {
      fullname: personalInfo.fullname.value, 
      interests: personalInfo.interests.value.split(","),
      city: personalInfo.city.value, 
      education: personalInfo.education.value, 
      id: this.userId
    }
    FetchService.patchUser(user)
    .then((user) => {
      this.props.history.push(`/users/${this.userId}/profile`)
      this.context.handleEditPersonal(user)
    })
  }


  render() {
      const user = this.context.currentLoadedUser
      if (!user) return null
    return (

        <SignUpForm {...user} handleSubmitUser={this.handleSubmitUser} />
     
    );
  }
}
