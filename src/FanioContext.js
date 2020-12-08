import React from 'react'

const FanioContext = React.createContext({
    fandomList: [], 
    reviewList: [], 
    seasonList: [], 
    episodeList: [], 
    tagList: []
})

export default FanioContext