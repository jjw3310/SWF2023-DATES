import React from "react";
import "../style/footer.css";
import home from "../icon/home.svg";
import fit from "../icon/fit.svg";
import currentCheck from "../icon/currentCheck.svg";
import more from "../icon/more.svg";
export default function Footer() {
  return (
    <div className="footerstyle">
      <div>
        <img src={home} alt="home" />홈
      </div>
      <div>
        <img src={fit} alt="fit" />
        맞춤복지
      </div>
      <div>
        <img src={currentCheck} alt="currentCheck" />
        신청현황
      </div>
      <div>
        <img src={more} alt="more" />
        더보기
      </div>
    </div>
  );
}
