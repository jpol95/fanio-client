import "./App.css";
import React from "react";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import CreateReview from "./CreateReview/CreateReview";
import EditReview from "./EditReview/EditReview";
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
import TokenService from "./Services/token-service";
import EditFandom from "./EditFandom/EditFandom";
import EditSection from './EditSection/EditSection'
import EditInstallment from './EditInstallment/EditInstallment'
import EditPersonal from './EditPersonal/EditPersonal'

class App extends React.Component {
  state = {
    currentLoadedUser: 0,
    loggedInUser: { loaded: false, userId: 0 },
    fandomList: [],
    reviewList: [],
    sectionList: [],
    subList: [],
    tagList: [],
    reviewTagList: [],
    installmentList: [],
  };

 

  componentDidMount() {
    this.setLoggedInUser();
  }

  setLoggedInUser = () => {
    const jwt = TokenService.getAuthToken();
    let userId;
    if (!!jwt) {
      userId = JSON.parse(window.atob(jwt.split(".")[1])).user_id;
    } else {
      userId = 0;
    }
    this.setState({
      loggedInUser: { loaded: true, userId },
    });
  };

  

  handleDeleteSub = (subId) => {
    const newSubList = this.state.subList.filter((sub) => sub.id !== subId);
    this.setState({
      subList: newSubList,
    });
  };
  handleDeleteSection = (sectionId) => {
    const newSectionList = this.state.sectionList.filter(
      (section) => section.id !== sectionId
    );
    this.setState({
      sectionList: newSectionList,
    });
  };
  handleDeleteReview = (reviewId, tableName) => {
    const newReviewList = this.state.reviewList.filter((review) => {
      return reviewId !== review.id;
    });
    const newSectionList = this.state[tableName].map((section) => {
      if (section.reviewId === reviewId) {
        section.reviewId = null;
      }
      return section
    });

    this.setState({
      reviewList: newReviewList,
      [tableName]: newSectionList,
    });
  };
  handleDeleteInstallment = (installmentId) => {
    const newInstallmentList = this.state.installmentList.filter(
      (installment) => installment.id !== installmentId
    );
    this.setState({
      installmentList: newInstallmentList,
    });
  };
  handleDeleteFandom = (fandomId) => {
    const newFandomList = this.state.fandomList.filter(
      (fandom) => fandom.id !== fandomId
    );
    this.setState({
      fandomList: newFandomList,
    });
  };

  handleDeleteReview = (reviewId) => {
    const newReviewList = this.state.reviewList.filter((review) => {
      return review.id !== reviewId;
    });
    const newSubList = this.state.subList.map((sub) => {
      if (sub.reviewId === reviewId) {
        sub.reviewId = null;
      }
      return sub;
    });

    const newSectionList = this.state.sectionList.map((section) => {
      if (section.reviewId === reviewId) {
        section.reviewId = null;
      }
      return section;
    });

    this.setState({
      sectionList: newSectionList,
      subList: newSubList,
      reviewList: newReviewList,
    });
  };

  handleEditSection = (editedSection, tableName) => {
    const sectionListCopy = this.state[tableName].map(section => {
      if(section.id === editedSection.id) section = editedSection
      return section
    })
    this.setState({
      [tableName]: sectionListCopy
    })
  };

  handleEditReview = (newReview, trelList) => {
    const newReviewList = this.state.reviewList.map((review) => {
      if (review.id === newReview.id) review = newReview;
      return review;
    });
    let newTrelList = this.state.reviewTagList.filter((trel) => {
      return trel.reviewId !== newReview.id;
    });
    newTrelList = [...newTrelList, ...trelList];
    this.setState({
      reviewList: newReviewList,
      reviewTagList: newTrelList,
    });
  };
  handleEditInstallment = (editedInstallment) => {
    const installmentListCopy = this.state.installmentList.map(installment => {
      if (installment.id === editedInstallment.id) installment = editedInstallment 
      return installment
    })

    this.setState({
      installmentList: installmentListCopy
    })
  };
  handleEditFandom = (editedFandom) => {
    const newFandomList = this.state.fandomList.map((fandom) => {
      if (editedFandom.id === fandom.id) fandom = editedFandom;
      return fandom;
    });
    this.setState({
      fandomList: newFandomList,
    });
  };

  handleEditPersonal = (editedPersonal) => {
    this.setState({
      currentLoadedUser: editedPersonal
    })
  }

  handleSubmitReview = async (newReview, trelList, tableName, parentId) => {
    const section = this.state[`${tableName}List`].find(
      (section) => section.id === Number(parentId)
    );
    const newSection = { ...section, reviewId: newReview.id };
    const link = `/sections/${tableName}/${newSection.id}`
    const updatedSection = await FetchService.patchSection(
      newSection,
      link
    );
    await FetchService.postTrels(trelList);
    this.patchSection(updatedSection, `${tableName}List`);
    this.setState({
      ...this.state,
      reviewList: [...this.state.reviewList, newReview],
      reviewTagList: [...this.state.reviewTagList, ...trelList],
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

  handleEditPersonal

  loadData = async (userId) => {
    const user = await FetchService.fetchUser(userId)
    const stateChange = new Promise((resolve, reject) =>
      resolve(
        this.setState({
          currentLoadedUser: user,
        })
      )
    );
    stateChange.then(async () => {
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
    });
  };

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

  render() {
    if (!this.state.loggedInUser.loaded) return null;
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
          currentLoadedUser: this.state.currentLoadedUser,
          handleSubmitReview: this.handleSubmitReview,
          handleAddFandom: this.handleAddFandom,
          handleSubmitInstallments: this.handleSubmitInstallments,
          handleSubmitSections: this.handleSubmitSections,
          setLoggedInUser: this.setLoggedInUser,
          handleDeleteSub: this.handleDeleteSub,
          handleDeleteSection: this.handleDeleteSection,
          handleDeleteReview: this.handleDeleteReview,
          handleDeleteInstallment: this.handleDeleteInstallment,
          handleEditPersonal: this.handleEditPersonal, 
          handleDeleteFandom: this.handleDeleteFandom,
          handleEditSection: this.handleEditSection,
          handleEditReview: this.handleEditReview,
          handleEditInstallment: this.handleEditInstallment,
          handleEditFandom: this.handleEditFandom,
        }}
      >
        <NavBar />
        <main>
        <Route
          path="/users/:userId"
          render={(props) => (
            <CheckUser
              {...props}
              currentLoadedUser={this.state.currentLoadedUser.id}
              loadData={this.loadData}
            >
              <Route
                exact
                path="/users/:userId/profile/"
                render={(props) => <Profile {...props} />}
              />
              <Route
                exact
                path={[
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/review/:reviewId/",
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/subs/:subId/review/:reviewId",
                ]}
                component={ReviewMain}
              />
              <Route
                exact
                path={[
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/edit-section",
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/subs/:subId/edit-sub",
                ]}
                component={EditSection}
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
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/reviews/create-review",
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/subs/:subId/reviews/create-review",
                ]}
                component={CreateReview}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path={[
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/reviews/:reviewId/edit-review",
                  "/users/:userId/fandoms/:fandomId/installments/:installmentId/sections/:sectionId/subs/:subId/reviews/:reviewId/edit-review",
                ]}
                component={EditReview}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path="/users/:userId/create-fandom"
                component={CreateFandom}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path="/users/:userId/edit-user"
                component={EditPersonal}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path="/users/:userId/fandoms/:fandomId/edit-fandom"
                component={EditFandom}
              />
              <PrivateOnlyRoute
                exact
                loggedInUser={this.state.loggedInUser.userId}
                path="/users/:userId/fandoms/:fandomId/installments/:installmentId/edit-installment"
                component={EditInstallment}
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
        <PublicRoute
          exact
          path="/"
          loggedInUser={this.state.loggedInUser.userId}
          component={Landing}
        />
        <PublicRoute
          exact
          path="/signup"
          loggedInUser={this.state.loggedInUser.userId}
          component={SignUp}
        />
        <PublicRoute
          exact
          path="/login"
          loggedInUser={this.state.loggedInUser.userId}
          component={LoginPage}
        />
        <Route exact path="/landing" component={Landing} />
        </main>
        <Footer />
      </FanioContext.Provider>
    );
  }
}

export default App;

