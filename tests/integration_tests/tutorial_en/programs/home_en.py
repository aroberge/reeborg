# Overkill - solution for Home 1 to 4

def right():
    turn_left()
    turn_left()
    turn_left()

def follow_wall():
    if right_is_clear():
        right()
        move()
    elif front_is_clear():
        move()
    else:
        turn_left()

while not at_goal():
    follow_wall()
