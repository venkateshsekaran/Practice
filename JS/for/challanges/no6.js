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

/*function myFunction(a) {
  return a.slice(0, -3);
}
let output2 = myFunction("abcdefg");
console.log(output2);*/

function myFunction(a, b) {
  let temp = "";
  for (var i = a.length; i >= 0; ) {
    console.log(i);
    if (i > 2) temp = b + a.substring(i - 3, i) + temp;
    else temp = a.substring(i - 3, i) + temp;
    i -= 3;
  }
  return temp;
}
let output = myFunction("1234567", ".");
console.log(output);
