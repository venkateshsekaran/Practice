/*function myFunction(a) {
  return a.sort();
}
let output2 = myFunction(["b", "c", "d", "a"]);
console.log(output2);*/

/*function myFunction(obj, key) {
  return obj[key];
}

let output = myFunction({ continent: "Asia", country: "Japan" }, "continent");
console.log(output);*/
//descending sort
/*function myFunction(arr) {
  return arr.sort((a, b) => b - a);
}
let output = myFunction([4, 3, 1, 2]);
console.log(output);*/

/*function myFunction(arr) {
  var max = "";
  for (ele of arr) {
    ele.length > max.length ? (max = ele) : max;
  }
  return max;
}
let output = myFunction(["I", "need", "candy"]);
console.log(output);

function myFunction(arr) {
  return arr.reduce((a, b) => (a.length <= b.length ? b : a));
}*/
// check elements are same or not
/*function myFunction(arr) {
  return new Set(arr).size === 1;
}
function myFunction(arr) {
  var a = arr[0];
  return arr.every((ele) => {
    return ele === a;
  });
}*/
/*function myFunction(arr) {
  return arr.sort((a, b) => {
    if (a.b < b.b) {
      return -1;
    }
    if (a.b > b.b) {
      return 1;
    }
    return 0;
  });
}
let output = myFunction([
  { a: 1, b: 2 },
  { a: 5, b: 4 },
]);
console.log(output);*/

/*function myFunction(a, b) {
  let c = a.concat(b).sort((a, b) => a - b);
  var set = new Set(c);

  return set;
}
let output = myFunction([-10, 22, 333, 42], [-11, 5, 22, 41, 42]);
console.log(output);*/

/*function myFunction(a, b) {
  return a.reduce((acc, cur) => {
    if (cur > b) {
      acc = acc + cur;
    }
    return acc;
  }, 0);
}
let output = myFunction([78, 99, 100, 101, 401], 99);
console.log(output);*/

/*function myFunction(start, end) {
  if (start === end) return [start];

  return [start, ...myFunction(start + 1, end)];
}
let output = myFunction(2, 10);
console.log(output);*/

function myFunction(arr) {
  const sorting = arr.reduce((acc, cur) => {
    let char = cur.charAt(0).toLowerCase();
    acc[char] = [].concat(acc[char] || [], cur);
    return acc;
  }, {});

  const res = Object.keys(sorting).map((el) => ({
    [el]: sorting[el],
  }));
  return res;
}
let output = myFunction(["Alf", "Alice", "Ben"]);
console.log(output);

/*function myFunction(arr, num) {
  console.log(arr);
  console.log(arr.unshift(6, 7));
  return num >= 6 ? arr.unshift(num) : arr.unshift(0);
}

let output1 = myFunction([1, 2, 3], 6);
console.log(output1);*/
