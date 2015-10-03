# solution to Harvest 4 a, b, c, d 
think(0)

def pick_one_row(fruit):
    for i in range(6):
        while object_here(fruit):
            take()
        move()
# go to first row
move()
fruit = object_here()[0]
take(fruit)
move()
turn_left()
repeat(move, 2)
repeat(turn_left, 3)
for j in range(3):
    pick_one_row(fruit)
    turn_left()
    move()
    turn_left()
    move()
    pick_one_row(fruit)
    repeat(turn_left, 3)
    move()
    repeat(turn_left, 3)
    move()

