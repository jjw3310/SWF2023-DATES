import React from "react";
import "../style/footer.css";
import home from "../icon/home.svg";
import fit from "../icon/fit.svg";
import currentCheck from "../icon/currentCheck.svg";
import more from "../icon/more.svg";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footerstyle">
      <div>
        <Link to="/">
          <img src={home} alt="home" />홈
        </Link>
      </div>
      <div>
        <Link to="/">
          <img src={fit} alt="fit" />
          맞춤복지
        </Link>
      </div>
      <div>
        <Link to="/">
          <img src={currentCheck} alt="currentCheck" />
          신청현황
        </Link>
      </div>
      <div>
        <Link to="/">
          <img src={more} alt="more" />
          더보기
        </Link>
      </div>
    </div>
  );
}
