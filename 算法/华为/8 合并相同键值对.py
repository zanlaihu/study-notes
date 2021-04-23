a = int(input())
dict = {}
for i in range(a):
    list = input().split(' ')
    b = int(list[0])
    c = int(list[1])
    if b not in dict.keys():
        dict[b] = c
    else:
        dict[b] = dict[b] + c
for i in sorted(dict.keys()):
    print(i, dict[i])