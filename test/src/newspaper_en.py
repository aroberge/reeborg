# solution to Newspaper 1, 2
think(0)

def turn_around():
    repeat(turn_left, 2)

def turn_right():
    repeat(turn_left, 3)

def up():
    turn_left()
    move()
    turn_right()
    move()
    move()

def down():
    move()
    move()
    turn_left()
    move()
    turn_right()

take()
while not object_here():
    up()
while object_here():
    take()
put("star")
turn_around()
while not at_goal():
    down()

