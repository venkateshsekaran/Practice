char=65
for i in range(1,6):
   f=0
   if i>1:
       char=char+1
   for j in range(0,i):           
       print(chr(char+f),end=" ")
       f= f+4
       if j>=1:
          f=f-j
        
   print()






