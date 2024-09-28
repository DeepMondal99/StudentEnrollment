import React from "react";
import "./Header.css";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const logout = async (e) => {
    await signOut(auth);
    navigate("/login");
  };
  console.log(user);
  return (
    <div className="header">
      <div className="headerLeft">
        <h3>Welcome </h3>
        <h3>{user?.email.slice(0, user.email.indexOf("@"))}</h3>
      </div>
      <div className="headerRight">
        <FiLogOut className="logout" onClick={logout} />
      </div>
    </div>
  );
};

export default Header;
