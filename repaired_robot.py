# 'import my_lib' in Python Code is required to use
# the code in this library. 
class RepairedRobot(UsedRobot):

    def __init__(self, x=1, y=1, orientation='e', tokens=0, leaky=False):
        super().__init__(x=x, y=y, orientation=orientation, tokens=tokens)
        self.body._is_leaky = leaky
        
    def turn_right(self, no_frame=False):
        self.body._prev_orientation = self.body.orientation
        self.body._prev_x = self.body.x
        self.body._prev_y = self.body.y
        self.body._prev_orientation += 2
        self.body._prev_orientation %= 4
        self.body.orientation += 3
        self.body.orientation %= 4
        if no_frame: return
        RUR.rec.record_frame()
        
    def turn_around(self):
        self.body._prev_orientation = self.body.orientation + 1
        self.body._prev_orientation %= 4
        self.body._prev_x = self.body.x
        self.body._prev_y = self.body.y
        self.body.orientation += 2
        self.body.orientation %= 4
        RUR.rec.record_frame

    def is_facing_south(self):
        return self.body.orientation == RUR.SOUTH
    
    def is_facing_east(self):
        return self.body.orientation == RUR.EAST
    
    def is_facing_west(self):
        return self.body.orientation == RUR.WEST  
    
    def face_south(self):
        self.body.orientation = RUR.SOUTH
        self.body._prev_orientation = self.body.orientation
        
    def face_east(self):
        self.body.orientation = RUR.EAST
        self.body._prev_orientation = self.body.orientation

    def face_north(self):
        self.body.orientation = RUR.NORTH
        self.body._prev_orientation = self.body.orientation
        
    def face_west(self):
        self.body.orientation = RUR.WEST
        self.body._prev_orientation = self.body.orientation

    def left_is_clear(self):
        self.turn_left(True)
        result = self.front_is_clear(True)
        self.turn_right(True)
        return result

