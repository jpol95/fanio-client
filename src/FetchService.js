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
    console.log(sectionList)
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
  //make sure to fetch the reviews when you fetch the sections/subsections
  postReview : async (review) => {
      const reviewPreJson = await fetch(`${base_url}/reviews`, {headers: {method: 'POST', "Content-Type": "appication/json/", body: review}})
      const reviewResult = await reviewPreJson.json()
      return reviewResult
  }, 
  patchSection : async (newSection, id, tableName) => {
      const sectionPreJson = await fetch(`${base_url}/sections/${tableName}/${id}`, {headers: {method: 'PATCH', "Content-Type": "appication/json/", body: newSection}})
      const sectionResult = await sectionPreJson.json()
      return sectionResult
  }, 
  fetchReview : async (id) => {
    const reviewPreJson = await fetch(`${base_url}/reviews/${id}`)
    const reviewResult = await reviewPreJson.json()
    return reviewResult
  }
}
//is it ok to just get id from newSection object


export default FetchService;
