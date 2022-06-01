num1=int(input("Enter the number: "))
num2=int(input("Enter the number: "))
for x in range(num1,num2):
    prime=True
    for i in range(2,x):
        if x%i==0:
            prime=False
    if prime==True:
        print(x)
  
                
         

         
       