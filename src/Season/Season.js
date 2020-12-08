import React from "react";
import "./Season.css";
import FanioContext from '../FanioContext'

export default class Season extends React.Component {

  static contextType = FanioContext 

  getEpisodes(){
    return this.context.episodeList
    .filter(episode => episode.seasonId === this.props.id)
    .map(episode => {
      return <div className="episode">
      {episode.name} <button>Write Review</button>
    </div>
    })
  }
  render() {
    return (
      <div className="fandom-comp">
        <div className="season">
          {this.props.name}<button>Write Review</button>
          <div className="episode-list ">
            {this.getEpisodes()}
          </div>
          <button>Add episode</button>
          <label htmlFor="add-episode">Add episode</label>
          <input id="add-episode" type="text" />
        </div>
      </div>
    );
  }
}
