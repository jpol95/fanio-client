import TokenService from './Services/token-service'
const base_url = `http://localhost:8000/api`;
const FetchService = {
  fetchFandoms: (userId) => {
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
    const result = { sectionList };
    let subs = []
    for (let section of result.sectionList){
      const preJson = await fetch(
        `${base_url}/sections/sub/parent/${section.id}`
      );
      const ep = await preJson.json()
      subs = subs.concat(ep)
    }
    result.subList = subs;
    return result;
  }, 
  fetchUser : async (id) => {
    const userPreJson = await fetch(`${base_url}/users/user/${id}`)
    const userResult = await userPreJson.json()
    return userResult
  }, 
  postReview : async (review) => {
      const reviewPreJson = await fetch(`${base_url}/reviews`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(review)})
      const reviewResult = await reviewPreJson.json()
      return reviewResult
  }, 
  patchReview : async (review) => {
    const reviewPreJson = await fetch(`${base_url}/reviews/${review.id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(review)})
    const reviewResult = await reviewPreJson.json()
    return reviewResult
  },
  patchSection : async (newSection, link) => {
      const sectionPreJson = await fetch(`${base_url}${link}`, {method: 'PATCH', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(newSection)})
      const sectionResult = await sectionPreJson.json()
      return sectionResult
  }, 
  patchInstallment: async (newInstallment) => {
    const installmentPreJson = await fetch(`${base_url}/installments/${newInstallment.id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(newInstallment)})
    const installmentResult = await installmentPreJson.json()
    return installmentResult
}, 
  patchFandom : async (newFandom, id) => {
    const fandomPreJson = await fetch(`${base_url}/fandoms/${id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(newFandom)})
    const fandomResult = await fandomPreJson.json()
    return fandomResult
}, 
patchUser : async (user) => {
  const userPreJson = await fetch(`${base_url}/users/user/${user.id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(user)})
  const userResult = await userPreJson.json()
  return userResult
},  
  fetchReview : async (id) => {
    const reviewPreJson = await fetch(`${base_url}/reviews/${id}`)
    const reviewResult = await reviewPreJson.json()
    return reviewResult
  }, 
  postFandom : async (fandom) => {
     const fandomPreJson = await fetch(`${base_url}/fandoms/users/${fandom.userId}`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(fandom)})
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
    const trelsPreJson = await fetch(`${base_url}/trels/${trels[0].reviewId}`, {method: 'POST', headers: {'Authorization': `bearer ${TokenService.getAuthToken()}`, "content-type": "application/json"}, body: JSON.stringify(trels)})
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
  }, 
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


export default FetchService;
