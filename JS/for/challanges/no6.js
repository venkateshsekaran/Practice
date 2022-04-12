/*function myFunction(a, b) {
  return Object.keys(a).includes(b);
}
let output1 = myFunction({ x: "a", y: "b", z: "c" }, "a");
console.log(output1);

function myFunction(a, b) {
  return b in a;
}
let output = myFunction({ x: "a", y: "b", z: "c" }, "a");
console.log(output);*/

function myFunction(a) {
  return a.slice(0, -3);
}
let output2 = myFunction("abcdefg");
console.log(output2);
