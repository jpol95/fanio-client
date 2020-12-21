import TokenService from './Services/token-service'
const base_url = `http://localhost:8000/api`;
const FetchService = {
  fetchFandoms: (userId) => {
    console.log(userId)
    return fetch(`${base_url}/fandoms/users/${userId}`).then((res) => res.json());
  },
  fetchInstallments: (fandomId) => {
    return fetch(`${base_url}/installments/parent/${fandomId}`).then((res) =>
      res.json()
    );
  },
  fetchSections: async (installmentId) => {
    const res = await fetch(
      `${base_url}/sections/section/parent/${installmentId}`
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
      const reviewPreJson = await fetch(`${base_url}/reviews/`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(review)})
      const reviewResult = await reviewPreJson.json()
      return reviewResult
  }, 
  patchSection : async (userId, newSection, id, tableName) => {
      const sectionPreJson = await fetch(`${base_url}/sections/${tableName}/${id}`, {method: 'PATCH', headers: {"content-type": "application/json"}, body: JSON.stringify(newSection)})
      const sectionResult = await sectionPreJson.json()
      return sectionResult
  }, 
  fetchReview : async (id) => {
    const reviewPreJson = await fetch(`${base_url}/reviews/${id}`)
    const reviewResult = await reviewPreJson.json()
    return reviewResult
  }, 
  postFandom : async (userId, fandom) => {
     const fandomPreJson = await fetch(`${base_url}/fandoms/users/${userId}`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(fandom)})
     const fandomResult = await fandomPreJson.json()
     return fandomResult
  }, 
  postInstallments : async (installments, fandomId) => {
    const installmentsPreJson = await fetch(`${base_url}/installments/parent/${fandomId}`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(installments)})
    const installmentsResult = await installmentsPreJson.json()
    return installmentsResult
  },
  postSections : async (sections, link) => {
    const sectionsPreJson = await fetch(`${base_url}${link}`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(sections)})
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
    const loggedInUserPreJson = await fetch(`${base_url}/users/loggedIn`, {headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`}})
    const loggedInUserResult = await loggedInUserPreJson.json()
    return loggedInUserResult
  }, //this function is unnuecessary if you decode logged in user on this side
  postUser : async (user) => {
    const userPreJson = await fetch(`${base_url}/users/`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(user)})
    const userResult = await userPreJson.json()
    return userResult
  },  
  deleteSection : async (sectionId) => {
    await fetch(`${base_url}/sections/section/${sectionId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  }, 
  deleteUser: async (userId) => {
    await fetch(`${base_url}/users/user/${userId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  },
  deleteSub : async (subId) => {
    await fetch(`${base_url}/sections/sub/${subId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  }, 
  deleteInstallment : async (installId) => {
    await fetch(`${base_url}/installments/${installId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  }, 
  deleteFandom : async (fandomId) => {
    await fetch(`${base_url}/fandoms/${fandomId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  }, 
  deleteReview : async (reviewId) => {
    await fetch(`${base_url}/reviews/${reviewId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  }, 
  deleteTrelsByReview : async (reviewId) => {
    await fetch(`${base_url}/trels/${reviewId}`, {method: 'DELETE', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}})
  }
}
//is it ok to just get id from newSection object


export default FetchService;
