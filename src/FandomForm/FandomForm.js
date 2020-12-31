import React from "react";
import "./FandomForm.css";
import FanioContext from "../FanioContext";

export default class Fandom extends React.Component {
  static contextType = FanioContext;
  state = {
    title: { value: this.props.title, touched: false },
  };

  handleName = (e) => {
    this.setState({
      ...this.state,
      title: { value: e.target.value, touched: true },
    });
  };

  invalidTitle = () => {
    return !this.state.title.value;
  };

  render() {
    return (
      <div className="fandom">
        <form
          onSubmit={(e) =>
            this.props.handleSubmit(e, { title: this.state.title.value })
          }
          className="create-fandom"
        >
          <label htmlFor="workname">Name of fandom*</label>
          {this.invalidTitle() && this.state.title.touched && (
            <div className="error">Title is required</div>
          )}
          <input
            onChange={this.handleName}
            defaultValue={this.state.title.value}
            id="workname"
            type="text"
          />
          <button
            disabled={this.invalidTitle()}
            className="submit-fandom-button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
