import random
Guess= (input("Guess the name:"))
randomvalue=random.choice(["venkat","modi","siva"])
if Guess==randomvalue:
    print("You are correct")
else:
    print("try once again")
