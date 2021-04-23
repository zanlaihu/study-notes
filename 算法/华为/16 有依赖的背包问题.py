n, m = map(int, input().split())
f = [0] * n  # 购物单总价值
# 分组背包，每组有四种情况，a.主件 b.主件+附件1 c.主件+附件2 d.主件+附件1+附件2
v = [[0 for i in range(4)] for j in range(m + 1)]  # 每组的资金
w = [[0 for i in range(4)] for j in range(m + 1)]  # 每组的重要度

n = n // 10  # 价格为10的整数倍，节省时间
for i in range(1, m + 1):
    x, y, z = map(int, input().split())
    x = x // 10
    if z == 0:
        # 主件，同时给每个组合初始化主件的金额跟重要度
        for t in range(4):
            v[i][t], w[i][t] = v[i][t] + x, w[i][t] + x * y
    elif v[z][1] == v[z][0]:  # 附件且a==b，意味着附件1没加入，这时候累加b跟d情况
        v[z][1], w[z][1] = v[z][1] + x, w[z][1] + x * y
        v[z][3], w[z][3] = v[z][3] + x, w[z][3] + x * y
    else:  # 附件且a!=b，意味着附件1加入了附件2没加入，这时候累加c跟d情况
        v[z][2], w[z][2] = v[z][2] + x, w[z][2] + x * y
        v[z][3], w[z][3] = v[z][3] + x, w[z][3] + x * y
# m:加入购物单的物品个数上限
for i in range(1, m + 1):
    # n:购物总资金上限，只能倒序遍历，因为背包的思维是可用空间从大到小，求当前每个子状态的最优，
    # 如果顺序遍历，背包容量变大，之前遍历的子状态的最优结论就被推翻了
    for j in range(n, -1, -1):
        for k in range(4):
            if j >= v[i][k]:
                # 将每组的购物资金 整体视为 一个容量，这样才不会出现主件重复放入的情况，这也是其他答案犯错的地方
                # f[j]：表示总花费为j钱时的最大购物价值
                f[j] = max(f[j], f[j - v[i][k]] + w[i][k])
print(10 * f[n])


