import React from "react";
import Navbar from "./Navbar";
import User from "./User";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/user" element={<User />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
