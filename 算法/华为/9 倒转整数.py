a = int(input())
b = str(a)
rs= ''
for i in range(len(b)-1, -1, -1):
    if b[i] in rs:
        continue
    else:
        rs += b[i]
print(rs)