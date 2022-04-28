import React from "react";
import Navbar from "./interview/Navbar";
import List from "./interview/components/List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./interview/components/Employee";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/employee" element={<Employee />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
