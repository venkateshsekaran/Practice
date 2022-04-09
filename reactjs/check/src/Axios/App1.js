import React from "react";
import Axios1 from "./Axios1";
import Navbar from "./Navbar";
import Home from "../Reactor DOM/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App1 = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/axios1" element={<Axios1 />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App1;
