import React from "react";
import alarm from "../icon/Alarm.svg";
import profileicon from "../icon/profileicon.svg";
import checkbox from "../icon/searchboxccheck.svg";
import searchBoxLicense from "../icon/searchBoxLicense.svg";
import searchBoxGetInfo from "../icon/searchBoxGetInfo.svg";
import searchIcon from "../icon/searchIcon.svg";
import revenue from "../icon/revenue.svg";
export default function search() {
  return (
    <div className=" myseoulheader   bg-[#e2e8f0]">
      <div className=" seoulmyfont hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        안심복지
      </div>
      <div className="alarmicon cursor-pointer">
        <img src={alarm} alt="alarm icon "></img>
      </div>
      <div className="searchMyCard">
        <div className="h-1/2 flex searchInfoBox">
          <div>
            <img src={profileicon} alt="profileicon" />
          </div>
          <div>
            <div className="searchInfoName">이지우님</div>
            <div className="searchMyInfo">2000.10.16 / 만 22세 </div>
          </div>
        </div>
        <div className="h-1/2">
          <div className="flex searchBoxIcons">
            <div className="commonSearchBoxIcon">
              <img src={checkbox} alt="checkbox" />
              <div className="searchIconTitle">신원 정보</div>
            </div>
            <div className="commonSearchBoxIcon">
              <img src={searchBoxLicense} alt="checkbox" />
              <div className="searchIconTitle">모바일 신분증</div>
            </div>
            <div className="commonSearchBoxIcon">
              <img src={searchBoxGetInfo} alt="checkbox" />
              <div className="searchIconTitle">신원 갱신</div>
            </div>
          </div>
        </div>
      </div>
      <div className="searchbar flex gap-3 items-center text-center pl-5">
        <div>
          <img src={searchIcon} alt="searchbar" />
        </div>
        <div className="categoryOver">
          <div className="category">ss</div>
          <div className="category">hh</div>
          <div className="category">hh</div>
          <div className="category">hh</div>
        </div>
      </div>
      <div className="policyScroll">
        <div className="policyBox">
          <div className="cashTitle mt-3 ml-3 titleFont">현금</div>
          <div className="flex justify-between justify-around mt-3">
            <div className="subsidyTitle">근로 장려금</div>
            <div></div>
            <div className="ml-12 justify-end agency">국세청</div>
            <div>
              <img src={revenue} alt="revenue" />
            </div>
          </div>
          <hr className="hrcss" />
          <div className="textfield">
            전년도 연간 부부합산 총 급여액 등에 따른 근로장려금 <br />ㆍ
            단독가구 최대 165만 원 <br />ㆍ 홑벌이 가구 최대 285만 원 <br />ㆍ
            맞벌이 가구 최대 330만 원 지급
          </div>
          <div className="flex content-around receiptArea">
            <div className="expectedReceipt">예상수령금액</div>
            <div className="amount">135만원</div>
          </div>
        </div>
        <div className="policyBox">aa</div>
      </div>
    </div>
  );
}
