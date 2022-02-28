let i=100
let x=0
let y
while(i!=0)
{ 
    y=i%10;
   x=x*10+y;
   i/=10;
   
}
console.log(x)