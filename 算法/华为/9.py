dirs = [(0,1),(1,0),(0,-1),(-1,0)]
def mark(maze, pos):
    maze[[pos[0]][pos[1]]] = 4

def valid(maze, pos):
    if maze[[pos[0]][pos[1]]] == 0:
        return True
    elif maze[[pos[0]][pos[1]]] == 2:
        return True
    elif maze[[pos[0]][pos[1]]] == 3:
        return True
    else:
        return False

def findpath(maze, pos, end):
    mark(maze,pos)
    if pos == end:
        return True
    for i in range(4):
        nextp = pos[0]+dirs[i][0],pos[1]+dirs[i][1]