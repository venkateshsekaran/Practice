import random
Guess= int(input("Guess the number:"))
randomvalue=random.randrange(0,10,1)
if Guess==randomvalue:
    print("You are correct")
else:
    print("try once again")

