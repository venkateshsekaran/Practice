function myfunction(a, b) {
  const join_a = a.join("");
  const join_b = b.join("");
  const int_a = parseInt(join_a);
  const int_b = parseInt(join_b);
  const value = int_a + int_b;
  const value_str = value.toString();
  const split_value = value_str.split("");
  const rev_value = split_value.reverse();

  return split_value;
}
let output = myfunction([2, 4, 3], [5, 6, 4]);
console.log(output);
