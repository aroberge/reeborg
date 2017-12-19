# Solution for maze

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

while not at_goal():
    follow_right_wall()
