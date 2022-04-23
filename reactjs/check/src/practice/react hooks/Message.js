import React, { useState } from "react";
const Message = () => {
  let [variable, setVariable] = useState("oooi");
  let gnHandler = () => {
    setVariable("GN");
  };
  return (
    <div>
      <h3>Hi,,,{variable}</h3>;
      <button
        onClick={() => {
          setVariable("GM");
        }}
      >
        GM
      </button>
      <button onClick={gnHandler}>GN</button>
    </div>
  );
};

export default Message;
