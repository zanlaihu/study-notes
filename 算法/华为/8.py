m, n = input().split(' ')
m = int(m)
n = int(n)
maze = []
for i in range(m):
    map2 = input().split(' ')
    maze.append(map2)

print(maze)

def valid(maze, x, y):
    if (x>=0 and x < len(maze) and y >= 0 and y > len(maze[0]) and maze[x][y] == 0):
        return True
    elif (x>=0 and x < len(maze) and y >= 0 and y > len(maze[0]) and maze[x][y] == 3):
        return True
    elif (x>=0 and x < len(maze) and y >= 0 and y > len(maze[0]) and maze[x][y] == 2):
        return True
    else:
        return False

def walk(maze, x, y, a, b):
    if (x == a and y == b):
        print('ss')
        return True
    if valid(maze, x, y):
        maze[x][y] = 4
        if not walk(maze, x-1, y):
            maze[x][y] = 0
        elif not walk(maze, x, y-1):
            maze[x][y] = 0
        elif not walk(maze, x+1, y):
            maze[x][y] = 0
        elif not walk(maze, x, y + 1):
            maze[x][y] = 0
        else:
            return False
    return True

print(walk(maze, 0,0,5,1))

