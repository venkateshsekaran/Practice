for i in range(1,6):
   f=0
   for j in range(0,i):
       print(i+f,end=" ")
       f= f+7
       if j==0 and i>3:
           f=f-3
       if i>2:
          f=f-2
       if j==1 and i<4:
          f=f-3
       if j==0 and i==4:
          f=f+1
       if j==0 and i==5:
          f=f-1
       if j==1 and i==4 :
          f=f-1
       if j==1 and i==5 :
          f=f+1
       if j==2 and i==5 :
          f=f-4
       if j==2 and i==4 :
          f=f-2
       if j==3 and i==5 :
          f=f-3   
   print()






