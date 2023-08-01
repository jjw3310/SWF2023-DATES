import React from "react";
import PolicyyBox from "../components/PolicyBox.jsx";
import leftArrow from "../icon/leftArrow.svg";
import { useNavigate } from "react-router-dom";
export default function Detail() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" myseoulheader bg-[#e2e8f0] justify-center">
        <button
          className="Arrowbotton"
          onClick={() => {
            navigate("/search");
          }}
        >
          <img src={leftArrow} alt="leftArrow" />
        </button>
        <div className="seoulmyfont hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          detail
        </div>
        <PolicyyBox />;
      </div>
    </>
  );
}
