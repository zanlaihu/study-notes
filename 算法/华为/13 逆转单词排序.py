a = input().split(' ')
b = ''
for i in range(len(a)-1, -1, -1):
    b += a[i] + ' '
print(b[:-1])

