from random import seed
from random import randint
seed(1)
Guess= int(input("Guess the number:"))
for x in range(1):
    value=randint(1,10)
    if Guess==value:
       print("Wow You are right")
    else:
        print("try one more time")
    
    