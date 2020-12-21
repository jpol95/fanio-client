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
import LoginPage from "./LoginPage/LoginPage";
import FetchService from "./FetchService";
import SignUp from "./SignUp/SignUp";
import Landing from "./Landing/Landing";
import FanioContext from "./FanioContext";
import { Route } from "react-router-dom";
import PrivateOnlyRoute from "./Utils/PrivateOnlyRoute";
import PublicRoute from "./Utils/PublicRoute";
import CheckUser from "./Utils/CheckUser";

class App extends React.Component {
  state = {
    currentLoadedUser: 0,
    loggedInUser: {loaded: false, userId: true},
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

  componentDidMount(){
    this.setLoggedInUser()
  }

  setLoggedInUser = () =>   {
    FetchService.fetchLoggedInUser()
    .then(res => {
      this.setState({
        loggedInUser: {loaded:true, userId: res.userId}
      })
    })
  }



  handleDeleteSub = (subId) => {
    const newSubList = this.state.subList.filter(sub => sub.id !== subId)
    this.setState({
      subList: newSubList
    })
    }
  handleDeleteSection = (sectionId) => {
    const newSectionList = this.state.sectionList.filter(section => section.id !== sectionId)
    // const newSubList = this.state.subList.filter(sub => sub.sectionId !== sectionId)
    this.setState({
      sectionList:  newSectionList, 
      // subList: newSubList
    })
  }
  handleDeleteReview = () => {

  }
  handleDeleteInstallment = (installmentId) => {
    // this.state.sectionList.forEach(section => {
    //   if (installmentId === section.installmentId){
    //     this.handleDeleteSection(section.id)
    //   }
    // })
    const newInstallmentList = this.state.installmentList
    .filter(installment => installment.id !== installmentId)
    this.setState({
      installmentList: newInstallmentList
    })
  }
  handleDeleteFandom = (fandomId) => {
    // this.state.installmentList.forEach(installment => {
    //   if (installment.fandomId === fandomId) this.handleDeleteInstallment(installment.id)
    // })
    const newFandomList = this.state.fandomList.filter(fandom => fandom.id !== fandomId)
    this.setState({
      fandomList: newFandomList
    })
  }

  handleDeleteUser = (userId) => {
    //code later, maybe reset state, maybe you don't have to
  }

  handleUpdateSub = () => {

  }
  handleUpdateSection = () => {

  }
  handleUpdateReview = () => {

  }
  handleUpdateInstallment = () => {

  }
  handleUpdateFandom = () => {

  }

  handleSubmitReview = async (newReview, tags, tableName, parentId) => {
    let newTagListItems = tags.map((tag) => {
      return { tagId: Number(tag), reviewId: newReview.id };
    });
    newTagListItems = await FetchService.postTrels(newTagListItems);
    const section = this.state[`${tableName}List`].find(
      (section) => section.id === Number(parentId)
    );
    const newSection = { ...section, reviewId: newReview.id };
    const updatedSection = await FetchService.patchSection(
      newSection,
      newSection.id,
      tableName
    );
    this.patchSection(updatedSection, `${tableName}List`);
    this.setState({
      ...this.state,
      reviewList: [...this.state.reviewList, newReview],
      reviewTagList: [...this.state.reviewTagList, ...newTagListItems],
    });
  };

  patchSection = (newSection, tableName) => {
    const sectionListCopy = [...this.state[tableName]];
    sectionListCopy.forEach((section, index, sectionList) => {
      if (section.id === newSection.id) sectionList[index] = newSection;
    });
    this.setState({
      ...this.state,
      [tableName]: sectionListCopy,
    });
  };


  loadData = async (userId) => {
    const stateChange = new Promise((resolve, reject) => 
    resolve(this.setState({
      currentLoadedUser: userId,
      testing: "blahlabefkjewnjk"
    })));
    stateChange.then( async () => {
      console.log(this.state)
    const fandoms = await this.fetchFandoms(userId);
    fandoms.forEach(async (fandom) => {
      const installments = await this.fetchInstallments(fandom.id);
      installments.forEach(async (installment) => {
        const sectionArr = await this.fetchSections(installment.id);
        this.loadReviews(sectionArr);
      });
    });
    this.fetchTags();
    this.fetchTrels();
  })};

  loadReviews = (sectionArr) => {
    const promArray = [];
    sectionArr.sectionList.forEach((section) => {
      if (section.reviewId)
        promArray.push(FetchService.fetchReview(section.reviewId));
    });
    sectionArr.subList.forEach((sub) => {
      if (sub.reviewId) promArray.push(FetchService.fetchReview(sub.reviewId));
    });
    Promise.all(promArray).then((reviews) => {
      this.setState({
        ...this.state,
        reviewList: [...this.state.reviewList, ...reviews],
      });
    });
  };

  fetchTags = async () => {
    const tagList = await FetchService.fetchTags();
    this.setState({ ...this.state, tagList });
  };

  fetchTrels = async () => {
    const reviewTagList = await FetchService.fetchTrels();
    this.setState({ ...this.state, reviewTagList });
  };

  fetchFandoms = async (userId) => {
    const fandomList = await FetchService.fetchFandoms(userId);
    this.setState({
      ...this.state,
      fandomList: [...this.state.fandomList, ...fandomList],
    });
    return fandomList;
  };
  fetchInstallments = async (fandomId) => {
    const installmentList = await FetchService.fetchInstallments(fandomId);
    this.setState({
      ...this.state,
      installmentList: [...this.state.installmentList, ...installmentList],
    });
    return installmentList;
  };

  fetchSections = async (installmentId) => {
    const sectionArr = await FetchService.fetchSections(installmentId);
    this.setState({
      ...this.state,
      [`sectionList`]: [...this.state.sectionList, ...sectionArr.sectionList],
      [`subList`]: [...this.state.subList, ...sectionArr.subList],
    });
    return sectionArr;
  };

  //maybe have a fetch service for these functions?

  postReview = (review) => {
    this.setState({
      ...this.state,
      reviewList: [...this.state.reviewList, review],
    });
  };

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
      [listName]: [...this.state[listName], ...sectionList],
    });
  };

  //refactor to use redux
  render() {
    if (!this.state.loggedInUser.loaded) return null
    console.log("rerender")
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
          loggedInUser: this.state.loggedInUser.userId,
          handleSubmitReview: this.handleSubmitReview,
          handleAddFandom: this.handleAddFandom,
          handleSubmitInstallments: this.handleSubmitInstallments,
          handleSubmitSections: this.handleSubmitSections,
          setLoggedInUser: this.setLoggedInUser, 
          handleDeleteSub: this.handleDeleteSub, 
          handleDeleteSection: this.handleDeleteSection, 
          handleDeleteReview: this.handleDeleteReview, 
          handleDeleteInstallment: this.handleDeleteInstallment, 
          handleDeleteFandom: this.handleDeleteFandom, 
          handleUpdateSub: this.handleUpdateSub, 
          handleUpdateSection: this.handleUpdateSection, 
          handleUpdateReview: this.handleUpdateReview, 
          handleUpdateInstallment: this.handleUpdateInstallment, 
          handleUpdateFandom: this.handleUpdateFandom, 
          handleDeleteUser: this.handleDeleteUser
          
        }}
      >
        <NavBar />
        <Route
          path="/users/:userId"
          render={(props) => (
            <CheckUser
              {...props}
              currentLoadedUser={this.state.currentLoadedUser}
              loadData={this.loadData}
            >
              <Route
                exact
                path="/users/:userId/profile/"
                render={(props) => <Profile {...props} />}
              />
              <Route
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

              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path={[
                  "/users/:userId/sections/:sectionId/review-form/",
                  "/users/:userId/subs/:subId/review-form/",
                ]}
                component={CreateReview}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path="/users/:userId/fandom-form"
                component={CreateFandom}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path="/users/:userId/fandoms/:fandomId/add-installments-form"
                component={CreateInstallments}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path={[
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/add-sections-form",
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/add-subs-form",
                ]}
                component={CreateSections}
              />
            </CheckUser>
          )}
        />
        <PublicRoute exact path="/" loggedInUser={this.state.loggedInUser.userId} component={Landing}/>
        <PublicRoute exact path="/signup" loggedInUser={this.state.loggedInUser.userId} component={SignUp} />
        <PublicRoute exact path="/login" loggedInUser={this.state.loggedInUser.userId} component={LoginPage} />
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
