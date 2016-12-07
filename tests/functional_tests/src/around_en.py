# General solution to worlds Around 1 to 4
think(0)

def turn_right():
    repeat 3:
        turn_left()

def follow_right_wall():
    if right_is_clear():
        turn_right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()

put()
while wall_in_front():
    turn_left()
move()

while not object_here():
    follow_right_wall()
