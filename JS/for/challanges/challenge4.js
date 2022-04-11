// Write a function that takes two numbers, say x and y, as arguments
// Check if x is divisible by y
// If yes, return x
// If not, return the next higher natural number that is divisible by y

function step1(x, y) {
  if (x % y == 0 && x >= 0) {
    return x;
  }
}
function myfunction(x, y) {
  if (step1(x, y)) {
    return x;
  } else {
    while (!step1(++x, y)) {
      if (x == 0) return x;
    }
    return x;
  }
}

let output = myfunction(7, 3);
console.log(output);
