function myFunction(a) {
  split_a = a.split("--");
  join_a = split_a.join("-");
  split_a1 = join_a.split("--");
  return (join_a1 = split_a1.join("-"));
}
let output = myFunction("a--h-y--g-l-d---w");
console.log(output);
