// Write a function that takes a value as argument
// Return the type of the value
/*function myFunction(a) {
  return typeof a;
}
let output = myFunction("venkat");
console.log(output);*/

// Write a function that takes an object with two properties as argument
// It should return the value of the property with key country
/*function myFunction(obj) {
  return obj.country;
}
let output = myFunction({ continent: "asia", country: "india" });
console.log(output);*/

function myFunction(a) {
  return a.slice(0, `${a.length - 3}`);
}
let output = myFunction("venkateshs");
console.log(output);
