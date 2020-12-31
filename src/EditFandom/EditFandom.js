import FandomForm from "../FandomForm/FandomForm";
import React from "react";
import FetchService from "../FetchService";
import FanioContext from "../FanioContext";

export default class EditFandom extends React.Component {
  userId = Number(this.props.match.params.userId);
  fandomId = Number(this.props.match.params.fandomId);
  static contextType = FanioContext;

  getFandomById() {
    return this.context.fandomList.find(
      (fandom) => fandom.id === this.fandomId
    );
  }

  handleSubmit = async (e, fandom) => {
    e.preventDefault();
    const fandomResult = await FetchService.patchFandom(
      { ...fandom, userId: this.userId },
      this.fandomId
    );
    this.props.history.push(
      `/users/${this.userId}/fandom-view/${fandomResult.id}`
    );
    this.context.handleEditFandom(fandomResult);
  };

  render() {
    if (!this.getFandomById()) return null;
    const title = this.getFandomById().title;
    const startInfo = { title };
    return (
      <>
        <h3>Edit Fandom</h3>
        <FandomForm {...startInfo} handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
