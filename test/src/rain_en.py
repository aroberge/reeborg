# solution to Rain 1, 2
think(0)

def turn_around():
    repeat 2:
        turn_left()

def turn_right():
    repeat 3:
        turn_left()

def identify_window():
    assert not wall_on_right()
    move()
    if right_is_clear():
        turn_around()
        move()
        turn_left()
        move()
    else:
        turn_around()
        move()
        turn_left()
        build_wall()
        turn_left()
        move()

while not at_goal():
    move()
turn_right()
move()
while not at_goal():
    if wall_in_front():
        turn_left()
    elif wall_on_right():
        move()
    else:
        identify_window()
