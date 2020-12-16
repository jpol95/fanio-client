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
    console.log(sectionList);
    result.sectionList.forEach(async (section) => {
      const preJson = await fetch(
        `${base_url}/api/sections/sub/${installmentId}/${section.id}`
      );
      promArray.push(preJson.json());
    });
    console.log(promArray)
    const subs = await Promise.all(promArray);
    result.subList = subs;
    return result;
  },
};

export default FetchService;
