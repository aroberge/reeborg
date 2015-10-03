# solution to Rain 1, 2
think(0)

def turn_around():
    repeat(turn_left, 2)

def turn_right():
    repeat(turn_left, 3)

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
