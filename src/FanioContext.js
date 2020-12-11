import React from 'react'

const FanioContext = React.createContext({
    fandomList: [], 
    reviewList: [], 
    seasonList: [], 
    episodeList: [], 
    tagList: [], 
    reviewTagList: [], 
    handleSubmit: () => {}
})

export default FanioContext