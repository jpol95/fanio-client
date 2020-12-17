const base_url = `http://localhost:8000/api`;
const FetchService = {
  fetchFandoms: () => {
    return fetch(`${base_url}/api/fandoms`).then((res) => res.json());
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
    const result = { sectionList };
    const promArray = [];
    let subs = []
    for (let section of result.sectionList){
      const preJson = await fetch(
        `${base_url}/sections/sub/${installmentId}/${section.id}`
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
      const reviewResult = await reviewPreJson
      return reviewResult
  }, 
  patchSection : async (review) => {
      
  }
}


export default FetchService;
