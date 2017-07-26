think(0)
from library import turn_right, turn_around
def clear_row():
    while object_here():
        take()
    while front_is_clear():
        move()
        while object_here("leaf"):
            take()

def go_to_next_row():
    turn_left()
    move()
    turn_left()
    while not wall_in_front():
        move()
    turn_around()

while True:
    clear_row()
    try:
        go_to_next_row()
    except WallCollisionError:
        break
turn_around()
while front_is_clear():
    move()
turn_right()
while front_is_clear():
    move()
turn_right()

move()

while carries_object("leaf"):
    put("leaf")
turn_around()
move()
turn_around()
build_wall()
done()
