# Simple program to test walls

reeborg = UsedRobot(3, 3, "east")

RUR.add_wall("east", 6, 3)
while reeborg.front_is_clear():
    reeborg.move()
RUR.remove_wall("east", 6, 3)
reeborg.move()
assert reeborg.body.x == 7
