function myFunction(a) {
  return a.filter((el) => el < 0).length;
}
let output = myFunction([-2, 2, 1, 0]);
console.log(output);
/*function myFunction(a) {
  let count = 0;
  for (x of a) {
    if (x < 0) {
      count += 1;
    }
  }
  return count;
}
let output = myFunction([-2, 2, 1, 0]);
console.log(output);*/
function myFunction(a) {
  let c = a.length;
  return a.slice(0, c / 2);
}
let output1 = myFunction("1234");
console.log(output1);
