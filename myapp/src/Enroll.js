import React, { useRef, useState } from "react";
import profile from "./Profile.png";
import "./Enroll.css";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import MetaData from "./Metadata";
import { AiFillHome } from "react-icons/ai";

const Enroll = () => {
  const nameRef = useRef();
  const studentIdRef = useRef();
  const classRef = useRef();
  const streamRef = useRef();
  const dobRef = useRef();

  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  setTimeout(() => {
    setError("");
  }, 5000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidStream =
      streamRef.current.value === "EEE" ||
      streamRef.current.value === "ECE" ||
      streamRef.current.value === "CSE" ||
      streamRef.current.value === "IT";

    const fields =
      !nameRef.current.value ||
      !studentIdRef.current.value ||
      !classRef.current.value ||
      !dobRef.current.value ||
      !streamRef.current.value ||
      !avatar;

    if (!fields) {
      if (isValidStream) {
        //db Stuff
        setLoading(true);

        const docRef = await addDoc(collection(db, "enrolledStudents"), {
          name: nameRef.current.value,
          studentId: studentIdRef.current.value,
          class: classRef.current.value,
          dob: dobRef.current.value,
          stream: streamRef.current.value,
        });

        const imageRef = ref(storage, `enrolledStudents/${docRef.id}/image`);

        await uploadString(imageRef, avatar, "data_url").then(
          async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "enrolledStudents", docRef.id), {
              image: downloadURL,
            });
          }
        );
        setLoading(false);
        navigate("/thankyou");
      } else {
        setError("Selected Branch is not Eligible!!");
      }
    } else {
      setError("!!!! Please fill in all the Fields !!!");
    }
  };

  return (
    <div>
      <MetaData title="Enroll -- Students" />
      <div className="enrollContainer">
        <div className="enrollBox">
          <div className="errorContainer">
            <div className="enrollerror">
              {error && <p className="error">{error}</p>}
            </div>
          </div>
          <div className="enrollHeader">
            <h3>Enroll</h3>
          </div>

          <div className="enrollForm">
            <div className="enrollName">
              <input type="text" placeholder="Name" required ref={nameRef} />
            </div>
            <div className="enrollStudentId">
              <input
                type="text"
                placeholder="Student Id"
                required
                ref={studentIdRef}
              />
            </div>
            <div className="enrollClass">
              <input type="text" placeholder="Class" required ref={classRef} />
            </div>
            <div className="enrollDob">
              <input
                type="date"
                placeholder="Date Of Birth"
                required
                ref={dobRef}
              />
            </div>
            <div className="enrollStream">
              <input
                type="text"
                placeholder="Stream"
                required
                ref={streamRef}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                  const reader = new FileReader();

                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setAvatarPreview(reader.result);
                      setAvatar(reader.result);
                    }
                  };

                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
            </div>
            <button
              disabled={loading}
              className="enrollBtn"
              onClick={handleSubmit}
            >
              Enroll Now
            </button>
            <Link to="/" className="homeIcon">
              <AiFillHome />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
