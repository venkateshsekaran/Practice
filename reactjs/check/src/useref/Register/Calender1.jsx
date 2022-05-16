import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

function Calender1() {
  const [userDate, setUserDate] = useState(new Date());
  console.log(userDate.getMonth());

  return (
    <div>
      <h1>B-Calendar</h1>
      <Calendar
        maxDate={new Date("December 31,2022")}
        onChange={(e) => {
          setUserDate(e);
        }}
      />
      <h1>
        {userDate.getDate()}/{userDate.getMonth()}/{userDate.getYear()}
      </h1>
    </div>
  );
}

export default Calender1;
