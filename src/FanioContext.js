import React from 'react'

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
    setLoggedInUser: () => {}
})

export default FanioContext