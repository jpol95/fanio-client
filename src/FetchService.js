const base_url = `http://localhost:8000/api`;
const FetchService = {
  fetchFandoms: () => {
    return fetch(`${base_url}/fandoms`).then((res) => res.json());
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
  postReview : async (review) => {
      const reviewPreJson = await fetch(`${base_url}/reviews`, {method: 'POST', headers: {"Content-Type": "appication/json"}, body: review})
      const reviewResult = await reviewPreJson.json()
      return reviewResult
  }, 
  patchSection : async (newSection, id, tableName) => {
      const sectionPreJson = await fetch(`${base_url}/sections/${tableName}/${id}`, {method: 'PATCH', headers: {"Content-Type": "appication/json"}, body: newSection})
      const sectionResult = await sectionPreJson.json()
      return sectionResult
  }, 
  fetchReview : async (id) => {
    const reviewPreJson = await fetch(`${base_url}/reviews/${id}`)
    const reviewResult = await reviewPreJson.json()
    return reviewResult
  }, 
  postFandom : async (fandom) => {
     const fandomPreJson = await fetch(`${base_url}/fandoms`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(fandom)})
     const fandomResult = await fandomPreJson.json()
     return fandomResult
  }, 
  postInstallments : async (installments, fandomId) => {
    const installmentsPreJson = await fetch(`${base_url}/installments/${fandomId}`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(installments)})
    const installmentsResult = await installmentsPreJson.json()
    return installmentsResult
  },
  postSections : async (sections, link) => {
    const sectionsPreJson = await fetch(`${base_url}${link}`, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(sections)})
    const sectionsResult = await sectionsPreJson.json()
    return sectionsResult
  }
}
//is it ok to just get id from newSection object


export default FetchService;
