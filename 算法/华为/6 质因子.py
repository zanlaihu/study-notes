a = int(input())
res = ''
for i in range(2, a+1):
    while a%i == 0:
        a =a / i
        res += str(i) + ' '
print(res)