Bouncing differently
====================

    def update():
        ball.handle_hit_with(paddle)
        for brick in bricks:
            if brick.is_hittable and ball.overlaps_with(brick):
                ball.handle_hit_with(brick)
                brick.handle_hit_with(ball)


    class Ball(object):


        def handle_hit_with(self, other):
            if isinstance(other, Paddle) and self.dy > 0:
                self.y -= self.dy
                self.dy = -self.dy
                offset = self.x - (paddle.x + paddle.width/2)
                self.dx = 10*offset/paddle.width
            elif isinstance(other, Brick):
                self.y -= self.dy
                self.dy = -self.dy


    class Brick(object):
        
        def __init__(self, x, y, width=60, height=30, color="green"):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.calculate_bounding_box()
            self.is_hittable = True
            self.is_visible = True
        
        def calculate_bounding_box(self):
            self.x_min = self.x
            self.y_min = self.y
            self.x_max = self.x + self.width
            self.y_max = self.y + self.height
            
        def draw(self):
            if self.is_visible:
                ctx.fillStyle = self.color
                ctx.fillRect(self.x, self.y, self.width, self.height)

        def handle_hit_with(self, other):
            if isinstance(other, Ball):
                self.is_visible = False
                self.is_hittable = False