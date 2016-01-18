# solution to Harvest 3
think(0)

def reseed_one_row():
    for i in range(6):
        while object_here("carrot"):
            take()
        put()
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
    reseed_one_row()
    turn_left()
    move()
    turn_left()
    move()
    reseed_one_row()
    repeat 3:
        turn_left()
    move()
    repeat 3:
        turn_left()
    move()

