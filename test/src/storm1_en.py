think(0)
while front_is_clear():
    move()
    while object_here("leaf"):
        take("leaf")

turn_left()
turn_left()
while not wall_in_front():
    move()
repeat(turn_left, 3)
move()
while carries_object("leaf"):
    put("leaf")
turn_left()
turn_left()
move()
turn_left()
turn_left()
build_wall()
done()
