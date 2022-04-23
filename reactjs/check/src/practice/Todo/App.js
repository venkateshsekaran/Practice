import React from "react";
import Navbar from "../Todo/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from ".//user/User";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/todo" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
