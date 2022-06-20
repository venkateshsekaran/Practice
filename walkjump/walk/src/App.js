import React, { useState } from "react";
import "./App.css";
function App() {
  let [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= 10; i++) {
    pageNumbers.push(i);
  }
  let step = () => {
    paginate(currentPage + 1);
  };
  let jump = () => {
    paginate(currentPage + 2);
  };
  return (
    <>
      <div className="container mt-5 d-flex   ">
        <pre>{currentPage}</pre>
        <input
          type="submit"
          value="Walk"
          className="btn btn-success mx-auto"
          onClick={step}
        />
        <input
          type="submit"
          value="Jump"
          className="btn btn-danger mx-auto"
          onClick={jump}
        />
      </div>
      <div className="container mt-5 ">
        <ul className="pagination ">
          {pageNumbers.map((number) => (
            <li className="page-item mr-5  " key={number}>
              <a
                className="page-link back "
                onClick={() => paginate(number)}
                href="!#"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
