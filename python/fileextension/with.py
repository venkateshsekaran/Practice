with open('read.py', 'r') as f:
    data = f.read()
    print(data)
    print(f.closed)
    print(f.name)
    print(f.mode)
    print(f.readable())
    print(f.writable())

print(f.closed)