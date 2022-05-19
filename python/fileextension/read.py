"""f= open("read1.py","r")
readfile= f.read()
print(readfile)
f.close()"""
"""
f= open("read1.py","w")
writefile= f.write("venkat")
f.close()
"""
'''f= open("read1.py","a")
appendfile= f.write("venkat \n")
f.close()'''
#exclusive
'''
f= open("read2.py","a")
f.write("venkat1 \n")
f.close()'''

#readplus
'''f=open("read2.py","r+")
data=f.read()
print(data)
f.write("hello \n")
f.write("gm \n")
f.close()'''

#writeplus
'''f=open("read3.py","w+")
f.write("hiiiii \n")
data=f.readlines()
print(data)
f.close()'''

#appendplus
'''f=open("read3.py","a+")
f.write("helloooo \n")
data=f.read()
print(data)
f.close()'''

'''f=open("read3.py","r")
data=f.read()
print(data)'''

'''f=open("read3.py","r")
data1=f.read(7)
print(data1)'''

'''f=open("read3.py","r")
data2=f.readline()
data3=f.readline()
data4=f.readline()
print(data2)
print(data3)
print(data4)'''

f=open("read3.py","r")
data2=f.readlines()
print(data2)

f.close()