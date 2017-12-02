World("/worlds/storm3.json")
think(0)
def turn_around():
    turn_left()
    turn_left()

def turn_right():
    turn_around()
    turn_left()

def take_all():
    while object_here():
        take()

def clean_row():
    take_all()
    while front_is_clear():
        move()
        take_all()
        
def go_back():
    turn_around()
    while front_is_clear():
        move()
        
clean_row()
turn_left()
clean_row()
turn_left()
clean_row()
turn_left()
move()
turn_left()

while right_is_clear():
    clean_row()
    go_back()
    turn_left()
    if front_is_clear():
        move()
    turn_left()

clean_row()
go_back()
turn_around()
move()
turn_right()
move()
turn_left()
clean_row()


# at end of 2nd row
turn_left()
while front_is_clear():
    move()
turn_right()

while right_is_clear():
    turn_right()
    move()
    turn_right()
    clean_row()
    if at_goal():
        break
    go_back()


turn_right()
#move()
while carries_object():
    toss()
#turn_around()
#move()
#turn_around()
build_wall()

    

    


    


        


