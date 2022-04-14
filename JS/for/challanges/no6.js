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

/*function myFunction(a, b) {
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
console.log(output);*/

/*function myFunction(a, b) {
  let x = {};
  return Object.fromEntries(
    Object.entries(a).map(([name, value]) => {
      return [name, value * b];
    })
  );
}
let output = myFunction({ a: 1, b: 2, c: 3 }, 3);
console.log(output);

function myFunction(a, b) {
  return Object.entries(a).reduce((acc, [key, val]) => {
    return { ...acc, [key]: val * b };
  }, {});
}
let output1 = myFunction({ a: 1, b: 2, c: 3 }, 3);
console.log(output1);

function myFunction(a, b) {
  return a[`${b - 1}`];
}
let output1 = myFunction([7, 2, 1, 6, 3], 1);
console.log(output1);*/

/*function myFunction(a) {
  return a.filter((x) => {
    return a.indexOf(x) > 2;
  });
}
let output1 = myFunction([99, 1, 1]);
console.log(output1);
function myFunction(a) {
  return a.slice(3);
}
let output2 = myFunction([99, 1, 1]);
console.log(output2);*/
