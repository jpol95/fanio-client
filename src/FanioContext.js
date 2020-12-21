import React from "react";

const FanioContext = React.createContext({
  loggedInUser: 0,
  fandomList: [],
  reviewList: [],
  sectionList: [],
  subList: [],
  tagList: [],
  reviewTagList: [],
  installmentList: [],
  handleSubmitReview: () => {},
  handleAddFandom: () => {},
  handleSubmitInstallments: () => {},
  setLoggedInUser: () => {},
  handleDeleteSub: () => {},
  handleDeleteSection: () => {},
  handleDeleteReview: () => {},
  handleDeleteInstallment: () => {},
  handleDeleteFandom: () => {},
  handleUpdateSub: () => {},
  handleUpdateSection: () => {},
  handleUpdateReview: () => {},
  handleUpdateInstallment: () => {},
  handleUpdateFandom: () => {},
});

export default FanioContext;
