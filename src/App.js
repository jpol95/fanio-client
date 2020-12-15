import "./App.css";
import React from "react";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import CreateReview from "./CreateReview/CreateReview";
import CreateFandom from "./CreateFandom/CreateFandom";
import ReviewMain from "./ReviewMain/ReviewMain";
import FandomView from './FandomView/FandomView'
import InstallmentView from './InstallmentView/InstallmentView'
import CreateInstallments from './CreateInstallments/CreateInstallments'
import CreateSections from './CreateSingleSection/CreateSingleSection'
import SignUp from "./SignUp/SignUp";
import Landing from "./Landing/Landing";
import dummyStore from "./dummy-store";
import FanioContext from "./FanioContext";
import { Route } from "react-router-dom";

class App extends React.Component {
  state = {
    fandomList: [],
    reviewList: [],
    seasonList: [],
    episodeList: [],
    tagList: [],
    reviewTagList: [],
    typeList: [],
    bookList: [],
    issueList: [],
    arcList: [],
    installmentList: [],
  };

  componentDidMount() {
    const { fandomList, reviewList, seasonList, episodeList, tagList, reviewTagList, typeList, bookList, issueList, arcList, installmentList } = dummyStore
    const seedData = { fandomList, reviewList, seasonList, episodeList, tagList, reviewTagList, typeList, bookList, issueList, arcList, installmentList }
    this.setState({
      ...seedData
    });
  }

  handleSubmit = (newReview) => {
    const newTagListItems = newReview.tags.map((tag) => {
      return { tagId: tag.id, reviewId: newReview.id };
    });
    this.setState({
      ...this.state,
      reviewList: {
        id: newReview.id,
        title: newReview.title,
        content: newReview.content,
        rating: newReview.rating,
      },
      tags: [...this.state.reviewTagList, ...newTagListItems],
    });
  };

  handleAddFandom = (fandom) => {
    this.setState({
      ...this.state, fandomList: [...this.state.fandomList, fandom]
    })
  }

  handleSubmitInstallments = (installmentList) => {
    console.log(installmentList)
    this.setState({
      ...this.state, installmentList: [...this.state.installmentList, ...installmentList]
    })
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
          reviewTagList: this.state.reviewTagList,
          typeList: this.state.typeList,
          bookList: this.state.bookList,
          issueList: this.state.issueList,
          arcList: this.state.arcList,
          installmentList: this.state.installmentList,
          handleSubmit: this.handleSubmit,
          handleAddFandom: this.handleAddFandom, 
          handleSubmitInstallments: this.handleSubmitInstallments
        }}
      >
        <NavBar />
        <Route exact path="/users/:userId/profile/" component={Profile} />
        <Route
          exact
          path={[
            "/users/:userId/review-form/:seasonId",
            "/users/:userId/review-form/:seasonId/episode",
          ]}
          component={CreateReview}
        />
        <Route
          exact
          path="/users/:userId/fandom-form"
          component={CreateFandom}
        />
        <Route
          exact
          path="/users/:userId/review-main/:reviewId"
          component={ReviewMain}
        />
        <Route
          exact
          path="/users/:userId/fandom-view/:fandomId"
          component={FandomView}
          />
        <Route
          exact
          path="/users/:userId/fandoms/:fandomId/installment-view/:installmentId"
          component={InstallmentView}
        />
        <Route
          exact
          path="/users/:userId/fandoms/:fandomId/add-installments-form"
          component={CreateInstallments}
          />
          <Route 
            exact 
            path="/users/:userId/fandoms/:fandomId/installments/:installmentId/add-sections-form"
            component={CreateSections}
            />
        <Route exact path="/signup-form" component={SignUp} />
        <Route exact path="/landing" component={Landing} />
        <Footer />
      </FanioContext.Provider>
    );
  }
}

export default App;
