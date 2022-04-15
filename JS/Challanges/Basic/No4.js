//get nth character of string
// Write a function that takes a string (a) and a number (n) as argument
// Return the nth character of 'a'
function myFunction(a, n) {
  return a.at(n - 1);
}
let output = myFunction("zyxbwpl", 5);
console.log(output);
//myFunction("abcd", 1);  Expected;("a");
//myFunction("zyxbwpl", 5); Expected;("w");
//myFunction("gfedcba", 3);Expected;("e");
