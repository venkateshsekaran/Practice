from functools import *
result = reduce(lambda x,y:x+y, (10,20,30,40,50))
print(result)