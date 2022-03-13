class parent{
             assets= "10cr"
             income=50000
            }
class child extends parent{
                          income_1="1 lakhs"
                          }     
let c1= new parent()
let c2= new child()     
console.log(c1);
console.log(c2);

console.log(c1.assets);
console.log(c2.assets);
console.log(c1.income);
console.log(c2.income);
console.log(c2.income_1);