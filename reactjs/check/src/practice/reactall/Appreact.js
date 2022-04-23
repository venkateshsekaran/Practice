import React from "react";
import Navbarreact from "./Navbarreact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Classreact from "./Classreact";
import Studentdetails from "./Props/Studentdetails";
import Eventhandler from "./Event/Eventhandler";
import Form from "./formhandling/Form";
import Contactapp from "./contactapp/Contactapp";

const Appreact = () => {
  return (
    <div>
      <Router>
        <Navbarreact />
        <Routes>
          <Route path="/classreact" element={<Classreact />} />
          <Route path="/studentdetails" element={<Studentdetails />} />
          <Route path="/eventhandler" element={<Eventhandler />} />
          <Route path="/form" element={<Form />} />
          <Route path="/contact" element={<Contactapp />} />
        </Routes>
      </Router>
    </div>
  );
};
export default Appreact;
