def isfour(num):
    numstr = str(num)
    for i in numstr:
        if i == '4':
            return True
    return False

a = int(input())
list1 = []
list2 = []
for i in range(a+1):
    if not isfour(i):
        list1.append(i)
for i in range(a+1):
    list2.append(i)

xuhao = list1.index(a)
print(list2[xuhao])

