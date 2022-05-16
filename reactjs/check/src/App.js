import React, { Component } from "react";
import Navbar from "./thunk/Navbar";
import User from "./thunk/User";

import { Provider } from "react-redux";
import Register from "./useref/Register/Register";
import Signup from "./useref/Register/Signup";
import Signup1 from "./useref/Register/Signup1";
import Filter from "./useref/Register/Filter";
import { store } from "./thunk/redux/store";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/user" element={<User />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup1" element={<Signup1 />} />
              <Route path="/filter" element={<Filter />} />
            </Routes>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
