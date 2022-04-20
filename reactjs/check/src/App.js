import React from "react";
import Navbar from "../src/redux/Navbar";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Product } from "./redux/Product";

import { store } from "./redux/product/store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/product" element={<Product />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};
export default App;
