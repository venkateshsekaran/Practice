let a = 111;
let b = 999;
let obj = { a: 23, b: 21, c: { d: 32, e: 567, f: 67 } };
//mistake
/*{a,b} = obj;*/ //unexpected token error

//right way

({ a, b } = obj);

console.log(a, b);
const {
  c: { d, e },
} = obj;
console.log(d, e);
