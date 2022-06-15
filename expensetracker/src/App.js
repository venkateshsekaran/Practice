import React, { useState } from "react";
import Expensedetails from "./Expensedetails";
import Expenseform from "./Expenseform";
function App() {
  let [track, setTrack] = useState([]);
  return (
    <div>
      <Expensedetails track={track} setTrack={setTrack} />
      <Expenseform track={track} />
    </div>
  );
}

export default App;
