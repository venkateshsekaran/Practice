s = {10}
l1 = [20]
l2 = [30,40]
s.update(l1,l2,l2,range(5),60) #we cant add 60 or single elements
print(s)  #  {10,20,30,40,0,1,2,3,4