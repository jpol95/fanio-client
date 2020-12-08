import React from 'react'

const FanioContext = React.createContext({
    fandomList: [], 
    reviews: [], 
    seasonList: [], 
    episodeList: [], 
    tags: []
})

export default FanioContext