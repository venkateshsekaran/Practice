/*myFunction = (arr, num) => {
  num >= 6 ? num : (num = 0);
  arr.unshift(num);
  return arr;
};

let output1 = myFunction([null, false], 11);
console.log(output1);*/

/*function myFunction(a, n) {
  return a.filter((value, index, arr) => {
    return (index + 1) % n === 0;
  });
}
let output1 = myFunction([7, 2, 1, 6, 3, 4, 5, 8, 9, 10], 2);
console.log(output1);*/

/*function myFunction(a, b) {
  const res = Object.keys(b).map((el) => ({
    [a[el]]: b[el],
  }));
  return res.reduce((acc, cur) => {
    for (var key in cur) acc[key] = cur[key];
    return acc;
  }, {});
}
let output1 = myFunction([1, "b"], ["a", 2]);
console.log(output1);*/

/*function myFunction(a, b) {
  return a.reduce((acc, cur, i) => ({ ...acc, [cur]: b[i] }), {});
}
let output2 = myFunction([1, "b"], ["a", 2]);
console.log(output2);*/

/*function myFunction(a, b) {
  let result = {};
  a.forEach((element, index) => {
    result[element] = b[index];
  });
  return result;
}
let output3 = myFunction([1, "b"], ["a", 2]);
console.log(output3);*/

/*function myFunction(obj) {
  delete obj.b;
  return obj;
}
let output = myFunction({ e: 6, f: 4, b: 5, a: 3 });
console.log(output);

function myFunction(obj) {
  const { b, ...rest } = obj;
  return rest;
}
let output1 = myFunction({ e: 6, f: 4, b: 5, a: 3 });
console.log(output1);*/

/*function myFunction(a) {
  const newarr = Object.entries(a).map(([keys, values]) => [values, keys]);

  return Object.fromEntries(newarr);
}
let output1 = myFunction({ z: "a", y: "b", x: "c", w: "d" });
console.log(output1);

function myFunction(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    return { ...acc, [val]: key };
  }, {});
}
let output2 = myFunction({ z: "a", y: "b", x: "c", w: "d" });
console.log(output2);*/

/*function myFunction(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (val == "" || val == " ") {
      val = "null";
    }
    return { ...acc, [key]: val };
  }, {});
}
let output = myFunction({ a: "", b: "b", c: " ", d: "d" });
console.log(output);*/
/*function myFunction(obj) {
  {
    const { age, email, ...rest } = obj;
    console.log(rest);
    return Object.entries(rest).reduce((acc, [key, val]) => {
      if (key == "size") {
        return { ...acc, [key]: val.toString() + "cm" };
      } else if (key == "weight") {
        return { ...acc, [key]: val.toString() + "kg" };
      } else {
        return { ...acc, [key]: val };
      }
    }, {});
  }
}
let output = myFunction({
  fn: "Martin",
  ln: "Harper",
  age: 26,
  email: "martin.harper@test.de",
  weight: 102,
});
console.log(output);

function myFunction(obj) {
  return {
    fn: obj.fn,
    ln: obj.ln,
    ...(obj.size && { size: `${obj.size}cm` }),
    ...(obj.weight && { weight: `${obj.weight}kg` }),
  };
}
let output1 = myFunction({
  fn: "Matthew",
  ln: "Müller",
  age: 19,
  email: "matthew@mueller.de",
});
console.log(output1);*/

/*function myFunction(arr, str) {
  return arr.map((cur) => ({ ...cur, continent: str }));
}

let output = myFunction(
  [
    { city: "Tokyo", country: "Japan" },
    { city: "Bangkok", country: "Thailand" },
  ],
  "Asia"
);
console.log(output);*/

function myFunction(arr) {
  return arr.reduce((count, cur) => {
    count[cur] ? (count[cur] += 1) : (count[cur] = 1);

    return count;
  }, {});
}

let output = myFunction([4, 3, 2, 1]);
console.log(output);

/*function myFunction(arr) {
  let count = {};

  for (i = 0; i < arr.length; i++) {
    if (count[arr[i]]) {
      count[arr[i]] += 1;
    } else {
      count[arr[i]] = 1;
    }
  }

  return count;
}

let output1 = myFunction([1, 2, 2, 2, 3]);
console.log(output1);*/

function myFunction(arr) {
  return arr.reduce((acc, cur) => {
    return { ...acc, [cur]: (acc[cur] || 0) + 1 };
  }, {});
}
let output2 = myFunction([1, 2, 2, 2, 3]);
console.log(output2);
