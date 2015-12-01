# General solution to hurdle worlds
think(0)

def turn_right():
    repeat 3:
        turn_left()

def follow_right_wall():
    if right_is_clear():
        turn_right()
        move()
    # let's use two equivalent tests
    elif front_is_clear() and not wall_in_front():
        move()
    else:
        turn_left()

while not at_goal():
    follow_right_wall()
