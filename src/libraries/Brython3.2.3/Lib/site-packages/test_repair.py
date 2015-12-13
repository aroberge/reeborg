# test meant to be used as final part of OOP tutorial

from library import RepairedRobot
from browser import window
RUR = window.RUR

def test():
    fixed = RepairedRobot()
    leaky_1 = RepairedRobot(5, 5, leaky=True)

    for i in range(4):
        leaky_1.move()
        leaky_1.turn_right()

    leaky_1.face_north()
    assert leaky_1.body.orientation == RUR.NORTH
    if not leaky_1.is_facing_north():
        raise ReeborgError("Problem with facing North")

    leaky_1.face_east()
    assert leaky_1.body.orientation == RUR.EAST
    if not leaky_1.is_facing_east():
        raise ReeborgError("Problem with facing East")

    leaky_1.face_south()
    assert leaky_1.body.orientation == RUR.SOUTH
    if not leaky_1.is_facing_south():
        raise ReeborgError("Problem with facing South")

    leaky_1.face_west()
    assert leaky_1.body.orientation == RUR.WEST
    if not leaky_1.is_facing_west():
        raise ReeborgError("Problem with facing West")

    if fixed.left_is_clear():
        fixed.turn_left()
        fixed.move()

    fixed.turn_around()
    fixed.move()

