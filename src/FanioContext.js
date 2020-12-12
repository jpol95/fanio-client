import React from 'react'

const FanioContext = React.createContext({
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
    handleSubmit: () => {}
})

export default FanioContext