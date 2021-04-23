a = input()
b = str(a)
c = ''
for i in range(len(b)-1, -1, -1):
    c += b[i]
print(c)