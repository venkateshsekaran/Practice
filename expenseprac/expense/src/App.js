import React, { useState } from "react";
import Expensedetails from "./Expensedetails";
import Expenseform from "./Expenseform";
function App() {
  let [track, settrack] = useState([]);
  return (
    <div className="App">
      <Expensedetails track={track} settrack={settrack} />
      <Expenseform track={track} />
    </div>
  );
}

export default App;
