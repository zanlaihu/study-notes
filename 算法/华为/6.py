def ishua(num):
    sum = int(num)
    n = len(num)
    value = 0
    for i in num:
        a = int(i)

        value += a ** n

    if (value == sum):
        return True

def give():
    list5 = [54748, 92727, 93084]
    lis7 = [1741725, 4210818, 9800817, 9926315]
    try:
        n = int(input())
        m = int(input())
        if n == 5:
            if m < 3:
                print(list5[m])
                return
            else:
                print(93084)
                return
        if n == 6:
            print(548834)
            return
        if n == 7:
            if m < 4:
                print(lis7[m])
                return
            else:
                print(9926315)
                return

        if n < 3 or n > 7:
            print(-1)
            return
        for i in str(n):
            if not i.isdigit():
                print(-1)
                return
        for i in str(m):
            if not i.isdigit():
                print(-1)
                return

        start = '1' + '0' * (n - 1)
        end = '9' * n
        list = []

        for i in range(int(start), int(end) + 1):
            if (ishua(str(i))):
                # print(i)
                list.append(i)

        if m < len(list):
            print(list[m])
        else:
            print(list[-1])
    except:
        print(-1)

give()
# for i in range(1000000,9999999):
#     if ishua(str(i)):
#         print(i)




