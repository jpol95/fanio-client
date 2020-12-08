import "./App.css";
import React from "react";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import CreateReview from "./CreateReview/CreateReview";
import CreateFandom from "./CreateFandom/CreateFandom";
import ReviewMain from "./ReviewMain/ReviewMain";
import SignUp from "./SignUp/SignUp";
import Landing from "./Landing/Landing";
import dummyStore from "./dummy-store";
import FanioContext from "./FanioContext";
import {Route} from 'react-router-dom'

class App extends React.Component {
  state = {
    fandomList: [],
    reviewList: [],
    seasonList: [],
    episodeList: [],
    tagList: [],
  };

  componentDidMount() {
    this.setState({
      fandomList: dummyStore.fandomList,
      reviewList: dummyStore.reviewList,
      seasonList: dummyStore.seasonList,
      episodeList: dummyStore.episodeList,
      tagList: dummyStore.tagList,
    });
  }

  render() {
    return (
      <FanioContext.Provider
        value={{
          fandomList: this.state.fandomList,
          reviewList: this.state.reviewList,
          seasonList: this.state.seasonList,
          episodeList: this.state.episodeList,
          tagList: this.state.tagList,
        }}
      >
        <NavBar />
        <Route exact path="/users/:userId/profile/" component={Profile} />
        <Route exact path="/users/:userId/review-form" component={CreateReview} />
        <Route exact path="/users/:userId/fandom-form" component={CreateFandom} />
        <Route exact path="/users/:userId/review-main/:reviewId" component={ReviewMain} />
        <Route exact path="/signup-form" component={SignUp} />
        <Route exact path="/landing" component={Landing} />
        <Footer />
      </FanioContext.Provider>
    );
  }
}

export default App;
