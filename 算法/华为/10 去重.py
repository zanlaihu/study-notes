a = input()
b = set()
for i in a:
    if i in b:
        continue
    else:
        b.add(i)
print(len(b))
