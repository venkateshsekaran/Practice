/*function myFunction(a, b) {
  return a.getTime() === b.getTime();
}
let output1 = myFunction(
  new Date("2000/01/01 08:00:00"),
  new Date("2000/01/01 08:45:00")
);
console.log(output1);

function myFunction(a, b) {
  return a - b == 0;
}
let output2 = myFunction(
  new Date("2000/01/01 08:00:00"),
  new Date("2000/01/01 08:45:00")
);
console.log(output2);*/

// Write a function that takes two date instances as argument
// It should return the number of days that lies between those dates
/*function myFunction(a, b) {
  let m_seconds = Math.abs(a.getTime() - b.getTime());
  let days = m_seconds / (1000 * 60 * 60 * 24);
  return days;
}
let output = myFunction(new Date("2000-01-01"), new Date("2020-06-01"));
console.log(output);*/
//myFunction(new Date('2020-06-11'), new Date('2020-06-01'))  Expected 10

/*function myFunction(a, b) {
  return Math.abs((a.getTime() - b.getTime()) / 1000 / 60) <= 60;
}
let output = myFunction(
  new Date("2000/01/01 08:00:00"),
  new Date("2000/01/01 09:45:00")
);
console.log(output);*/

/*function myFunction(a, b) {
  let sec = Math.abs((a.getTime() - b.getTime()) / 1000);
  let acc = {};
  acc["hrs"] = Math.trunc(sec / 3600);
  acc["min"] = Math.trunc((sec / 60) % 60);
  acc["sec"] = Math.trunc(sec % 60);
  return acc;
}
let output = myFunction(
  new Date("2000/01/01 09:50:23"),
  new Date("2000/01/01 08:00:00")
);
console.log(output);*/

function myFunction(a) {
  let min = (a.getTime() - new Date(2021, 8, 10).getTime()) / 1000 / 60;

  return (min % 60) + (15 - ((min % 60) % 15));
}
let output = myFunction(new Date(2021, 8, 10, 15, 22, 00));
console.log(output);
