export function usePolicyData() {
  function requestPolicyData() {
    // DUMMY DATA
    let result = {
      cashTitle: "근로자",
      subsidyTitle: "근로 장려금",
      agency: "국세청",
      text: "ㆍ  참여 대상  총 2400가구(지원 집단 800가구, 비교집단 약 1600가구) ㆍ 지원금액 중위소득 85% 기준액과 가구 소득 간 차액의 50% ",
      expectedReceipt: "예상 수령금액",
      amount: 150,
    };
    let result2 = {
      cashTitle: "현금",
      subsidyTitle: "안심 소득",
      agency: "서울특별시청",
      text: "ㆍ  참여 대상      총 2400가구(지원 집단 800가구, 비교집단 약 1600가구) ㆍ 지원금액      중위소득 85% 기준액과 가구 소득 간 차액의 50%  ",
      expectedReceipt: "예상 수령금액",
      amount: 82,
    };
    let result3 = {
      cashTitle: "청년",
      subsidyTitle: "청년수당",
      agency: "서울특별시청",
      text: "신청대상 : 주민등록상 서울시에 거주하는 고교·대학(원) 졸업자 중 미취업 상태인 청년      연령요건 : 만19~34세(출생일이 1988년 6월 1일 ~ 2004년 6월 30일인 자)      소득요건 : 중위소득 150%이하",
      expectedReceipt: "예상 수령금액",
      amount: 150,
    };
    return { result, result2, result3 };
  }

  return { requestPolicyData };
}
