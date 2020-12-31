import FandomForm from "../FandomForm/FandomForm";
import React from "react";
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";

export default class CreateFandom extends React.Component {
  userId = this.props.match.params.userId;
  static contextType = FanioContext;
  handleSubmit = async (e, fandom) => {
    e.preventDefault();
    const fandomResult = await FetchService.postFandom({
      ...fandom,
      userId: this.userId,
    });
    this.props.history.push(
      `/users/${this.userId}/fandom-view/${fandomResult.id}`
    );
    this.context.handleAddFandom(fandomResult);
  };

  render() {
    const startInfo = { title: "" };
    return (
      <>
        <h3>Create Fandom</h3>
        <FandomForm {...startInfo} handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
