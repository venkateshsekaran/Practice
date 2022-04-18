import React from "react";
import Navbar from "../src/redux/Navbar";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from ".//redux/Message";
import { store } from "./Redux1/Message/Message.store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/message" element={<Message />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};
export default App;
