/*myFunction = (arr, num) => {
  num >= 6 ? num : (num = 0);
  arr.unshift(num);
  return arr;
};

let output1 = myFunction([null, false], 11);
console.log(output1);*/

function myFunction(a, n) {
  return a.filter((value, index, arr) => {
    return (index + 1) % n === 0;
  });
}
let output1 = myFunction([7, 2, 1, 6, 3, 4, 5, 8, 9, 10], 2);
console.log(output1);
