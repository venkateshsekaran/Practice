/*function myfunction(a, b) {
  var new_s = UpdateString(b, 3);
  return new_s;
}

let output = myfunction("zxyzxyzxyzxyzxyz", "w");
console.log(output);*/
//failed
/*function chunk(a, b) {
  var ret = [];
  var i;
  var len;
  for (i = a.length, len = 0; i >= len; i -= b) {
    ret.push(a.substr(i, b));
    console.log(ret);
  }
  return ret;
}
let output = chunk("zxyzxyzxyzxyzxyz", 3).join("w");
console.log(output);*/

function myfunction(a, b) {
  var str1 = a.split("").reverse().join("");
  var str2 = str1.match(/.{1,3}/g).join(b);
  var new_value = str2.split("").reverse().join("");
  return new_value;
}
let output = myfunction("1234567", ".");
console.log(output);
