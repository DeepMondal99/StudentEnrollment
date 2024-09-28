import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import MetaData from "./Metadata";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landingContainer">
      <MetaData title="Landing Page" />
      <div className="landingBox">
        <div className="landingHeader">Are You?</div>
        <div className="buttonContainer">
          <button className="loginBtn" onClick={() => navigate("/login")}>
            Admin
          </button>
          <button className="loginBtn" onClick={() => navigate("/enroll")}>
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
