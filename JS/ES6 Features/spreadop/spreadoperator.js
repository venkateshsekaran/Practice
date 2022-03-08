/* let a = [10,20,30,40]
let b = [...a,50,60,70,80]
console.log(b)*/

/*let a = [10,20,30]
let b = [40,50,60]
let c = [...a,...b]
console.log(c)*/


//object does not allow duplicate keys
let user = {
              id:101,
              name:"venkat",
              email:"venkateshsekaran17"
           } 
           
let details = {
            Balance:55000,
            name:"virat",
            email:"venkateshsekaran18"
           } 

let user_details =
              {
                  ...user,...details
              }        
              console.log(user_details);   
                