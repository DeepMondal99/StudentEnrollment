import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "./Metadata";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MetaData title="Successfully Enrolled" />
      <div className="thankyou">
        <h2 onClick={() => navigate("/login")}>
          You have Enrolled Successfully!!!
        </h2>

        <div>
          <p>
            <Link to="/">Go To Home </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
