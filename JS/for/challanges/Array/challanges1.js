/*function myFunction(a) {
  return a.filter((el) => el < 0).length;
}
let output = myFunction([-2, 2, 1, 0]);
console.log(output);
function myFunction(a) {
  let count = 0;
  for (x of a) {
    if (x < 0) {
      count += 1;
    }
  }
  return count;
}
let output = myFunction([-2, 2, 1, 0]);
console.log(output);
function myFunction(a) {
  let c = a.length;
  return a.slice(0, c / 2);
}
let output1 = myFunction("1234");
console.log(output1);*/

function myFunction(a) {
  return a.reduce((acc, cur, i, arr) => {
    let value = 1;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== cur) {
        value = value * arr[j];
      }
    }
    acc.push(value);
    return acc;
  }, []);
}
let output = myFunction([4, 5, 2, 3]);
console.log(output);
