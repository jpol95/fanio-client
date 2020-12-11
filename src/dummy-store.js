
const fandomList =  [
    {id: 1, name: 'Doctor Who', user: 1}, //fk
    {id: 2, name: 'Supernatural', user: 1}, 
    {id: 3, name: 'Parks and Recreation', user: 1}, 
    {id: 4, name: 'Buffy the Vampire Slayer', user: 1}, 
]
//when someone wants to add a fandom, have a dropdown menu or have them create a new one
//join fandomList_user table
//you'd have a join table of users to fandoms 

const installmentList = [
    {id: 1, title:'Doctor Who', type: 'Show', fandomId: 1},
    {id: 2, title:'Parks and Rec', type: 'Show', fandomId: 3},
    {id: 3, title:'Buffy', type: 'Show', fandomId: 4},
    {id: 4, title:'Buffy comics', type: 'Comics', fandomId: 4},
    {id: 5, title:'Supernatural', type: 'Show', fandomId: 2},
    
]



const reviewList = [
    {id: 1, title: `Doctor Who Season 3 Episode 5 Review`, content: `Omg this is the best episode ever!`,  rating: 4},
    {id: 2, title: `Doctor Who Season 4 Episode 7 Review`, content: `Omg this is the worst episode ever!`, rating: 1},
    {id: 3, title: `Supernatural Season 2 Episode 3 Review`, content: `Omg this is the worst episode ever!`, rating: 1},
    {id: 4, title: `Supernatural Season 3 Episode 4 Review`, content: `Omg this is the best episode ever!`, rating: 2},
    {id: 5, title: `Parks and Recreation Season 5 Episode 19 Review`, content: `Omg this is the worst episode ever!`, rating: 3},
    {id: 6, title: `Parks and Recreation Season 3 Episode 12 Review`, content: `Omg this is the best episode ever!`, rating: 4},
    {id: 7, title: `Buffy the Vampire Slayer Season 2 Episode 4 Review`, content: `Inca mummy girl???? More like LAME-KA mummy girl amirite haha im depressed please send meds`, rating: 5},
    {id: 8, title: `Buffy the Vampire Slayer Season 5 Episode 9 Review`, content: `Omg this is the best episode ever!`, rating: 2},
    {id: 9, title: `Doctor Who Season 2 Episode 9 Review`, content: `Omg this is the worst episode ever!`, rating: 4},
    {id: 10, title: `Doctor Who Season 1 Episode 2 Review`, content: `Omg this is the best episode ever!`, rating: 1},
    {id: 11, title: `Parks and Recreation Season 5 Episode 18 Review`, content: `Omg this is the worst episode ever!`, rating: 2},
    {id: 12, title: `Parks and Recreation Season 5 Episode 17 Review`, content: `Omg this is the best episode ever!`, rating: 3},
    {id: 13, title: `Supernatural Season 2 Episode 7 Review`, content: `Omg this is the worst episode ever!`, rating: 4},
    {id: 14, title: `Supernatural Season 1 Episode 9 Review`, content: `Omg this is the best episode ever!`, rating: 5},
    {id: 15, title: `Buffy the Vampire Slayer Season 1 Episode 7 Review`, content: `Omg this is the worst episode ever!`, rating: 1},
    {id: 16, title: `Buffy the Vampire Slayer Season 1 Episode 9 Review`, content: `Omg this is the best episode ever!`, rating: 2},
    {id: 17, title: `Buffy the Vampire Slayer Season 5 Review`, content: `Omg this is the worst season ever!`, rating: 3},
    {id: 18, title: `Parks and Recreation Season 3 Review`, content: `Omg this is the worst season ever!`, rating: 3}, 
    {id: 19, title: `Supernatural Season 3 Review`, content: `Omg this is the worst season ever!`, rating: 3},  
    {id: 20, title: `Doctor Who Season 2 Review`, content: `Omg this is the worst season ever!`, rating: 3}, 
]

const seasonList = [
    {id: 1, name: 'Season 1 Doctor Who', reviewId: null, fandomId: 1}, 
    {id: 2, name: 'Season 2 Doctor Who', reviewId: null, fandomId: 1}, 
    {id: 3, name: 'Season 3 Doctor Who', reviewId: null, fandomId: 1}, 
    {id: 4, name: 'Season 4 Doctor Who', reviewId: null, fandomId: 1}, 
    {id: 5, name: 'Season 5 Parks and Recreation', reviewId: null, fandomId: 3}, 
    {id: 6, name: 'Season 1 Buffy', reviewId: null, fandomId: 4}, 
    {id: 7, name: 'Season 2 Buffy', reviewId: null, fandomId: 4}, 
    {id: 8, name: 'Season 1 Supernatural', reviewId: 20, fandomId: 2}, 
    {id: 9, name: 'Season 2 Supernatural', reviewId: 20, fandomId: 2}, 
    {id: 10, name: 'Season 3 Parks and Recreation', reviewId: 18, fandomId: 3}, 
    {id: 11, name: 'Season 3 Supernatural', reviewId: 19, fandomId: 2}, 
    {id: 12, name: 'Season 5 Buffy', reviewId: 17, fandomId: 4},  
]

//fakerjs creates fake data for you

//database normalization, instead of name: season number
//seeding the data
//fandom -> Season -> Episode
//you could combine different media types into one table



const episodeList = [
    {id: 1, name: "Doctor Who s3e5", reviewId: 1, seasonId: 3},
    {id: 2, name: "Doctor Who s4e7", reviewId: 2, seasonId: 4},
    {id: 3, name: "Supernatural s2e3", reviewId: null, seasonId: 9},
    {id: 4, name: "Supernatural s3e4", reviewId: 4, seasonId: 11},
    {id: 5, name: "PR s5e19", reviewId: 5, seasonId: 5},
    {id: 6, name: "PR s3e12", reviewId: 6, seasonId: 10},
    {id: 7, name: "Buffy s2e4", reviewId: 7, seasonId: 7},
    {id: 8, name: "Buffy s5e9", reviewId: null, seasonId: 12},
    {id: 9, name: "Doctor Wo s2e9", reviewId: 9, seasonId: 2},
    {id: 10, name: "Doctor Who s1e2", reviewId: 10, seasonId: 1},
    {id: 11, name: "PR s5e18", reviewId: null, seasonId: 5},
    {id: 12, name: "PR s5e17", reviewId: 12, seasonId: 5},
    {id: 13, name: "Supernatural s2e7", reviewId: 13, seasonId: 9},
    {id: 14, name: "Supernatural s1e9", reviewId: 14, seasonId: 8},
    {id: 15, name: "Buffy s1e7", reviewId: 15, seasonId: 6},
    {id: 16, name: "Buffy s1e9", reviewId: null, seasonId: 6},
]



const tagList = [
    {id: 1, name: "science-fiction"}, 
    {id: 2, name: "comedy"}, 
    {id: 3, name: "drama"}, 
    {id: 4, name: "period"}, 
    {id: 5, name: "romance"}, 
    {id: 6, name: "historical-fiction"}, 
    {id: 7, name: "fantasy"}, 
    {id: 8, name: "raunchy"}, 
    {id: 9, name: "family"}, 
    {id: 10, name: "corny"}, 
    {id: 11, name: "violent"}, 
    {id: 12, name: "horror"}, 
]

const reviewTagList = [
    {tagId: 1, reviewId: 10}, 
    {tagId: 2, reviewId: 12}, 
    {tagId: 3, reviewId: 17}, 
    {tagId: 4, reviewId: 12}, 
    {tagId: 5, reviewId: 18}, 
    {tagId: 6, reviewId: 12}, 
    {tagId: 8, reviewId: 3}, 
    {tagId: 9, reviewId: 9}, 
    {tagId: 10, reviewId: 10}, 
    {tagId: 11, reviewId: 12}, 
    {tagId: 12, reviewId: 3},    
]

export default {installmentList, fandomList, reviewList, seasonList, episodeList, tagList, reviewTagList}
