import React from "react";
import "./EnrolledStudent.css";

const EnrolledStudent = ({ name, studentId, dob, Class, stream, image }) => {
  return (
    <div className="studentContainer">
      <div className="studentImage">
        <img src={image} alt="" />
      </div>
      <div className="studentDetails">
        <div>
          <h4>Full Name</h4>
          <p>{name}</p>
        </div>
        <div>
          <h4>Date Of Birth</h4>
          <p>{dob}</p>
        </div>
        <div>
          <h4>Class</h4>
          <p>{Class} </p>
        </div>
        <div>
          <h4>Stream</h4>
          <p>{stream}</p>
        </div>
      </div>
    </div>
  );
};

export default EnrolledStudent;
