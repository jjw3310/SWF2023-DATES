export function useRequestData() {
  // 1. verify
  async function verifyByPhone(_name, _birth, _phonenumber) {
    // DUMMY DATA
    const ci = await "THIS IS YOUR CI DATA";
    return ci;
  }
  // 2. request Data
  function requestData(ci) {
    // DUMMY DATA
    let result = { name: "김철수", age: 26, wage: 60000000 };
    return result;
  }

  return { verifyByPhone, requestData };
}
