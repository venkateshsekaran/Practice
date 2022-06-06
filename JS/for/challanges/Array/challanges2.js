function myFunction(a) {
  let acc = [];
  return a.map((ele) => {
    return ele + 2;
  });
}
let output = myFunction([1, 5, 39, 32]);
console.log(output);
