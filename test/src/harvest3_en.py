# solution to Harvest 3
think(0)

def reseed_one_row():
    for i in range(6):
        while object_here("carrot"):
            take()
        put()
        move()
# go to first row
repeat(move, 2)
turn_left()
repeat(move, 2)
repeat(turn_left, 3)
for j in range(3):
    reseed_one_row()
    turn_left()
    move()
    turn_left()
    move()
    reseed_one_row()
    repeat(turn_left, 3)
    move()
    repeat(turn_left, 3)
    move()

