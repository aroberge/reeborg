import my_lib
select_challenge("repaired")
think(0)

class TestRobot(RepairedRobot):
    def follow_left_wall(self):
        if self.left_is_clear():
            self.turn_left()
            self.move()
        elif self.front_is_clear():
            self.move()
        elif self.right_is_clear():
            self.turn_right()
        else:
            self.turn_around()      

    def follow_right_wall(self):
        if self.right_is_clear():
            self.turn_right()
            self.move()
        elif self.front_is_clear():
            self.move()
        elif self.left_is_clear():
            self.turn_left()
        else:
            self.turn_around()

reeborg = TestRobot(leaky=True)


while not reeborg.token_here():
    reeborg.follow_left_wall()

while not reeborg.object_here() == "star":
    reeborg.follow_right_wall()
reeborg.turn_left()

while not reeborg.object_here() == "triangle":
    reeborg.move()

reeborg.move()
reeborg.move()
reeborg.face_east()
reeborg.move()
reeborg.face_west()
reeborg.move()
reeborg.move()

while not reeborg.is_facing_south():
    reeborg.turn_left()
reeborg.move()
reeborg.turn_right()

while not reeborg.object_here() == "square":
    reeborg.move()

reeborg.face_north()
while not reeborg.at_goal():
    reeborg.move()