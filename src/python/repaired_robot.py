class RepairedRobot(UsedRobot):

    def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
        super().__init__(x=x, y=y, orientation=orientation, tokens=tokens)
        self.body._is_leaky = leaky

    def turn_right(self, no_frame=False):
        self.body._prev_orientation = self.body._orientation
        self.body._prev_x = self.body.x
        self.body._prev_y = self.body.y
        self.body._prev_orientation += 2
        self.body._prev_orientation %= 4
        self.body._orientation += 3
        self.body._orientation %= 4
        if no_frame: return
        RUR.record_frame()

    def turn_around(self):
        self.body._prev_orientation = self.body._orientation + 1
        self.body._prev_orientation %= 4
        self.body._prev_x = self.body.x
        self.body._prev_y = self.body.y
        self.body._orientation += 2
        self.body._orientation %= 4
        RUR.record_frame()

    def is_facing_south(self):
        return self.body._orientation == RUR.SOUTH

    def is_facing_east(self):
        return self.body._orientation == RUR.EAST

    def is_facing_west(self):
        return self.body._orientation == RUR.WEST

    def face_south(self):
        self.body._orientation = RUR.SOUTH
        self.body._prev_orientation = self.body._orientation
        RUR.record_frame()

    def face_east(self):
        self.body._orientation = RUR.EAST
        self.body._prev_orientation = self.body._orientation
        RUR.record_frame()

    def face_north(self):
        self.body._orientation = RUR.NORTH
        self.body._prev_orientation = self.body._orientation
        RUR.record_frame()

    def face_west(self):
        self.body._orientation = RUR.WEST
        self.body._prev_orientation = self.body._orientation
        RUR.record_frame()

    def left_is_clear(self):
        self.turn_left(True)
        result = self.front_is_clear(True)
        self.turn_right(True)
        return result

