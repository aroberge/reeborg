# solution to Harvest 1
think(0)

def pick_one_row():
    for i in range(6):
        take("carrot")
        move()
# go to first row
repeat(move, 2)
turn_left()
repeat(move, 2)
repeat(turn_left, 3)
for j in range(3):
    pick_one_row()
    turn_left()
    move()
    turn_left()
    move()
    pick_one_row()
    repeat(turn_left, 3)
    move()
    repeat(turn_left, 3)
    move()

