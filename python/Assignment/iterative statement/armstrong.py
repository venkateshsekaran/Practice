def function(a):
 b=a
 arm=0;
 while(a>0):
       
       remainder=a % 10;
       arm=arm+remainder*remainder*remainder
       a=a//10;
       if arm==b:
          print(arm,"is a armstrong no")
 
       
function(153)