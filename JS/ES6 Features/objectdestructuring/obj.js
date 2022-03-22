const emp = {
  id: 1001,
  name: "venkat",
  gender: "male",
  age: [25, 27, 29],
  order: function (ageindex) {
    return this.age[ageindex];
  },
};

//normally we print like the way
/*console.log(emp.id);*/

//object destructuring
/*let { id } = emp;
console.log(id);*/

//array destructuring
let [a, , c] = emp.age;
console.log(a, c);
[c, a] = [a, c];
console.log(a, c);

console.log(emp.order(1));
