import React from "react";
import FanioContext from "../FanioContext";
import FetchService from "../FetchService";
import typeList from "../type-list";

export default class EditInstallment extends React.Component {
  static contextType = FanioContext;

  types = Object.keys(typeList);

  state = {
    type: { value: "", touched: false },
    title: { value: "", touched: false },
    loaded: false,
  };

  fandomId = Number(this.props.match.params.fandomId);
  userId = Number(this.props.match.params.userId);
  installmentId = Number(this.props.match.params.installmentId);

  componentDidUpdate() {
    if (!this.getInstallment() || this.state.loaded) return;
    this.setState({
      type: { value: this.getInstallment().type, touched: false },
      title: { value: this.getInstallment().title, touched: false },
      loaded: true,
    });
  }

  getInstallment() {
    return this.context.installmentList.find(
      (installment) => installment.id === this.installmentId
    );
  }

  handleTypeChange = (e) => {
    this.setState({
      ...this.state,
      type: { value: e.target.value, touched: true },
    });
  };

  handleTitleChange = (e) => {
    this.setState({
      ...this.state,
      title: { value: e.target.value, touched: true },
    });
  };

  invalidType = () => {
    return !this.state.type.value;
  };

  invalidTitle = () => {
    return !this.state.title.value;
  };

  handleEditInstallment = async (e) => {
    e.preventDefault();
    const installCopy = {
      type: this.state.type.value,
      title: this.state.title.value,
      id: this.installmentId,
    };
    const installment = await FetchService.patchInstallment(installCopy);
    this.props.history.push(
      `/users/${this.userId}/fandom-view/${this.fandomId}`
    );
    this.context.handleEditInstallment(installment);
  };

  render() {
    if (!this.getInstallment()) return null;
    return (
      <form onSubmit={this.handleEditInstallment}>
        <label htmlFor={`type-${this.installmentId}`}>
          What type of installment is this?
        </label>
        {this.invalidType() && <div className="error">Type is required</div>}
        <select
          key={this.installmentId}
          onChange={this.handleTypeChange}
          id={`type-${this.installmentId}`}
        >
          <option></option>
          {this.types &&
            this.types.map((type, index) => {
              if (type === this.getInstallment().type)
                return (
                  <option key={index} value={type} selected>
                    {type}
                  </option>
                );
              return <option key={index} value={type}>{type}</option>;
            })}
        </select>
        {this.state.type !== "" && (
          <React.Fragment>
            <label>What is the name of this {this.state.type.value}?</label>
            {this.invalidTitle() && (
              <div className="error">Title is required</div>
            )}
            <input
              defaultValue={this.state.title.value}
              onChange={this.handleTitleChange}
              type="text"
            />
          </React.Fragment>
        )}
        <br />
        <button
          disabled={this.invalidType() || this.invalidTitle()}
          className="edit-installment-button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
