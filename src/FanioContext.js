import React from 'react'

const FanioContext = React.createContext({
    fandomList: [],
    reviewList: [],
    sectionList: [], 
    subList: [],
    tagList: [],
    reviewTagList: [],
    installmentList: [],
    handleSubmitReview: () => {}, 
    handleAddFandom: () => {}, 
    handleSubmitInstallments: () => {}
})

export default FanioContext