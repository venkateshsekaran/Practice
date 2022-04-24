/*function myFunction(set, val) {
  let a = set.delete(val);

  return set;
}
let output = myFunction(new Set([1, 2, 3]), 1);
console.log(output);*/

function myFunction(a, b) {
  const result = new Set([...a].filter((ele) => b.has(ele)));

  return result;
}
let output = myFunction(new Set("12345"), new Set([..."45678"]));
console.log(output);
