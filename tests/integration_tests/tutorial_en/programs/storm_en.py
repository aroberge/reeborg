# general Solution to storm worlds
think(0)
set_trace_style("thick")
def turn_around():
    turn_left()
    turn_left()

def turn_right():
    turn_around()
    turn_left()

def take_all():
    while object_here():
        take()

def pond_here():
    return (not front_is_clear()) and (not wall_in_front())

def go_around_pond():
    turn_left()
    move()
    turn_right()
    move()
    move()
    turn_right()
    move()
    turn_left()

def clean_row():
    take_all()
    if pond_here():
        go_around_pond()
    while front_is_clear():
        move()
        take_all()
        if pond_here():
            go_around_pond()
            take_all()
        
def go_back():
    turn_around()
    while front_is_clear():
        move()

def clean_first_two_rows_and_face_north()():
    clean_row()
    turn_left()
    move()
    turn_left()
    clean_row()
    turn_right()

def clean_two_rows_and_face_north(): # start facing north
    if not front_is_clear():  # at top
        return
    move()
    turn_left()  # special case for third row
    if front_is_clear():
        move()
    turn_around() # face east
    clean_row()
    turn_left()
    if not front_is_clear():
        turn_left()
        while front_is_clear():
            move()
    else:
        move()
        turn_left()
        clean_row()
    turn_right() # face north

clean_first_two_rows_and_face_north()
while front_is_clear():
    clean_two_rows_and_face_north()

turn_around()
while front_is_clear():
    move()  # above compost
while carries_object():
    toss()

turn_left()
move()
turn_right()
move()
move()
turn_right()
move()
