//map
// map can return new array 
let numbers=[101,102,104,105]
let c=numbers.map((a)=>{
                 let x=a+10
                 return x;
                })
            console.log(c);    

 //forEach               
// forEach can't return new array
 let number=[110,120,130,140]
let d =number.forEach((b)=>{
                 let y = b+10;
                 return(y);
                })
                console.log(d);