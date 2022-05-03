'''import math
def function(a):
    remainder=a%10;
    value=a/10;
    reverse=remainder*10+math.trunc(value)
    print(reverse)
function(99)'''


def function(a):
   revi=0
   while(a>0):
       remainder=a % 10;
       revi=(revi*10)+remainder
       a=a//10;
   print(revi)    
       
function(239)


