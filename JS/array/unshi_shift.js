let size = [38,40,42,44]
console.log(size.length);
/* next we are going to add one more size at the beginning*/
size.unshift(36)
size.unshift(34)
console.log(size);
console.log(size.length);
/* next we are going to add remove one more size at the beginning*/
size.shift(34)
console.log(size);
console.log(size.length);
console.log(size.indexOf(42));