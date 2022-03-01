class Savings_Account {
    min_bal=10000;
    emp_id;
    emp_name;
    emp_salary;
    constructor (id,name,salary){
                                 this.emp_id=id
                                 this.emp_name=name
                                 this.emp_salary=salary
                                }
    withdrawable_balance(){
                            return this.emp_salary - this.min_bal
                          }                            
                      }
 let c1=new Savings_Account(101,"venkat",50000)
 let c2=new Savings_Account(102,"thiaghu",45000)
 
 console.log(c1);
 console.log(c2);

 console.log(c1.withdrawable_balance());
 console.log(c2.withdrawable_balance());

 console.log(c1.emp_salary);
 console.log(c2.emp_salary);