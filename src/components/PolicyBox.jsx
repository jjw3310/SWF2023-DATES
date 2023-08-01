import React from "react";

import revenue from "../icon/revenue.svg";
export default function PolicyBox({
  cashTitle,
  subsidyTitle,
  agency,
  text,
  expectedReceipt,
  amount,
}) {
  return (
    <div className="policyScroll">
      <div className="policyBox">
        <div className="cashTitle mt-3 ml-3 titleFont">{cashTitle}</div>
        <div className="flex justify-between justify-around mt-3">
          <div className="subsidyTitle">{subsidyTitle}</div>
          <div></div>
          <div className="ml-12 justify-end agency">{agency}</div>
          <div>
            <img src={revenue} alt="revenue" />
          </div>
        </div>
        <hr className="hrcss" />
        <div className="textfield">
          {/* 전년도 연간 부부합산 총 급여액 등에 따른 근로장려금 <br />ㆍ 단독가구
          최대 165만 원 <br />ㆍ 홑벌이 가구 최대 285만 원 <br />ㆍ 맞벌이 가구
          최대 330만 원 지급 */}
          {text}
        </div>
        <div className="flex content-around receiptArea">
          <div className="expectedReceipt">{expectedReceipt}</div>
          <div className="amount">{amount}만원</div>
        </div>
      </div>
    </div>
  );
}
