import TokenService from './Services/token-service'
const base_url = `http://localhost:8000/api`;
const FetchService = {
  fetchFandoms: (userId) => {
    console.log(userId)
    return fetch(`${base_url}/fandoms/users/${userId}`).then((res) => res.json());
  },
  fetchInstallments: (fandomId) => {
    return fetch(`${base_url}/installments/${fandomId}`).then((res) =>
      res.json()
    );
  },
  fetchSections: async (installmentId) => {
    const res = await fetch(
      `${base_url}/sections/section/${installmentId}`
    );
    const sectionList = await res.json();
    // console.log(sectionList)
    const result = { sectionList };
    let subs = []
    for (let section of result.sectionList){
      const preJson = await fetch(
        `${base_url}/sections/sub/${section.id}`
      );
      const ep = await preJson.json()
      subs = subs.concat(ep)
    }
    result.subList = subs;
    return result;
  }, 
  //test to see why the above didnt work with the for each loop
  postReview : async (userId, review) => {
      // console.log(review)
      const reviewPreJson = await fetch(`${base_url}/reviews/users/${userId}`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(review)})
      const reviewResult = await reviewPreJson.json()
      return reviewResult
  }, 
  patchSection : async (userId, newSection, id, tableName) => {
      const sectionPreJson = await fetch(`${base_url}/sections/users/${userId}/${tableName}/${id}`, {method: 'PATCH', headers: {"content-type": "application/json"}, body: JSON.stringify(newSection)})
      const sectionResult = await sectionPreJson.json()
      return sectionResult
  }, 
  fetchReview : async (id) => {
    const reviewPreJson = await fetch(`${base_url}/reviews/${id}`)
    const reviewResult = await reviewPreJson.json()
    return reviewResult
  }, 
  postFandom : async (userId, fandom) => {
     const fandomPreJson = await fetch(`${base_url}/fandoms/users/${userId}`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(fandom)})
     const fandomResult = await fandomPreJson.json()
     return fandomResult
  }, 
  postInstallments : async (userId, installments, fandomId) => {
    const installmentsPreJson = await fetch(`${base_url}/installments/users/${userId}/${fandomId}`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(installments)})
    const installmentsResult = await installmentsPreJson.json()
    return installmentsResult
  },
  postSections : async (userId, sections, link) => {
    const sectionsPreJson = await fetch(`${base_url}users/${userId}${link}`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(sections)})
    const sectionsResult = await sectionsPreJson.json()
    return sectionsResult
  }, 
  fetchTags : async () => {
    const tagsPreJson = await fetch(`${base_url}/tags`)
    const tagsResult = await tagsPreJson.json()
    return tagsResult
  }, 
  postTrels : async (trels) => {
    const trelsPreJson = await fetch(`${base_url}/trels`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(trels)})
    const trelsResult = await trelsPreJson.json()
    return trelsResult
  }, 
  fetchTrels : async () => {
    const trelsPreJson = await fetch(`${base_url}/trels`)
    const trelsResult = await trelsPreJson.json()
    return trelsResult
  }, 
  fetchLoggedInUser : async () => {
    const loggedInUserPreJson = await fetch(`${base_url}/users/loggedIn`, {headers: {'authorization': `bearer ${TokenService.getAuthToken()}`}})
    const loggedInUserResult = await loggedInUserPreJson.json()
    return loggedInUserResult
  }, 
  postUser : async (user) => {
    const userPreJson = await fetch(`${base_url}/users/`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(user)})
    const userResult = await userPreJson.json()
    return userResult
  }, 
  deleteUser : async (userId) => {
    await fetch(`${base_url}/users/${userId}`, {method: 'DELETE', headers: {"content-type": "application/json"}})
  }, 
  deleteSection : async (userId, link) => {
    await fetch(`${base_url}users/${userId}${link}`, {method: 'DELETE', headers: {"content-type": "application/json"}})
  }, 
  deleteInstallment : async (installId) => {
    await fetch(`${base_url}/installments/users/${userId}/${installId}`, {method: 'DELETE', headers: {"content-type": "application/json"}})
  }, 
  deleteFandom : async (fandomId) => {
    await fetch(`${base_url}/fandoms/users/${userId}/${fandomId}`, {method: 'DELETE', headers: {"content-type": "application/json"}})
  }, 
  deleteReview : async (reviewId) => {
    await fetch(`${base_url}/reviews/users/${userId}/${reviewId}`, {method: 'DELETE', headers: {"content-type": "application/json"}})
  }, 
  deleteTrelsByReview : async (reviewId) => {
    await fetch(`${base_url}/trels/users/${userId}/${reviewId}`, {method: 'DELETE', headers: {"content-type": "application/json"}})
  }
}
//is it ok to just get id from newSection object


export default FetchService;
