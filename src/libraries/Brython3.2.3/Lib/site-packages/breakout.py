from math import pi
from traceback import print_exc
from browser import doc, html
from browser.timer import set_timeout, clear_timeout

levels = {
    1: '''.........
          .1.1.1.1.
          .........
          .1.1.1.1.
          .........
          .1.1.1.1.
          .........''',
    2: '''123123123123
          312312312312
          231231231231
          123123123123
          312312312312
          231231231231
          123123123123''',
    3: '''
          11112221111
          11111111111
          111..3..111
          111XXXXX111
          11111111111
          11111111111
          322X2X2X223'''
}


class MakeLevel(object):
    def __init__(self, ctx, area, send_msg=None):
        self.ctx = ctx
        self.area = area
        self.colors = ["grey", "green", "blue", "brown"]
        self.send_message = send_msg

    def new_level(self, n):
        bricks = []
        level = levels[n].split("\n")
        nb_rows = len(level)
        nb_cols = len(level[0].strip())
        for row in level:
            assert len(row.strip()) == nb_cols
        brick_width = (self.area["max_x"] - self.area["min_x"])/nb_cols
        brick_height = (self.area["max_y"] - self.area["min_y"])/nb_rows

        y = self.area["min_y"] - brick_height
        for row in level:
            row = row.strip()
            y += brick_height
            x = self.area["min_x"] - brick_width
            for brick in row:
                x += brick_width
                if brick == ".":
                    continue
                elif brick == "X":
                    bricks.append(Brick(x, y, width=brick_width,
                        height=brick_height, color=self.colors[0],
                        breakable=False, send_msg=self.send_message,
                        ctx=self.ctx))
                else:
                    bricks.append(Brick(x, y, width=brick_width,
                        height=brick_height, color=self.colors[int(brick)],
                        nb_hits=int(brick), send_msg=self.send_message,
                        ctx=self.ctx))
        return bricks


class Player(object):
    '''Simple class to keep track of player's lives'''
    def __init__(self, lives):
        self.lives = lives
        self.lost_life = False

    def get_lives(self):
        return self.lives

    def lose_ball(self):
        '''Determines what to do when ball is lost'''
        self.lives -= 1
        self.lost_life = True


class GameObject(object):
    '''A basic game object can draw and update itself'''
    def __init__(self):
        pass

    def draw(self):
        pass

    def update(self):
        pass


class Display(GameObject):
    '''Container for the various canvases used to draw the game'''
    def __init__(self):
        self.game_canvas = doc["game-canvas"]
        self.game_canvas_ctx = self.game_canvas.getContext('2d')
        self.width = self.game_canvas.width
        self.height = self.game_canvas.height

        main_canvas = doc["main-canvas"]
        self.main_canvas_ctx = main_canvas.getContext("2d")

        background_canvas = doc["background-canvas"]
        self.background_canvas_ctx = background_canvas.getContext("2d")

        far_background_canvas = doc["far-background-canvas"]
        self.far_background_canvas_ctx = far_background_canvas.getContext("2d")
        self.far_background_canvas_ctx.globalAlpha = 0.5  # making transparent
        self.far_background_image = html.IMG(src="src/images/code_background.png")

        # html canvas image loading workaround to ensure that image is available
        def on_load(*arg):
            self.draw_far_background()
        self.far_background_image.onload = on_load

    def clear_main(self):
        '''Clears main canvas: the one with moving objects'''
        self.main_canvas_ctx.clearRect(0, 0, self.width, self.height)

    def clear_game(self):
        '''Clears the game canvas: the one that is "clickable" and where
           the textual presentation is displayed as an overlay.'''
        self.game_canvas_ctx.clearRect(0, 0, self.width, self.height)

    def clear_background(self):
        '''Clears the background canvas: where the bricks are drawn'''
        self.background_canvas_ctx.clearRect(0, 0, self.width, self.height)

    def clear_far_background(self):
        '''Clears the far background: where the background image is drawn.'''
        self.far_background_canvas_ctx.clearRect(0, 0, self.width, self.height)

    def clear_all(self):
        '''Clears all the drawing canvases'''
        self.clear_main()
        self.clear_game()
        self.clear_background()
        self.clear_far_background()

    def draw(self):
        self.clear_main()

    def draw_far_background(self):
        '''Draws background image'''
        self.far_background_canvas_ctx.drawImage(self.far_background_image, 0, 0)


class GameInfo(GameObject):
    '''General information about the game shown to the player'''
    def __init__(self, ctx, width, height):
        self.ctx = ctx
        self.width = width
        self.height = height

    def show_game_over(self):
        self.ctx.font = "100px sans-serif"
        self.ctx.fillStyle = "red"
        self.ctx.fillText("Game over!", 50, 300)

    def show_game_win(self):
        self.ctx.font = "100px sans-serif"
        self.ctx.fillStyle = "green"
        self.ctx.fillText("You win!", 50, 300)

    def write_help(self):
        self.ctx.font = "30px sans-serif"
        self.ctx.fillStyle = "rgba(100, 100, 100, 0.6)"
        self.ctx.fillRect(0, 0, self.width, self.height)
        self.ctx.fillStyle = "blue"
        self.ctx.fillText("S to start the animation", 50, 100)
        self.ctx.fillText("P to pause the animation", 50, 150)
        self.ctx.fillText("Q to quit: click BEFORE editing!", 50, 200)


class Score(GameObject):
    '''Game score updated and drawn from this class'''
    def __init__(self, world=None, ctx=None, ball_color="red", get_lives=None):
        self.score = 0
        self.world = world
        self.ctx = ctx
        self.score_x = self.world["max_x"] - 50
        self.lives_x = 30
        self.get_lives = get_lives
        self.ball_color = ball_color
        self.ball_radius = 10
        self.baseline = 15

    def update(self, info=None):
        '''Updates the score based on information received'''
        if info is None:
            return

        if info == "ball hit paddle":
            self.score += 10
        elif info == "ball hit wall":
            self.score -= 10   # penalize slow play
        elif info == "ball hit brick":
            self.score += 100
        elif info == "break brick":
            self.score += 1000
        elif info == "win":
            self.score += 10000
        elif info == "lose ball":
            self.score -= 1000
        else:
            pass

    def draw(self):
        '''Draws the score on the screen, including graphical information about lives'''
        # prepare area for drawing
        self.ctx.clearRect(0, 0, self.world["max_x"], self.world["max_y"])
        self.ctx.fillStyle = "black"
        self.ctx.fillRect(0, 0, self.world["max_x"], self.world["max_y"])
        # draw score
        self.ctx.font = "15px sans-serif"
        self.ctx.fillStyle = "white"
        self.ctx.fillText(str(self.score), self.score_x, self.baseline)
        # draw lives
        self.ctx.fillStyle = self.ball_color
        for life in range(self.get_lives()):
            self.ctx.beginPath()
            self.ctx.arc(self.lives_x + life*4*self.ball_radius, self.baseline,
                         self.ball_radius, 0, pi*2)
            self.ctx.closePath()
            self.ctx.fill()


class Ball(GameObject):
    '''The basic object bounced by the player using a paddle.'''
    def __init__(self, x, y, radius=10, color='red', dx=5, dy=5,
                 send_msg=None, world=None, ctx=None):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.dx = dx
        self.dy = dy
        self.send_message = send_msg
        self.world = world
        self.ctx = ctx

        self.speed = (self.dx**2 + self.dy**2)**0.5
        self.max_speed = 2*self.speed
        self.calculate_bounding_box()

    def draw(self):
        '''Displays on the screen'''
        self.ctx.fillStyle = self.color
        self.ctx.beginPath()
        self.ctx.arc(self.x+self.radius, self.y+self.radius, self.radius, 0, pi*2)
        self.ctx.closePath()
        self.ctx.fill()

    def update(self):
        self.move()
        self.stay_in_world()

    def move(self):
        self.x += self.dx
        self.y += self.dy

    def calculate_bounding_box(self):
        self.x_min = self.x
        self.y_min = self.y
        self.x_max = self.x + 2*self.radius
        self.y_max = self.y + 2*self.radius

    def handle_hit_with(self, other):
        '''Determine what must be done to a ball when it hits either
           the self.paddle or a brick'''
        if isinstance(other, Paddle) and self.dy > 0:
            self.handle_hit_with_paddle(other)
        elif isinstance(other, Brick):
            self.handle_hit_with_brick(other)

    def handle_hit_with_paddle(self, paddle):
        self.reverse_vertical_move()
        offset = self.x - (paddle.x + paddle.width/2)
        self.dx = 10*offset/paddle.width
        speed = (self.dx**2 + self.dy**2)**0.5
        self.dx *= (self.speed/speed)
        self.dy *= (self.speed/speed)
        self.send_message("ball hit paddle")

    def reverse_vertical_move(self):
        self.y -= self.dy
        self.dy = -self.dy
        self.calculate_bounding_box()

    def reverse_horizontal_move(self):
        self.x -= self.dx
        self.dx = -self.dx
        self.calculate_bounding_box()

    def handle_hit_with_brick(self, brick):
        self.reverse_vertical_move()
        if self.overlaps_with(brick):  # horizontal hit?
            self.reverse_vertical_move()
            self.reverse_horizontal_move()
            if self.overlaps_with(brick):
                self.reverse_vertical_move()
        if self.speed < self.max_speed:
            self.speed *= 1.05
            self.dx *= 1.05
            self.dy *= 1.05
        self.send_message("ball hit brick")

    def overlaps_with(self, other):
        '''Determines if a Ball instance overlaps (collides) with another object'''
        return (((self.x_min < other.x_min < self.x_max)
                or (other.x_min < self.x_min < other.x_max))
                and ((self.y_min < other.y_min < self.y_max)
                or (other.y_min < self.y_min < other.y_max)))

    def stay_in_world(self):
        '''Ensures that the ball stays within the proper boundaries'''
        if self.x < self.world["min_x"] and self.dx < 0:
            self.dx = -self.dx
            self.x = 2*self.world["min_x"] - self.x
            self.send_message("hit wall")
        elif self.x > self.world["max_x"] - 2*self.radius and self.dx > 0:
            self.dx = -self.dx
            self.x = 2*(self.world["max_x"] - 2*self.radius) - self.x
            self.send_message("hit wall")
        if self.y < self.world["min_y"] and self.dy < 0:
            self.dy = -self.dy
            self.y = 2*self.world["min_y"] - self.y
            self.send_message("hit wall")
        elif self.y > self.world["max_y"] - 2*self.radius and self.dy > 0:
            if DEBUG:
                self.dy = -self.dy
                self.y = 2*(self.world["max_y"] - 2*self.radius) - self.y
            else:
                self.send_message("lose ball")
        self.calculate_bounding_box()


class Paddle(GameObject):

    def __init__(self, x, y, width=80, height=10, color="blue", dx=7,
                get_mouse_position=None, world=None, ctx=None):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = color
        self.dx = dx
        self.calculate_bounding_box()
        self.get_mouse_position = get_mouse_position
        self.world = world
        self.ctx = ctx

    def calculate_bounding_box(self):
        self.x_min = self.x
        self.y_min = self.y
        self.x_max = self.x + self.width
        self.y_max = self.y + self.height

    def draw(self):
        self.ctx.fillStyle = self.color
        self.ctx.fillRect(self.x, self.y, self.width, self.height)

    def move(self, direction):
        if direction == "left":
            self.dx = - abs(self.dx)
        elif direction == "right":
            self.dx = abs(self.dx)
        self.x += self.dx
        self.stay_in_world()
        return False

    def mouse_move(self, ev):
        x, y = self.get_mouse_position(ev)
        self.x = x
        self.stay_in_world()

    def stay_in_world(self):
        if self.x < self.world["min_x"]:
            self.x = self.world["min_x"]
        elif self.x + self.width > self.world["max_x"]:
            self.x = self.world["max_x"] - self.width
        self.calculate_bounding_box()


class Brick(GameObject):

    def __init__(self, x, y, width=60, height=30, color="green",
            breakable=True, nb_hits=1,
            send_msg=None, ctx=None):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = color
        self.is_breakable = breakable
        self.is_hittable = True
        self.is_visible = True
        self.nb_hits = nb_hits
        self.send_message = send_msg
        self.ctx = ctx
        self.calculate_bounding_box()

    def calculate_bounding_box(self):
        self.x_min = self.x
        self.y_min = self.y
        self.x_max = self.x + self.width
        self.y_max = self.y + self.height

    def draw(self):
        if self.is_visible:
            self.ctx.fillStyle = self.color
            self.ctx.fillRect(self.x, self.y, self.width, self.height)

    def handle_hit_with(self, other):
        if isinstance(other, Ball) and self.is_breakable and self.is_hittable:
            self.nb_hits -= 1
            if self.nb_hits == 0:
                self.is_visible = False
                self.is_hittable = False
                self.ctx.clearRect(self.x-1, self.y-1, self.width+2, self.height+2)
                self.send_message("break brick")


class Game(object):

    def __init__(self):
        self.pause = True
        self.fps = 30
        self.time_between_frames = 1000/self.fps   # time between frames in ms
        self.frame_id = None
        self.display = Display()

        score_height = 30
        self.top_display = {"min_x": 0, "min_y": 0,
            "max_x": self.display.width, "max_y": score_height}
        self.bottom_display = {"min_x": 0, "min_y": score_height,
            "max_x": self.display.width, "max_y": self.display.height}

        brick_area = {"min_x": 0, "min_y": score_height+100,
            "max_x": self.display.width, "max_y": self.display.height-200}
        self.make_level = MakeLevel(ctx=self.display.background_canvas_ctx,
                          area=brick_area, send_msg=self.receive_message)
        self.level = 1

        self.player = Player(lives=3)
        self.add_game_objects()
        #
        doc.bind("mousemove", self.paddle.mouse_move)
        doc.bind("keydown", self.handle_keydown_events)
        #
        self.display.clear_all()
        self.display.draw_far_background()
        self.info.write_help()

    def add_game_objects(self):
        self.objects = []
        self.ball = Ball(10, self.display.height-30, dy=-5,
                        send_msg=self.receive_message,
                        ctx=self.display.main_canvas_ctx,
                        world=self.bottom_display)
        self.objects.append(self.ball)
        if self.level == 1:
            self.paddle = Paddle(100, self.display.height-20,
                get_mouse_position=self.get_mouse_position,
                world=self.bottom_display, ctx=self.display.main_canvas_ctx)
        self.objects.append(self.paddle)
        self.bricks = self.make_level.new_level(self.level)
        self.objects.extend(self.bricks)
        if self.level == 1:
            self.info = GameInfo(self.display.game_canvas_ctx, self.display.width,
                             self.display.height)
        self.objects.append(self.info)
        if self.level == 1:
            self.score = Score(world=self.top_display,
                           ctx=self.display.main_canvas_ctx,
                           ball_color=self.ball.color,
                           get_lives=self.player.get_lives)
        self.objects.append(self.score)

    def receive_message(self, info):
        self.score.update(info)
        if info == "lose ball":
            self.player.lose_ball()
            self.play_sound("problem-sound")
        elif info == "ball hit paddle":
            self.play_sound("paddle-sound")
        elif info == "ball hit brick":
            self.play_sound("break-sound")

    def handle_collisions(self):
        self.next_level = True
        if self.ball.overlaps_with(self.paddle):
            self.ball.handle_hit_with(self.paddle)
        for brick in self.bricks:
            if brick.is_hittable:
                if brick.is_breakable:
                    self.next_level = False
                if self.ball.overlaps_with(brick):
                    self.ball.handle_hit_with(brick)
                    brick.handle_hit_with(self.ball)

    def next_frame(self):
        if self.next_level:
            self.pause = True
            self.level += 1
            if self.level > len(levels):
                self.info.show_game_win()
                self.play_sound("win-sound")
                return False
            self.add_game_objects()
            self.info.write_help()
            return False
        elif self.pause:
            self.info.write_help()
            if self.frame_id is not None:
                clear_timeout(self.frame_id)
            return False
        elif self.player.lost_life:
            if self.player.lives == 0:
                self.pause = True
                self.info.show_game_over()
                return False
            else:
                self.pause = True
                self.player.lost_life = False
                self.ball = Ball(10, self.display.height-30, dy=-5,
                    send_msg=self.receive_message,
                    ctx=self.display.main_canvas_ctx, world=self.bottom_display)
                self.objects[0] = self.ball
                return True
        else:
            return True

    def loop(self):
        '''The game loop is the heart of the program'''
        try:
            self.display.clear_main()
            for obj in self.objects:
                obj.update()
            self.handle_collisions()
            if self.next_frame():
                for obj in self.objects:
                    obj.draw()
                self.show_fps()
                self.frame_id = set_timeout(self.loop, self.time_between_frames)
        except:
            print_exc()
            notify("blue")

    def show_fps(self):
        ctx = self.display.main_canvas_ctx
        ctx.font = "15px sans-serif"
        ctx.fillStyle = "yellow"
        ctx.fillText("FPS: %d" % self.fps, 300, 15)

    def start(self):
        self.pause = False
        self.display.game_canvas.style.cursor = "none"
        self.display.clear_game()
        self.loop()

    def quit(self):
        doc.unbind("keydown")
        doc.unbind("mousemove")
        self.display.game_canvas.style.cursor = "default"
        self.display.clear_all()
        if self.frame_id is not None:
            clear_timeout(self.frame_id)

    def change_fps(self, increment):
        self.fps += increment
        if self.fps < 1:
            self.fps = 1
        self.time_between_frames = 1000/self.fps

    def handle_keydown_events(self, ev):
        remind = True
        if ev.keyCode == 37:   # left arrow
            remind = self.paddle.move("left")
        if ev.keyCode == 38:   # up arrow
            self.change_fps(3)
            remind = False
        if ev.keyCode == 39:   # right arrow
            remind = self.paddle.move("right")
        if ev.keyCode == 40:   # down arrow
            self.change_fps(-5)
            remind = False
        if ev.keyCode == 80:  # p or P for Pause
            self.pause = True
            remind = False
        elif ev.keyCode == 81:  # q or Q  for Quit
            self.quit()
            remind = False
        elif ev.keyCode == 83 and self.pause:  # s or S for Start
            self.start()
            remind = False
        ev.preventDefault()
        if remind:
            notify("red")

    def get_mouse_position(self, ev):
        bound = self.display.game_canvas.getBoundingClientRect()
        x = ev.clientX - bound.left
        y = ev.clientY - bound.top
        return x, y

    def play_sound(self, sound_id):
        current_sound = doc[sound_id]
        current_sound.load()
        current_sound.play()


if __name__ == "__main__":
    DEBUG = False
    game = Game()
