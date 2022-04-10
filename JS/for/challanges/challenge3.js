// Write a function that takes two strings (a and b) as arguments
// Return the number of times a occurs in b
/*function myFunction(a, b) {
  let count = 0;
  for (x of b) {
    if (x == a) count += 1;
  }
  return count;
}
let output = myFunction("m", "hello man mmm");
console.log(output);*/

/*function myFunction(a) {
  return Number.isInteger(a);
}
let output = myFunction(10.1);
console.log(output);*/

/*function myFunction(a, b) {
  return a.includes(b) ? b.concat(a) : a.concat(b);
}
let output = myFunction(" think, therefore I am", "I");
console.log(output);*/

/*function myFunction(a) {
  return a.toFixed(2);
}
let output = myFunction(2.54647);
console.log(output);*/

/*function myFunction(a) {
  return `${a}`.split("");
}
let output = myFunction(251);
console.log(output);*/

/*function myFunction(a, b) {
  return a.concat(b.split("").reverse().join("")).replace("%", "");
}
let output = myFunction("c%ountry", "edis");
console.log(output);*/

/*const num = 101;
const isPrime = (num) => {
  let sqrtnum = Math.floor(Math.sqrt(num));
  let prime = num !== 1;
  for (let i = 2; i < sqrtnum + 1; i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }
  return prime;
};
const nextPrime = (num = 101) => {
  while (!isPrime(++num)) {}
  return num;
};
console.log(nextPrime(num));*/
const isPrime = (num) => {
  let sqrtnum = Math.floor(Math.sqrt(num));
  let prime = num !== 1;
  for (let i = 2; i < sqrtnum + 1; i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }
  return prime;
};
function myFunction(num) {
  while (!isPrime(++num)) {}
  return num;
}
let output = myFunction(101);
console.log(output);
