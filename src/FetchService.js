const base_url = `http://localhost:8000`;
const FetchService = {
  fetchFandoms: () => {
    return fetch(`${base_url}/api/fandoms`).then((res) => res.json());
  },
  fetchInstallments: (fandomId) => {
    return fetch(`${base_url}/api/installments/${fandomId}`).then((res) =>
      res.json()
    );
  },
  fetchSections: async (installmentId) => {
    const res = await fetch(
      `${base_url}/api/sections/section/${installmentId}`
    );
    const sectionList = await res.json();
    const result = { sectionList };
    const promArray = [];
    let subs = []
    for (let section of result.sectionList){
      const preJson = await fetch(
        `${base_url}/api/sections/sub/${installmentId}/${section.id}`
      );
      const ep = await preJson.json()
    //   console.log(ep)
      subs = subs.concat(ep)
    //   console.log(subs)
    }

    // const subs = await Promise.all(promArray);
    // console.log(subs)
    result.subList = subs;
    return result;
  }
}


export default FetchService;
