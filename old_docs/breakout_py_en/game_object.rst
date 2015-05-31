The Game object
===============

Here is the entire code we have so far::

    from math import pi
    from browser import doc
    from browser.timer import set_timeout, clear_timeout


    class Ball(object):
        def __init__(self, x, y, radius=10, color='red', dx=5, dy=5):
            self.x = x
            self.y = y
            self.radius = radius
            self.color = color
            self.dx = dx
            self.dy = dy
            self.speed = (self.dx**2 + self.dy**2)**0.5

        def draw(self):
            ctx.fillStyle = self.color
            ctx.beginPath()
            ctx.arc(self.x, self.y, self.radius, 0, pi*2)
            ctx.closePath()
            ctx.fill()

        def update(self):
            self.move()
            self.stay_in_world()

        def move(self):
            self.x += self.dx
            self.y += self.dy

        def stay_in_world(self):
            if self.x < self.radius and self.dx < 0:
                self.dx = -self.dx
                self.x = 2*self.radius - self.x
            elif self.x > canvas.width - self.radius and self.dx > 0:
                self.dx = -self.dx
                self.x = 2*(canvas.width - self.radius) - self.x
            if self.y < self.radius and self.dy < 0:
                self.dy = -self.dy
                self.y = 2*self.radius - self.y
            elif self.y > canvas.height - self.radius and self.dy > 0:
                if DEBUG:
                    self.dy = -self.dy
                    self.y = 2*(canvas.height - self.radius) - self.y
                else:
                    game_over()

        def overlaps_with(self, other):
            return ( ((self.x - self.radius  < other.x_min < self.x + self.radius) or
                     (other.x_min < self.x - self.radius  < other.x_max))
                and ((self.y - self.radius  < other.y_min < self.y + self.radius) or
                     (other.y_min < self.y - self.radius  < other.y_max)) )

        def reverse_vertical_motion(self):
            self.y -= self.dy
            self.dy = - self.dy

        def reverse_horizontal_motion(self):
            self.x -= self.dx
            self.dx = - self.dx  

        def handle_hit_with_paddle(self, paddle):
            if self.dy < 0:
                return
            self.reverse_vertical_motion()
            offset = self.x - (paddle.x + paddle.width/2)
            self.dx = 10*offset/paddle.width
            # rescale the speed to keep it constant
            speed = (self.dx**2 + self.dy**2)**0.5
            self.dx *= (self.speed/speed)
            self.dy *= (self.speed/speed)
            self.speed = speed

        def handle_hit_with_brick(self, brick):
            self.reverse_vertical_motion()
            if self.overlaps_with(brick):
                self.reverse_vertical_motion()
                self.reverse_horizontal_motion()
                if self.overlaps_with(brick):
                    self.reverse_vertical_motion()


    class Brick(object):
        def __init__(self, x, y, width=60, height=30, color="green"):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.calculate_bounding_box()
            self.is_visible = True

        def calculate_bounding_box(self):
            self.x_min = self.x
            self.y_min = self.y
            self.x_max = self.x + self.width
            self.y_max = self.y + self.height

        def draw(self):
            if not self.is_visible:
                return
            ctx.fillStyle = self.color
            ctx.fillRect(self.x, self.y, self.width, self.height)

        def handle_hit_with_ball(self):
            self.is_visible = False
            self.x_min = self.x_max = self.y_min = self.y_max = -1


    class Paddle(object):
        def __init__(self, x, y, width=80, height=10, color="blue", dx=7):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.dx = dx
            self.calculate_bounding_box()

        def draw(self):
            ctx.fillStyle = self.color
            ctx.fillRect(self.x, self.y, self.width, self.height)

        def move(self, direction):
            if direction == "left":
                self.dx = - abs(self.dx)
            elif direction == "right":
                self.dx = abs(self.dx)
            self.x += self.dx
            self.stay_in_world()
            return False

        def stay_in_world(self):
            if self.x < 0:
                self.x = 0
            elif self.x + self.width > canvas.width:
                self.x = canvas.width - self.width
            self.calculate_bounding_box()

        def mouse_move(self, ev):
            x, y = get_mouse_position(ev, canvas)
            self.x = x
            self.stay_in_world()

        def calculate_bounding_box(self):
            self.x_min = self.x
            self.y_min = self.y
            self.x_max = self.x + self.width
            self.y_max = self.y + self.height


    def start_animation():
        global ball, bricks, paddle
        ball = Ball(10, canvas.height-30, dy=-5)
        paddle = Paddle(100, canvas.height-20)
        doc.bind("mousemove", paddle.mouse_move)
        bricks = [Brick(x, y) for x in range(30, 500, 90) for y in range(100, 350, 50)]
        update()

    def update():
        global frame_id
        clear_screen()
        ball.update()
        write_help()
        show_fps()
        if ball.overlaps_with(paddle):
            ball.handle_hit_with_paddle(paddle)
        for brick in bricks:
            if ball.overlaps_with(brick):
                ball.handle_hit_with_brick(brick)
                brick.handle_hit_with_ball()
            brick.draw()
        ball.draw()
        paddle.draw()
        if pause:
            return
        frame_id = set_timeout(update, time_between_frames)

    def clear_screen():
        ctx.clearRect(0, 0, canvas.width, canvas.height)

    def change_fps(increment):
        global fps, time_between_frames
        fps += increment
        if fps < 1:
            fps = 1
        time_between_frames = 1000/fps
        return False

    def handle_keydown_events(ev):
        global pause, frame_id
        remind = True
        if ev.keyCode == 37 and DEBUG:   # left arrow
            remind = paddle.move("left")
        if ev.keyCode == 38:   # up arrow
            remind = change_fps(3)
            remind = False
        if ev.keyCode == 39 and DEBUG:   # right arrow
            remind = paddle.move("right")
        if ev.keyCode == 40:   # down arrow
            change_fps(-3)
            remind = False
        if ev.keyCode == 80:  # p or P for Pause
            remind = False
            pause = True
            if frame_id is not None:
                clear_timeout(frame_id)
        elif ev.keyCode == 81:  # q or Q  for Quit
            remind = False
            doc.unbind("keydown")
            canvas.style.cursor = "default"
            clear_screen()
            pause = True
            if frame_id is not None:
                clear_timeout(frame_id)
        elif ev.keyCode == 82 and pause:  # r or R for Resume
            remind = False
            pause = False
            update()
        elif ev.keyCode == 83 and pause:  # s or S for Start
            remind = False
            pause = False
            canvas.style.cursor = "none"
            start_animation()
        ev.preventDefault()
        if remind:
            notify("red")

    def get_mouse_position(ev, canvas):
        bound = canvas.getBoundingClientRect()  
        x = ev.clientX - bound.left
        y = ev.clientY - bound.top
        return x, y

    def write_help():
        ctx.font = "30px sans-serif"
        ctx.fillStyle = "lightgrey"
        ctx.fillText("S to start the animation", 50, 100)
        ctx.fillText("P to pause the animation", 50, 150)
        ctx.fillText("R to resume after a pause", 50, 200)
        ctx.fillText("Q to quit: click BEFORE editing!", 50, 250)

    def game_over():
        global pause
        pause = True
        ctx.font = "100px sans-serif"
        ctx.fillStyle = "red"
        ctx.fillText("Game over!", 50, 300)

    def show_fps():
        ctx.font = "15px sans-serif"
        ctx.fillStyle = "black"
        ctx.fillText("FPS: %d" % fps, 300, 15)

    # end of function definitions

    canvas = doc["game-canvas"]
    ctx = canvas.getContext('2d')
    frame_id = None
    pause = True
    fps = 60                          
    time_between_frames = 1000/fps   
    DEBUG = True

    doc.bind("keydown", handle_keydown_events)
    clear_screen()
    write_help()

We have many explicit global variables (``ball``, ``bricks``, ``paddle``, ``frame_id``, 
``fps``, ``time_between_frames``, ``pause``) and some implicit global variables
(``canvas``, ``ctx``, ``DEBUG``).  Ideally, our code should have no explicit global
variables and, if possible, no implicit global variables either.  

At the end of the code, we have a series of statements that are not part of any function.
These statements are executed at first; perhaps we can regroup (most of) them inside an ``init``
function or method that we could call first.  Let's imagine we have done that and look at what
happens when we execute the program.

First, ``init()`` would be called.   Upon the appropriate keyboard event (pressing ``s``), 
the function ``start_animation()`` would be called, followed by ``update()`` which would 
call itself repeatedly: this is our **game loop**.  So, instead of using the name ``update``
let's rename it ``loop`` and, with the exception of the code that is already in the classes
``Ball``, ``Brick`` and ``Paddle``, let's put all the code in a new class: ``Game``, as follows::

    class Game(object):
        def __init__(self):
            global canvas, ctx, get_mouse_position
            self.canvas = doc["game-canvas"]
            self.ctx = self.canvas.getContext('2d')
            self.frame_id = None
            self.pause = True
            self.fps = 60                          
            self.time_between_frames = 1000/self.fps   

            doc.bind("keydown", self.handle_keydown_events)
            self.clear_screen()
            self.write_help()
            #
            canvas = self.canvas
            ctx = self.ctx
            get_mouse_position = self.get_mouse_position

        def start_animation(self):
            self.ball = Ball(10, self.canvas.height-30, dy=-5)
            self.paddle = Paddle(100, self.canvas.height-20)
            doc.bind("mousemove", self.paddle.mouse_move)
            self.bricks = [Brick(x, y) for x in range(30, 500, 90) 
                                       for y in range(100, 350, 50)]
            self.loop()

        def loop(self):
            self.clear_screen()
            self.write_help()
            self.ball.update()
            self.show_fps()
            if self.ball.overlaps_with(self.paddle):
                self.ball.handle_hit_with_paddle(self.paddle)
            for brick in self.bricks:
                if self.ball.overlaps_with(brick):
                    self.ball.handle_hit_with_brick(brick)
                    brick.handle_hit_with_ball()
                brick.draw()
            self.ball.draw()
            self.paddle.draw()
            if self.pause:
                return
            self.frame_id = set_timeout(self.loop, self.time_between_frames)

        def get_mouse_position(self, ev):
            bound = self.canvas.getBoundingClientRect()  
            x = ev.clientX - bound.left
            y = ev.clientY - bound.top
            return x, y        

        def write_help(self):
            self.ctx.font = "30px sans-serif"
            self.ctx.fillStyle = "lightgrey"
            self.ctx.fillText("S to start the animation", 50, 100)
            self.ctx.fillText("P to pause the animation", 50, 150)
            self.ctx.fillText("R to resume after a pause", 50, 200)
            self.ctx.fillText("Q to quit: click BEFORE editing!", 50, 250)

        def game_over(self):
            self.pause = True
            self.ctx.font = "100px sans-serif"
            self.ctx.fillStyle = "red"
            self.ctx.fillText("Game over!", 50, 300)

        def show_fps(self):
            self.ctx.font = "15px sans-serif"
            self.ctx.fillStyle = "black"
            self.ctx.fillText("FPS: %d" % self.fps, 300, 15)

        def clear_screen(self):
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)

        def change_fps(self, increment):
            self.fps += increment
            if self.fps < 1:
                self.fps = 1
            self.time_between_frames = 1000/self.fps
            return False

        def handle_keydown_events(self, ev):
            remind = True
            if ev.keyCode == 37 and DEBUG:   # left arrow
                remind = self.paddle.move("left")
            if ev.keyCode == 38:   # up arrow
                remind = self.change_fps(3)
                remind = False
            if ev.keyCode == 39 and DEBUG:   # right arrow
                remind = self.paddle.move("right")
            if ev.keyCode == 40:   # down arrow
                self.change_fps(-3)
                remind = False
            if ev.keyCode == 80:  # p or P for Pause
                remind = False
                self.pause = True
                if self.frame_id is not None:
                    clear_timeout(self.frame_id)
            if ev.keyCode == 81:  # q or Q  for Quit
                remind = False
                doc.unbind("keydown")
                self.canvas.style.cursor = "default"
                self.clear_screen()
                self.pause = True
                if self.frame_id is not None:
                    clear_timeout(self.frame_id)
            if ev.keyCode == 82 and self.pause:  # r or R for Resume
                remind = False
                self.pause = False
                self.loop()
            if ev.keyCode == 83 and self.pause:  # s or S for Start
                remind = False
                self.pause = False
                self.canvas.style.cursor = "none"
                self.start_animation()
            ev.preventDefault()
            if remind:
                notify("red")    

    DEBUG = False
    game = Game()


Also, I replaced the following line in the ``Paddle`` class::

    x, y = get_mouse_position(ev, canvas)

by this::

    x, y = get_mouse_position(ev)

Finally, inside the ``stay_in_world`` of the ``Ball`` class, you need
to replace::

    if DEBUG:
        self.dy = -self.dy
        self.y = 2*(canvas.height - self.radius) - self.y
    else:
        game_over()

by::

    if DEBUG:
        self.dy = -self.dy
        self.y = 2*(canvas.height - self.radius) - self.y
    else:
        game.game_over()



.. important::

   I have changed the **implicit** global variables ``canvas``, ``ctx`` and global
   function ``get_mouse_position`` into explicit variables or function.

.. important::

    The editor included in the game world environment is not the best programming
    environment.  It might be difficult (and frustrating) to get everything right.
    I suggest you compare the code above with what you have and, when you are satisfied
    that you understand everything, simply cut-and-paste the above code as a replacement
    for your own code.
    
What have we gained?
--------------------

You might wonder why we have done all these changes... It may seem that all we
did was indent a whole bunch of code by four more spaces (turning functions into
methods of a class), add **many** extra ``self.`` and thus making almost
every line of code longer ...

However, the code we have now is, believe it or not, more manageable.  We have
eliminated many global variables and identify clearly two, ``canvas`` and ``ctx``
which were previously implicit global variables.  Let's see how we can make
use of this ...

