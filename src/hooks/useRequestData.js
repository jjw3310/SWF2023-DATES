export function useRequestData() {
  // 1. verify
  async function verifyByPhone(_name, _birth, _phonenumber) {
    // DUMMY DATA
    const ci = await "THISISYOURCIDATA";
    return ci;
  }
  // 2. request Data
  function requestData(ci) {
    // DUMMY DATA
    let result = {
      name: "김지우",
      birth: "2000.10.16",
      gender: "M",
      address: "서울특별시 강남구 도산대로89길 17 (청담동)",
      family: {
        parents: {
          father: {
            name: "김종팔",
            birth: "1973.05.21",
            gender: "M",
          },
          mother: {
            name: "이슬기",
            birth: "1978.08.07",
            gender: "W",
          },
        },
        sibling: {
          sister1: {
            name: "김누나",
            birth: "1997.02.06",
            gender: "W",
          },
          sister2: {
            name: "김동생",
            birth: "2003.10.16",
            gender: "W",
          },
        },
      },
      residence: "다세대 주택",
      wage: 0,
      assets: {
        realEstate: { APT: "SEOUL APT" },
        goods: { car: "HYUNDAI" },
      },
      company: "",
      education: "4년제 대학교 재학",
    };
    return result;
  }

  return { verifyByPhone, requestData };
}
