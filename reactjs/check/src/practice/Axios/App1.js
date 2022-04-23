import React from "react";
import Navbar from "./Navbar1";
import Home1 from "./Home1";
import Reactcontact from "./Reactcontact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App1 = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/contactapp" element={<Reactcontact />} />
          <Route path="/home" element={<Home1 />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App1;
