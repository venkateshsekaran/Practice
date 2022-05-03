def function(a,b,c):
    if a<b and a<c:
        if b<c:
          print(a,b,c)
        else:
          print(a,c,b)
    elif b<c and b<a:
        if c<a:
          print(b,c,a)
        else:
          print(b,a,c)
    elif c<a and c<b:
       if a<b:
          print(c,a,b)
       else:
          print(c,b,a)
    
function(8,322,100)    




