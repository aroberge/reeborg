Rule #6
=======

I've implemented the changes mentioned previously, moved
a few functions around resulting in the following::

    from browser import doc
    from math import pi
    from browser.timer import set_timeout, clear_timeout

    canvas = doc["game-canvas"]
    ctx = canvas.getContext('2d')

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
        
        def handle_hit_with(self, other):
            if other == "paddle" and self.dy > 0:
                self.y -= self.dy
                self.dy = -self.dy
            elif other == "brick":
                self.y -= self.dy
                self.dy = -self.dy
                
        def overlaps_with(self, other):
            if (    ((self.x - self.radius  < other.x_min < self.x + self.radius) or 
                     (other.x_min < self.x - self.radius  < other.x_max))
                and ((self.y - self.radius  < other.y_min < self.y + self.radius) or 
                     (other.y_min < self.y - self.radius  < other.y_max)) ):
                return True
            return False 
            
        
    class Paddle(object):
        
        def __init__(self, x, y, width=80, height=10, color="blue", dx=7):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.dx = dx
            self.calculate_bounding_box()
        
        def calculate_bounding_box(self):
            self.x_min = self.x
            self.y_min = self.y
            self.x_max = self.x + self.width
            self.y_max = self.y + self.height
            
        def draw(self):
            ctx.fillStyle = self.color
            ctx.fillRect(self.x, self.y, self.width, self.height)

        def move(self, direction):
            if direction == "left":
                self.dx = - abs(self.dx)
            elif direction == "right":
                self.dx = abs(self.dx)
            self.x += self.dx
            self.calculate_bounding_box()
            keep_paddle_in()
           
            
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
            if other == "ball":
                self.is_visible = False
                self.is_hittable = False

    def clear_screen():    
        ctx.clearRect(0, 0, canvas.width, canvas.height)
       
    def write_help():
        ctx.font = "30px sans-serif"
        ctx.fillStyle = "lightgrey"
        ctx.fillText("S to start the animation", 50, 100)
        ctx.fillText("P to pause the animation", 50, 150)
        ctx.fillText("Q to quit: click BEFORE editing!", 50, 200)

    def stay_in_world():
        if ball.x < ball.radius and ball.dx < 0:
            ball.dx = -ball.dx
            ball.x = 2*ball.radius - ball.x
        elif ball.x > canvas.width - ball.radius and ball.dx > 0:
            ball.dx = -ball.dx
            ball.x = 2*(canvas.width - ball.radius) - ball.x
        if ball.y < ball.radius and ball.dy < 0:
            ball.dy = -ball.dy
            ball.y = 2*ball.radius - ball.y
        elif ball.y > canvas.height - ball.radius and ball.dy > 0:
            if DEBUG:
                ball.dy = -ball.dy
                ball.y = 2*(canvas.height - ball.radius) - ball.y
            else:
                game_over()

    def keep_paddle_in():
        if paddle.x < 0:
            paddle.x = 0
        elif paddle.x + paddle.width > canvas.width:
            paddle.x = canvas.width - paddle.width

    def game_over():
        global pause
        pause = True
        ctx.font = "100px sans-serif"
        ctx.fillStyle = "red"
        ctx.fillText("Game over!", 50, 300)
                
                
    def handle_keydown_events(ev):
        global pause
        if ev.keyCode == 37:   # left arrow
            paddle.move("left")
        if ev.keyCode == 39:   # right arrow
            paddle.move("right")
        if ev.keyCode == 80:  # p or P for Pause
            pause = True
            clear_timeout(_id)
        elif ev.keyCode == 81:  # q or Q  for Quit
            doc.unbind("keydown")
            canvas.style.cursor = "default"
            clear_screen()
            pause = True
            clear_timeout(_id)
        elif ev.keyCode == 83 and pause: # s or S for Start
            pause = False
            canvas.style.cursor = "none"
            update()
        ev.preventDefault()

       
    doc.bind("keydown", handle_keydown_events)

    def update():
        global _id
        clear_screen()
        ball.move()
        stay_in_world()
        write_help()
        if ball.overlaps_with(paddle):
            ball.handle_hit_with("paddle")
        if brick.is_hittable and ball.overlaps_with(brick):
            ball.handle_hit_with("brick")
            brick.handle_hit_with("ball")
        brick.draw()
        ball.draw()
        paddle.draw()
        if pause:
            return
        _id = set_timeout(update, tbf)
           
            
    #---------------
    DEBUG = True
    pause = True
    fps = 60     
    tbf = 1000/fps   # time between frames in ms

    ball = Ball(10, 10)
    paddle = Paddle(100, canvas.height-20)
    brick = Brick(200, 200)
    clear_screen()
    write_help()

I'm not particularly fond of having ``keep_paddle_in`` as
a function and not a method of the ``Paddle`` class; the same
can be said for the function``stay_in_world`` which should
really be a method of the ``Ball`` class.  I will take care of
these later.

For now, before I introduce Rule #6, I want you to do the following:

.. topic:: Your turn

    Compare your code with mine; chances are, you are doing some things
    differently.  Determine on your own if your way is better than mine,
    or if mine is better than yours ... or if they are essentially
    comparable.

    Does your code do more than mine?...

DRY and YAGNI
-------------

The "Rules" I have given you are pretty much my own invention. 
However, Rule #3 is something that is known and is usually
described using the acronym DRY: Don't Repeat Yourself.  

There is another famous acronym in programming which I call
Rule #6

.. important::

    **Rule #6**: YAGNI

    You Aren't Going to Need It!

Only write the minimum amount of code to accomplish the task
at hand.  Avoid trying to write a general function or method
if a simple one based on the only thing you need to do at this
time is sufficient.

In this tutorial, I have tried to follow this rule as much as
possible (while keeping my end goal in mind), so as to give you
an idea of how to write programs.  One of the obstacles that
programmers face is being "paralyzed", not writing code because
they want to tackle too many things at once and are afraid of
making mistakes.  So, they spend a lot of time pondering about
the "next" step when, in fact, their so-called "next" step is
really something like a dozen different steps.  By breaking down
a task into its simplest element, aiming to have to write just
a few lines of code doing one thing, followed by a test to make
sure it works as intended, one can overcome the "paralysis".

However, in doing so, the code written is often not the best.
This is why it is useful to stop coding after implementing
some working code and review what has been done to see if
things could be rewritten better (i.e. more readable or
better organized) while making sure that nothing is broken 
in the process.

Speaking of things that are broken, I noticed that when
the ball hits the brick on one side (along a vertical edge
of the brick), the ball bounces up or down (because that's what
I coded) whereas it should really be bouncing either left or right,
away from the brick.

This is a bug.

I should fix it ... but I am **so close** to having a working game
that I will keep it like this for now.

I have also noted above that two functions should be rewritten
as methods (and I know that one of them should really be rewritten
to be easier to read...).  So I should note these "issues" before
moving on.

#. **Bug**: Ball always bounce either up or down when it should 
   sometimes bounce either left or right.
#. **Improvement needed**:  ``keep_paddle_in`` should be made a
   method of the ``Paddle`` class.
#. **Improvement needed**:  ``stay_in_world`` should be made a
   method of the ``Ball`` class ... and should be written so
   as to be easier to read; at the very least some comments
   should explain what is being done.