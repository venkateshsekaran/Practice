//return last 3 letters in string
function myfunction(str) {
  return str.slice(-3);
}
let output = myfunction("venkat");
console.log(output);

// Write a function that takes two values, say a and b, as arguments
// Return true if the two values are equal and of the same type
/*function myfunction(a, b) {
  return a === b;
}
let output = myfunction(2, 2);
console.log(output);*/

// Write a function that takes a string (a) and a number (n) as argument
// Return the nth character of 'a'
/*function myfunction(a, n) {
  return a.slice(n - 1, n);
}
let output = myfunction("helloworld", 3);
console.log(output);*/
//another solution
/*function myFunction(a, n) {
    return a[n - 1];
 }*/
