import React, { useEffect, useState } from "react";

function App() {
  let [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://jsonplaceholder.typicode.com/photos"
      );
      const details = await response.json();
      setData(details);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {data.map((data, i) => {
            return (
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <img
                      className="card-img-top "
                      src={data.url}
                      alt="..."
                      height="200px"
                    />
                  </div>
                  <div className="card-body">
                    <ul>
                      <li>{data.id}</li>
                      <li>{data.title}</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
