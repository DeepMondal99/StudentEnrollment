import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "./firebase";
import "./Login.css";
import { AiFillHome } from "react-icons/ai";
import MetaData from "./Metadata";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  setTimeout(() => {
    setError("");
  }, 15000);

  const userName = useRef();
  const password = useRef();

  const handleLogin = async (e) => {
    if (!userName.current.value || !password.current.value) {
      setError("Please Enter UserName & Password");
    } else {
      try {
        await login(
          userName.current.value + "@mail.com",
          password.current.value
        );
        e.preventDefault();
        navigate("/home");
      } catch {
        setError("Incorrect Email Or Password");
      }
    }
  };

  const handleSignup = async (e) => {
    if (!userName.current.value || !password.current.value) {
      setError("Please Enter UserName & Password");
    } else {
      try {
        await signup(
          userName.current.value + "@mail.com",
          password.current.value
        );
        e.preventDefault();
        navigate("/home");
      } catch (err) {
        setError(
          err.message === "Firebase: Error (auth/email-already-in-use)."
            ? "User already Exists "
            : err.message.slice(9, 50)
        );
      }
    }
  };
  return (
    <div>
      <MetaData title="ADMIN -- login/SignUp" />
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div className="errorContainer">
            <div className="enrollerror">
              {error && <p className="error">{error}</p>}
            </div>
          </div>
          <div className="LoginHeaderontainer">
            <div className="LoginHeader">Login/SignUp</div>
          </div>
          <div className="loginForm">
            <div className="loginUserName">
              <input
                type="text"
                placeholder="Username"
                ref={userName}
                required
              />
            </div>
            <div className="loginPassword">
              <input
                type="password"
                placeholder="Password"
                required
                ref={password}
              />
            </div>
            <button className="loginBtn" onClick={handleLogin}>
              Login
            </button>
            <button className="loginBtn" onClick={handleSignup}>
              SignUp
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

export default Login;
