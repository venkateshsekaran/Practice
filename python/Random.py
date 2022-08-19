
from random import *

flag=True
for x in range(1):
  value=randint(1,100)
  chance=5
  
  while flag:
    Guess= int(input("Guess the number:"))  
    if Guess==value:
       print("Wow You are right")
       flag=False
    elif Guess < value:
        chance= chance - 1
        if chance==0:
            print("Game Over")
            flag=False
        else:
            print("You are too low") 
    elif Guess > value:
        chance= chance - 1
        if chance==0:
            print("Game Over")
            flag=False
        else:
            print("You are too high") 
            
       