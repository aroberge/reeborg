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

for i in range(2):
    clear_row()
    go_to_next_row()
clear_row()
turn_right()
while front_is_clear():
    move()
turn_right()

while not wall_in_front():
    move()
repeat(turn_left, 3)
move()
while carries_object("leaf"):
    put("leaf")
turn_around()
move()
turn_around()
build_wall()
done()
