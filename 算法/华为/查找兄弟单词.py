while True:
    try:
        ss=input().split()
        n=int(ss[0])
        dict=ss[1:n+1]
        s=ss[-2]
        m=int(ss[-1])
        a=[]
        for i in dict:
            if len(i)==len(s) and i!=s and sorted(i)==sorted(s):
                a.append(i)
        print(len(a))
        if a and m<=len(a):
            print(sorted(a)[m-1])
    except:
        break