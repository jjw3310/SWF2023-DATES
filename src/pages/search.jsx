import React from "react";
import alarm from "../icon/Alarm.svg";
import profileicon from "../icon/profileicon.svg";
import checkbox from "../icon/searchboxccheck.svg";
import searchBoxLicense from "../icon/searchBoxLicense.svg";
import searchBoxGetInfo from "../icon/searchBoxGetInfo.svg";
export default function search() {
  return (
    <div className="h-screen myseoulheader space-x-2 bg-[#e2e8f0]">
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
              <div className="searchIconTitle">신원 정보</div>
            </div>
          </div>
        </div>
      </div>
      <div className="searchbar">ss</div>
    </div>
  );
}
