import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enroll from "./Enroll";
import Home from "./Home";
import Login from "./Login";
import ThankYou from "./ThankYou";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Landing from "./Landing";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home user={user} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/enroll" element={<Enroll />} />
          <Route exact path="/thankyou" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
