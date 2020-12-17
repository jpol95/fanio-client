import "./App.css";
import React from "react";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import CreateReview from "./CreateReview/CreateReview";
import CreateFandom from "./CreateFandom/CreateFandom";
import ReviewMain from "./ReviewMain/ReviewMain";
import FandomView from "./FandomView/FandomView";
import InstallmentView from "./InstallmentView/InstallmentView";
import CreateInstallments from "./CreateInstallments/CreateInstallments";
import CreateSections from "./CreateSections/CreateSections";
import FetchService from './FetchService'
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

  handleSubmitReview = (newReview, tableName) => {
    const newTagListItems = newReview.tags.map((tag) => {
      return { tagId: tag.id, reviewId: newReview.id };
    });
    FetchService.p
    this.setState({
      ...this.state, reviewList: [...this.state.reviewList, newReview],
      tags: [...this.state.reviewTagList, ...newTagListItems],
    });
  };

  patchSection = (id, newSection, sectionName) => {
    const sectionListCopy = [...this.state[`${sectionName}List`]]
    sectionListCopy.forEach((section, index, sectionList) => {
      if (section.id === id) sectionList[index] = newSection
    })
    this.setState({
      ...this.state, [`${sectionName}List`]: sectionListCopy
    })
  }

  fetchFandoms = () => {
    FetchService.fetchFandoms().then(fandomList => {
      this.setState({...this.state, fandomList})
    })
  }
  fetchInstallments = (fandomId) => {
    FetchService.fetchInstallments(fandomId).then(installmentList => {
      this.setState({...this.state, installmentList})
    })
  }
  
  fetchSections = (installmentId, type) => {
    FetchService.fetchSections(installmentId)
    .then(result => {
      this.setState({
        ...this.state, [`${type.sectionName}List`] : result.sectionList, [`${type.subName}List`] : result.subList
      })
    })
  }

  //maybe have a fetch service for these functions?

  postReview = (review) => {
    this.setState({
      ...this.state, reviewList: [...this.state.reviewList, review]
    })
  }

  handleAddFandom = (fandom) => {
    this.setState({
      ...this.state,
      fandomList: [...this.state.fandomList, fandom],
    });
  };

  handleSubmitInstallments = (installmentList) => {
    this.setState({
      ...this.state,
      installmentList: [...this.state.installmentList, ...installmentList],
    });
  };

  handleSubmitSections = (sectionList, listName) => {
    const sectionListName = [`${listName}List`];
    console.log(sectionList)
    this.setState({
      ...this.state,
      [sectionListName] : [...this.state[sectionListName], ...sectionList],
    });
  };
//refactor to use redux
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
          handleSubmitReview: this.handleSubmitReview,
          handleAddFandom: this.handleAddFandom,
          handleSubmitInstallments: this.handleSubmitInstallments,
          handleSubmitSections: this.handleSubmitSections,
        }}
      >

        <NavBar />
        <Route exact path="/users/:userId/profile/" render={(props) => <Profile fetchFandoms={this.fetchFandoms} {...props} />} />
        <Route
          exact
          path={[
            "/users/1/sections/:sectionId/review-form/",
            "/users/1/sections/:sectionId/subs/:subId/review-form/",
          ]}
          component={CreateReview}
        />
        <Route
          exact
          path="/users/:userId/fandom-form"
          component={CreateFandom}
        />
        <Route
        //change this to include installmentId, sectionId, and subSectionId
          exact
          path="/users/:userId/review-main/:reviewId"
          component={ReviewMain}
        />
        <Route
          exact
          path="/users/:userId/fandom-view/:fandomId"
          render={(props) => <FandomView fetchInstallments={this.fetchInstallments} {...props} />}
        />
        <Route
          exact
          path="/users/:userId/fandoms/:fandomId/installment-view/:installmentId"
          render={(props) => <InstallmentView fetchSections={this.fetchSections} {...props} />}
        />
        <Route
          exact
          path="/users/:userId/fandoms/:fandomId/add-installments-form"
          component={CreateInstallments}
        />
        <Route
          exact
          path={[
            "/users/:userId/fandoms/:fandomId/installments/:installmentId/add-sections-form",
            "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/add-subs-form",
          ]}
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


 // componentDidMount() {
  //   const {
  //     fandomList,
  //     reviewList,
  //     seasonList,
  //     episodeList,
  //     tagList,
  //     reviewTagList,
  //     typeList,
  //     bookList,
  //     issueList,
  //     arcList,
  //     installmentList,
  //   } = dummyStore;
  //   const seedData = {
  //     fandomList,
  //     reviewList,
  //     seasonList,
  //     episodeList,
  //     tagList,
  //     reviewTagList,
  //     typeList,
  //     bookList,
  //     issueList,
  //     arcList,
  //     installmentList,
  //   };
  //   this.setState({
  //     ...seedData,
  //   });
  // }