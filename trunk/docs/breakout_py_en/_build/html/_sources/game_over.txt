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

Debugging a game
----------------

It is sometimes useful to change the behaviour or the apparence
of a game to help find bugs.  For example, as mentioned before,
you could write the value of one or more variables on the screen
at each frame to see if they take the value that you need.

Having the ball bounce from the bottom of the screen, without
having to worry about moving the paddle, can be useful when
testing some other things, like "breaking bricks" which we will
soon be able to do.  This is why I've used a variable named
``DEBUG`` in my code as you will see if you click on the 
hint below.  I thought it was time to do a recap and show you
the entire code including both the code in the Library and the
other editor, but without specifying what is where.

.. hint::

    .. code-block:: py3

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
                ctx.fillStyle = "blue"
                ctx.fillRect(self.x, self.y, self.width, self.height)

            def move(self):
                self.x += self.dx
                self.calculate_bounding_box()

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
            
        def handle_keydown_events(ev):
            global pause, _id
            if ev.keyCode == 37:   # left arrow
                paddle.dx = - abs(paddle.dx)
                paddle.move()
                keep_paddle_in()
            if ev.keyCode == 39:   # right arrow
                paddle.dx = abs(paddle.dx)
                paddle.move()
                keep_paddle_in()
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
            if ball.overlaps_with(paddle) and ball.dy > 0:
                ball.y -= ball.dy
                ball.dy = - ball.dy
            ball.draw()
            paddle.draw()
            if pause:
                return
            _id = set_timeout(update, tbf)
               
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

        
        #---------------
        DEBUG = True
        pause = True
        fps = 60      
        tbf = 1000/fps    # time between frames in ms

        ball = Ball(10, 10)
        paddle = Paddle(100, canvas.height-20)
        clear_screen()
        write_help()

Compare my code with yours and make sure you understand what
any difference there may be between the two.  Even though there
are almost no comments in the code above, you should be 
sufficiently familiar with it to understand what every single line does.