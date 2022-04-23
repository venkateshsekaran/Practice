import React from "react";
import Navbar from "./interview/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./interview/components/Employee";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
