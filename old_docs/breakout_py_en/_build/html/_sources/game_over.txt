Game over!
==========

Our game is far from being done ... but, as you know, real games do
end and it is time for us to see if we can include an ending.

.. topic:: Do it!

    Write a function called ``game_over``.  It must pause the game,
    write "Game over!" in big red letters on the screen.

    The game must be over if the ball misses the paddle and would
    bounce off the bottom of the canvas.  Do not delete any code;
    instead, comment-out (by writing "#" at the beginning of a line)
    any code that you no longer need.
    
    Note that you will likely need to move a ``clear_screen()``
    call to a different place inside ``update()``.

Debugging a game
----------------

It is sometimes useful to change the behaviour or the apparence
of a game to help find bugs.  For example, as mentioned before,
you could write the value of one or more variables on the screen
at each frame to see if they take the value that you need.
For example, we can show the value of ``fps`` by including 
the following function::

    def show_fps():
        ctx.font = "15px sans-serif"
        ctx.fillStyle = "black"
        ctx.fillText("FPS: %d" % fps, 300, 15)

and calling it at the appropriate time.  Furthermore,
it might be useful to change the value of ``fps`` without
having to edit the code.  To do so, we can use the **up** and
**down** arrow keys to either increase or decrease the value
of ``fps``.

Finally, having the ball bounce from the bottom of the screen, without
having to worry about moving the paddle, can be useful when
testing some other things, like "breaking bricks" which we will
soon be able to do.  This is why I've used a variable named
``DEBUG`` in my code as you will see if you click on the 
hint below.  I thought it was time to do a recap and show you
the entire code.   Before you click on it, you might
want to implement in your code the changes I just mentioned 
and test them.

.. hint::

    .. code-block:: py3

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

            def draw(self):
                ctx.fillStyle = self.color
                ctx.beginPath()
                ctx.arc(self.x, self.y, self.radius, 0, pi*2)
                ctx.closePath()
                ctx.fill()

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

            def move(self):
                self.x += self.dx

            def stay_in_world(self):
                if self.x < 0:
                    self.x = 0
                elif self.x + self.width > canvas.width:
                    self.x = canvas.width - self.width
                self.calculate_bounding_box()

            def calculate_bounding_box(self):
                self.x_min = self.x
                self.y_min = self.y
                self.x_max = self.x + self.width
                self.y_max = self.y + self.height


        def start_animation():
            global ball, paddle
            ball = Ball(10, 10)
            paddle = Paddle(100, canvas.height-20)
            update()

        def update():
            global ball, paddle, frame_id
            clear_screen()
            ball.move()
            ball.stay_in_world()
            write_help()
            show_fps()
            if ball.overlaps_with(paddle) and ball.dy > 0:
                ball.y -= ball.dy
                ball.dy = - ball.dy
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

        def handle_keydown_events(ev):
            global pause, frame_id
            remind = True
            if ev.keyCode == 37:   # left arrow
                remind = False
                paddle.dx = - abs(paddle.dx)
                paddle.move()
                paddle.stay_in_world()
            if ev.keyCode == 38:   # up arrow
                change_fps(3)
                remind = False
            if ev.keyCode == 39:   # right arrow
                remind = False
                paddle.dx = abs(paddle.dx)
                paddle.move()
                paddle.stay_in_world()
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
                start_animation()
            ev.preventDefault()
            if remind:
                notify("red")

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
        fps = 20                          
        time_between_frames = 1000/fps   
        DEBUG = True

        doc.bind("keydown", handle_keydown_events)
        clear_screen()
        write_help()

Compare my code with yours and make sure you understand what
any difference there may be between the two.  Even though there
are almost no comments in the code above, you should be 
sufficiently familiar with it to understand what every single line does.

Be critical!
------------

When I read my version of the code, I see many things that should be
changed.  I want you to take the time to go over the code and
make a list of things that you believe should be changed.
Go over the entire code more than once as you may find more
things if you do so.  When you are done, go to the next
page of this tutorial where I will go over the things I find questionable
and fix a few of them.