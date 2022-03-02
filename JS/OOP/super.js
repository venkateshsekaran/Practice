class Savings_Account{
                    min_bal=1000;
                    constructor(id,name){
                                         this.id=id
                                         this.name=name
                                        }
                     }
class Current_Account extends Savings_Account{
                    constructor(id,name,amount){
                                  super(id,name);
                                  this.amount=amount
                                 }
                     }    
class Premium_Account extends Current_Account{
                    min_bal=10000;
                    constructor(id,name,amount){
                                  super(id,name);
                                  this.amount=amount
                                 }
                     }                         
let c1= new Current_Account(101,"venkat",50000)
let c2= new Premium_Account(203,"venkat",1000000)
let c3= new Current_Account(102,"thiaghu",45000)
let c4= new Premium_Account(204,"thiaghu",100000)
console.log(c1);
console.log(c2);
console.log(c3);
console.log(c4);
console.log(c1.name);
console.log(c4.amount);

/*export{min_bal,c1}*/    //ES6-Only for reactlevel
module.exports=c3         //default export for single value ES5
module.exports={c2,c1}    //named export for multiple values ES5