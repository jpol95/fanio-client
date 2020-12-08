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
        <Profile />
        <CreateReview />
        <CreateFandom />
        <ReviewMain />
        <SignUp />
        <Landing />
        <Footer />
      </FanioContext.Provider>
    );
  }
}

export default App;
