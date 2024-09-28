import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnrolledStudent from "./EnrolledStudent";
import { db } from "./firebase";
import Header from "./Header";
import "./Home.css";
import MetaData from "./Metadata";

const Home = ({ user }) => {
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "enrolledStudents"), (snapshot) => {
        setEnrolledStudents(snapshot.docs);
      }),
    [db]
  );

  return (
    <div className="home">
      <MetaData title="Home" />
      <Header className="head" user={user} />

      <div className="container">
        {enrolledStudents.map((student) => (
          <EnrolledStudent
            name={student.data().name}
            studentId={student.data().studentId}
            dob={student.data().dob}
            Class={student.data().class}
            stream={student.data().stream}
            image={student.data().image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
