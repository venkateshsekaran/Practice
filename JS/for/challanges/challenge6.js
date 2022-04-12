function myfunction(str) {
  var char = str.split("");
  for (var i = 0; i < char.length; i++) {
    var n = char[i].charCodeAt(); //here we can find the position in alphabet
    char[i] = String.fromCharCode(n + 1); //here we increase the position and based on position no, we form the alphabet
  }
  return char.join("");
}
let output = myfunction("sdrshmf");
console.log(output);
