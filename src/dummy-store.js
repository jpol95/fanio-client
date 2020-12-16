const userList = [
  {
    id: 1,
    user_name: "kingbumii",
    password: "$2y$12$4R1JkopQ4LgjXH27bUAV5OwezOQLoBP6Yv7mbd.Nv7V67yBSmepZq",
    birthday: "08/29/2959",
    education: "Purple University",
    interests: ["skating", "softball", "listending to show tunes", "knitting"],
    city: "Gallifrey",
    fandoms: [
      "Avatar: The Last Airbender",
      "Breaking Bad",
      "Buffy The Vampire Slayer",
      "Doctor Who",
    ],
  },
];

const fandomList = [
  { id: 1, title: "Doctor Who", user: 1 }, //fk
  { id: 2, title: "Supernatural", user: 1 },
  { id: 3, title: "Parks and Recreation", user: 1 },
  { id: 4, title: "Buffy the Vampire Slayer", user: 1 },
  { id: 5, title: "Harry Potter", user: 1 },
];
//when someone wants to add a fandom, have a dropdown menu or have them create a new one
//join fandomList_user table
//you'd have a join table of users to fandoms

const typeList = [
  {
    id: 1,
    title: "show",
    hasSubs: true,
    sectionName: "season",
    subName: "episode",
  },
  {
    id: 2,
    title: "book series",
    hasSubs: false,
    sectionName: "book",
    subName: null,
  },
  {
    id: 3,
    title: "movie series",
    hasSubs: false,
    sectionName: "movie",
    subName: null,
  },
  {
    id: 4,
    title: "comic series",
    hasSubs: true,
    sectionName: "arc",
    subName: "issue",
  },
];

// installment of type show
// How many seasons? 5
// How many episodes in this season?

// book series?
// It'll ask how many books?

// sectionList --> subSectionList

//hasSubs not necessary
//so instead of having separate typeList table, type can be a field attached to installment table

//later on if I want to add the option of comics not having subs
//then i could just have another type that's false, call one
//'comicHS(hasSubs)' and the other 'comicNS(noSubs)'

const installmentList = [
  { id: 1, title: "Doctor Who TV Series", typeId: 1, fandomId: 1 },
  { id: 2, title: "Parks and Rec TV Series", typeId: 1, fandomId: 3 },
  { id: 3, title: "Buffy TV Series", typeId: 1, fandomId: 4 },
  { id: 4, title: "Buffy Comic Series", typeId: 4, fandomId: 4 },
  { id: 5, title: "Supernatural TV Series", typeId: 1, fandomId: 2 },
  { id: 6, title: "Harry Potter Books", typeId: 2, fandomId: 5 },
];


//sectionLists
const bookList = [
  {
    id: 1,
    title: `Harry Potter and the Prisoner of Azkaban`,
    order: 3,
    installmentId: 6,
    reviewId: 21,
  },
  {
    id: 2,
    title: `Harry Potter and the Philosopher's Stone`,
    order: 1,
    installmentId: 6,
    reviewId: 22,
  },
  {
    id: 3,
    title: `Harry Potter and the Chamber of Secrets`,
    order: 2,
    installmentId: 6,
    reviewId: null,
  },
  {
    id: 4,
    title: `Harry Potter and the Case of Jesse's Missing Serotonin`,
    order: 1,
    installmentId: 6,
    reviewId: null,
  },
];

const arcList = [
  { id: 4, title: `Buffy Season 8`, order: 8, installmentId: 4, reviewId: 23 },
];

const issueList = [
  { id: 1, title: `Buffy Season 8 issue 1`, order: 1, reviewId: 24, arcId: 4 },
];

const reviewList = [
  {
    id: 1,
    title: `Doctor Who Season 3 Episode 5 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 4,
  },
  {
    id: 2,
    title: `Doctor Who Season 4 Episode 7 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 1,
  },
  {
    id: 3,
    title: `Supernatural Season 2 Episode 3 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 1,
  },
  {
    id: 4,
    title: `Supernatural Season 3 Episode 4 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 2,
  },
  {
    id: 5,
    title: `Parks and Recreation Season 5 Episode 19 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 3,
  },
  {
    id: 6,
    title: `Parks and Recreation Season 3 Episode 12 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 4,
  },
  {
    id: 7,
    title: `Buffy the Vampire Slayer Season 2 Episode 4 Review`,
    content: `Inca mummy girl???? More like LAME-KA mummy girl amirite haha im depressed please send meds`,
    rating: 5,
  },
  {
    id: 8,
    title: `Buffy the Vampire Slayer Season 5 Episode 9 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 2,
  },
  {
    id: 9,
    title: `Doctor Who Season 2 Episode 9 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 4,
  },
  {
    id: 10,
    title: `Doctor Who Season 1 Episode 2 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 1,
  },
  {
    id: 11,
    title: `Parks and Recreation Season 5 Episode 18 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 2,
  },
  {
    id: 12,
    title: `Parks and Recreation Season 5 Episode 17 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 3,
  },
  {
    id: 13,
    title: `Supernatural Season 2 Episode 7 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 4,
  },
  {
    id: 14,
    title: `Supernatural Season 1 Episode 9 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 5,
  },
  {
    id: 15,
    title: `Buffy the Vampire Slayer Season 1 Episode 7 Review`,
    content: `Omg this is the worst episode ever!`,
    rating: 1,
  },
  {
    id: 16,
    title: `Buffy the Vampire Slayer Season 1 Episode 9 Review`,
    content: `Omg this is the best episode ever!`,
    rating: 2,
  },
  {
    id: 17,
    title: `Buffy the Vampire Slayer Season 5 Review`,
    content: `Omg this is the worst season ever!`,
    rating: 3,
  },
  {
    id: 18,
    title: `Parks and Recreation Season 3 Review`,
    content: `Omg this is the worst season ever!`,
    rating: 3,
  },
  {
    id: 19,
    title: `Supernatural Season 3 Review`,
    content: `Omg this is the worst season ever!`,
    rating: 3,
  },
  {
    id: 20,
    title: `Doctor Who Season 2 Review`,
    content: `Omg this is the worst season ever!`,
    rating: 3,
  },
  {
    id: 21,
    title: `HP1 Review`,
    content: `fuck JK Rowling fuck JK Rowlingfuck JK Rowlingfuck JK Rowlingfuck JK Rowlingfuck JK Rowlingfuck JK Rowling`,
    rating: 3,
  },
  {
    id: 22,
    title: `HP2 Review`,
    content: `fuck JK Rowling fuck JK Rowlingfuck JK Rowling fuck JK Rowlingfuck JK Rowlingfuck JK Rowlingfuck JK Rowlingfuck JK Rowling`,
    rating: 3,
  },
  {
    id: 23,
    title: `Buffy Comics Season 8 Review`,
    content: `This is a cool comic book series!`,
    rating: 3,
  },
  {
    id: 24,
    title: `Buffy Comics Season 8 Issue 1 Review`,
    content: `Look at what I can do! I can create stuff`,
    rating: 3,
  },
];

const seasonList = [
  {
    id: 1,
    title: "Season 2 Doctor Who",
    order: 2,
    reviewId: null,
    installmentId: 1,
  },
  {
    id: 2,
    title: "Season 3 Doctor Who",
    order: 3,
    reviewId: null,
    installmentId: 1,
  },
  {
    id: 3,
    title: "Season 1 Doctor Who",
    order: 1,
    reviewId: null,
    installmentId: 1,
  },
  {
    id: 4,
    title: "Season 4 Doctor Who",
    order: 4,
    reviewId: null,
    installmentId: 1,
  },
  {
    id: 5,
    title: "Season 5 Parks and Recreation",
    order: 5,
    reviewId: null,
    installmentId: 2,
  },
  {
    id: 6,
    title: "Season 1 Buffy",
    order: 1,
    reviewId: null,
    installmentId: 3,
  },
  {
    id: 7,
    title: "Season 2 Buffy",
    order: 2,
    reviewId: null,
    installmentId: 3,
  },
  {
    id: 8,
    title: "Season 1 Supernatural",
    order: 1,
    reviewId: 20,
    installmentId: 5,
  },
  {
    id: 9,
    title: "Season 2 Supernatural",
    order: 2,
    reviewId: 20,
    installmentId: 5,
  },
  {
    id: 10,
    title: "Season 3 Parks and Recreation",
    order: 3,
    reviewId: 18,
    installmentId: 3,
  },
  {
    id: 11,
    title: "Season 3 Supernatural",
    order: 3,
    reviewId: 19,
    installmentId: 5,
  },
  { id: 12, title: "Season 5 Buffy", order: 5, reviewId: 17, installmentId: 3 },
];

//fakerjs creates fake data for you

//database normalization, instead of title: season number
//seeding the data
//fandom -> Season -> Episode
//you could combine different media types into one table

const episodeList = [
  { id: 1, title: "Doctor Who s3e5", order: 5, reviewId: 1, seasonId: 2 },
  { id: 2, title: "Doctor Who s4e7", order: 7, reviewId: 2, seasonId: 4 },
  { id: 3, title: "Supernatural s2e3", order: 3, reviewId: null, seasonId: 9 },
  { id: 4, title: "Supernatural s3e4", order: 4, reviewId: 4, seasonId: 11 },
  { id: 5, title: "PR s5e19", order: 19, reviewId: 5, seasonId: 5 },
  { id: 6, title: "PR s3e12", order: 12, reviewId: 6, seasonId: 10 },
  { id: 7, title: "Buffy s2e4", order: 4, reviewId: 7, seasonId: 7 },
  { id: 8, title: "Buffy s5e9", order: 9, reviewId: null, seasonId: 12 },
  { id: 9, title: "Doctor Who s2e9", order: 9, reviewId: 9, seasonId: 1 },
  { id: 10, title: "Doctor Who s1e2", order: 2, reviewId: 10, seasonId: 3 },
  { id: 11, title: "PR s5e18", order: 18, reviewId: null, seasonId: 5 },
  { id: 12, title: "PR s5e17", order: 17, reviewId: 12, seasonId: 5 },
  { id: 13, title: "Supernatural s2e7", order: 7, reviewId: 13, seasonId: 9 },
  { id: 14, title: "Supernatural s1e9", order: 9, reviewId: 14, seasonId: 8 },
  { id: 15, title: "Buffy s1e7", order: 7, reviewId: 15, seasonId: 6 },
  { id: 16, title: "Buffy s1e9", order: 9, reviewId: null, seasonId: 6 },
];

const tagList = [
  { id: 1, title: "science-fiction" },
  { id: 2, title: "comedy" },
  { id: 3, title: "drama" },
  { id: 4, title: "period" },
  { id: 5, title: "romance" },
  { id: 6, title: "historical-fiction" },
  { id: 7, title: "fantasy" },
  { id: 8, title: "raunchy" },
  { id: 9, title: "family" },
  { id: 10, title: "corny" },
  { id: 11, title: "violent" },
  { id: 12, title: "horror" },
];

const reviewTagList = [
  { tagId: 1, reviewId: 10 },
  { tagId: 2, reviewId: 12 },
  { tagId: 3, reviewId: 17 },
  { tagId: 4, reviewId: 12 },
  { tagId: 5, reviewId: 18 },
  { tagId: 6, reviewId: 12 },
  { tagId: 8, reviewId: 3 },
  { tagId: 9, reviewId: 9 },
  { tagId: 10, reviewId: 10 },
  { tagId: 11, reviewId: 12 },
  { tagId: 12, reviewId: 3 },
];

export default {
  arcList,
  issueList,
  installmentList,
  fandomList,
  reviewList,
  seasonList,
  episodeList,
  tagList,
  reviewTagList,
  bookList,
  typeList,
};
