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
import FanioContext from "./FanioContext";
import { Route } from "react-router-dom";

class App extends React.Component {
  state = {
    fandomList: [],
    reviewList: [],
    sectionList: [],
    subList: [],
    tagList: [], 
    reviewTagList: [],
    installmentList: [],
  };

  // componentDidMount() {
  //   FetchService.fetchTags()
    
  // }

  handleSubmitReview = async (newReview, tags, tableName, parentId) => {
    // console.log(newReview)
    let newTagListItems = tags.map((tag) => {
      return { tagId: Number(tag), reviewId: newReview.id };
    });
    newTagListItems = await FetchService.postTrels(newTagListItems)
    // console.log(typeof parentId)
    const section = this.state[`${tableName}List`].find(section => section.id === Number(parentId))
    const newSection = {...section, reviewId: newReview.id}
    console.log(newSection)
    const updatedSection = await FetchService.patchSection(newSection, newSection.id, tableName)
    this.patchSection(updatedSection, `${tableName}List`)
    this.setState({
      ...this.state, reviewList: [...this.state.reviewList, newReview],
      reviewTagList: [...this.state.reviewTagList, ...newTagListItems],
    });
  };

  patchSection = (newSection, tableName) => {
    console.log(newSection)
    const sectionListCopy = [...this.state[tableName]]
    sectionListCopy.forEach((section, index, sectionList) => {
      if (section.id === newSection.id) sectionList[index] = newSection
    })
    this.setState({
      ...this.state, [tableName]: sectionListCopy
    })
  }

  componentDidMount = () => {
    this.loadData()
  }

  loadData = async () => {
    const fandoms = await this.fetchFandoms()
    fandoms.forEach(async fandom => {
      const installments = await this.fetchInstallments(fandom.id)
      installments.forEach(async installment => {
        const sectionArr = await this.fetchSections(installment.id) 
        this.loadReviews(sectionArr)
      })
    })
    this.fetchTags()
    this.fetchTrels()
  }

  loadReviews = (sectionArr) => {
    const promArray = []
    sectionArr.sectionList.forEach(section => {
      if (section.reviewId)
      promArray.push(FetchService.fetchReview(section.reviewId))
    })
    sectionArr.subList.forEach(sub => {
      if (sub.reviewId)
      promArray.push(FetchService.fetchReview(sub.reviewId))
    })
    Promise.all(promArray).then(reviews => {
      this.setState({
        ...this.state, reviewList: [...this.state.reviewList, ...reviews]
      })
    })
  }

  fetchTags = async () => {
    const tagList = await FetchService.fetchTags()
    this.setState({...this.state, tagList})
  }

  fetchTrels = async () => {
    const reviewTagList = await FetchService.fetchTrels()
    this.setState({...this.state, reviewTagList})
  }

  fetchFandoms = async () => {
      const fandomList = await FetchService.fetchFandoms()
      this.setState({...this.state, fandomList: [...this.state.fandomList, ...fandomList]})
      return fandomList
  }
  fetchInstallments = async (fandomId) => {
    const installmentList = await FetchService.fetchInstallments(fandomId)
      this.setState({...this.state, installmentList : [...this.state.installmentList, ...installmentList]})
      return installmentList
  }
  
  fetchSections = async (installmentId) => {
    const sectionArr = await FetchService.fetchSections(installmentId)
      this.setState({
        ...this.state, [`sectionList`] : [...this.state.sectionList, ...sectionArr.sectionList], [`subList`] : [...this.state.subList, ...sectionArr.subList]
      })
    return sectionArr
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
    this.setState({
      ...this.state,
      [listName] : [...this.state[listName], ...sectionList],
    });
  };

//refactor to use redux
  render() {
    // console.log(this.state)
    return (
      <FanioContext.Provider
        value={{
          fandomList: this.state.fandomList,
          reviewList: this.state.reviewList,
          sectionList: this.state.sectionList,
          subList: this.state.subList,
          tagList: this.state.tagList,
          reviewTagList: this.state.reviewTagList,
          installmentList: this.state.installmentList,
          handleSubmitReview: this.handleSubmitReview,
          handleAddFandom: this.handleAddFandom,
          handleSubmitInstallments: this.handleSubmitInstallments,
          handleSubmitSections: this.handleSubmitSections,
        }}
      >

        <NavBar />
        <Route exact path="/users/:userId/profile/" render={(props) => <Profile {...props} />} />
        <Route
          exact
          path={[
            "/users/1/sections/:sectionId/review-form/",
            "/users/1/subs/:subId/review-form/",
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
          render={(props) => <FandomView {...props} />}
        />
        <Route
          exact
          path="/users/:userId/fandoms/:fandomId/installment-view/:installmentId"
          render={(props) => <InstallmentView {...props} />}
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



  //figure out why tags aren't showing up, then 
  //get on with writing reviews and figure ou how you are 
  //going to add a new tag relationship