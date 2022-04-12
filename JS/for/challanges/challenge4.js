// Write a function that takes two numbers, say x and y, as arguments
// Check if x is divisible by y
// If yes, return x
// If not, return the next higher natural number that is divisible by y

/*function step1(x, y) {
  if (x % y == 0 && x >= 0) {
    return x;
  }
}
function myfunction(x, y) {
  if (step1(x, y)) {
    return x;
  } else {
    while (!step1(++x, y)) {
      if (x == 0) {
        return x;
      }
    }
    return x;
  }
}

let output = myfunction(-3, 3);
console.log(output);*/

function myfunction(x, y) {
  if (x % y == 0 && x >= 0) {
    return x;
  } else if (x >= 0) {
    var a = x + (y - (x % y));
    return a;
  } else {
    return 0;
  }
}

let output = myfunction(-6, 3);
console.log(output);

/*const demo1 = (x, y) => {
  let temp = x;
  for (; ; temp++) {
    if (temp % y == 0) {
      if (x < 0) temp = 0;
      if (temp % y == 0) {
        return temp;
      }
    }
  }
};
console.log(demo1(-5, 7));*/
