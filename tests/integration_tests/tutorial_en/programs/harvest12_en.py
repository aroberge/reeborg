# solution to Harvest 1 and 2
think(0)

def pick_one_row():
    for i in range(6):
        while object_here("carrot"):
            take("carrot")
        move()
# go to first row
repeat 2:
    move()
turn_left()
repeat 2:
    move()
repeat 3:
    turn_left()
for j in range(3):
    pick_one_row()
    turn_left()
    move()
    turn_left()
    move()
    pick_one_row()
    repeat 3:
        turn_left()
    move()
    repeat 3:
        turn_left()
    move()

