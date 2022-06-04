function myfunction(a) {
  let max_len = 0;
  let curr = 0;
  let hash = {};
  if (a.length < 2) {
    return a;
  }
  for (let i = 0; i < a.length; i++) {
    if (hash[a[i]] == null) {
      curr += 1;
    } else {
      curr = Math.min(i - hash[a[i]], curr + 1);
    }
    max_len = Math.max(max_len, curr);
    hash[a[i]] = i;
  }
  return max_len;
}
let output = myfunction("abcabcbb");
console.log(output);
