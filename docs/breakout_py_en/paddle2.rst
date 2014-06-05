Moving Paddle
=============

After thinking about the function names, I realized that a better, more descriptive name
for ``animate()`` would be ``handle_keydown_events()``.  Initially, the name ``animate()``
seemed to make sense but as I looked at the code more and thought about the next steps,
the new name seemed to make more sense.

We want to move the paddle.  Eventually, we will control it using the mouse, but
it might be easier to do it first using the keyboard since we already know how to
deal with keyboard events.  

Just like we introduced a ``Ball`` class, we should do the same and create a 
``Paddle`` class.

.. topic:: Your turn

    Replace the ``draw_paddle`` function a method call ``paddle.draw()`` with
    a proper ``paddle`` object defined.

When you have done the required change, click on the hint below to see the code
I have written for this.

.. hint::

    .. code-block:: py3
        :emphasize-lines: 8

        def update():
            global _id
            clear_screen()
            ball.move()
            stay_in_world()
            write_help()
            ball.draw()
            paddle.draw()
            if pause:
                return
            _id = set_timeout(update, tbf)

        class Paddle(object):
        
            def __init__(self, x, y, width=80, height=10, color="blue", dx=7):
                self.x = x
                self.y = y
                self.width = width
                self.height = height
                self.color = color
                self.dx = dx
                
            def draw(self):
                ctx.fillStyle = "blue"
                ctx.fillRect(self.x, self.y, self.width, self.height)

            def move(self):
                self.x += self.dx


        paddle = Paddle(100, canvas.height-20)

.. important::

    It is a good idea to review the code written regularly and to see
    if things still make sense, or if there isn't a better, more consistent
    way to organize the code.  

Looking at my code (and you should do the
same after reading this), I noticed that I initialized a ``Ball`` instance
inside the function ``start_animation()`` and a ``Paddle`` instance
outside this function.  After looking further at ``start_animation()`` 
I concluded that it made little sense to keep it. So, I removed it and
replace the call inside ``handle_key_events`` by a call to ``update()``.
I also moved the ``Paddle`` class definition to the Library.

Because I've mentioned **many** changes, I thought it would be useful to
give you an exact copy of the code I have so you can compare with yours.
First, the code in the Library::

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

    class Paddle(object):
        
        def __init__(self, x, y, width=80, height=10, color="blue", dx=7):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.dx = dx
            
        def draw(self):
            ctx.fillStyle = "blue"
            ctx.fillRect(self.x, self.y, self.width, self.height)

        def move(self):
            self.x += self.dx

    def clear_screen():    
        ctx.clearRect(0, 0, canvas.width, canvas.height)
       
    def write_help():
        ctx.font = "30px sans-serif"
        ctx.fillStyle = "lightgrey"
        ctx.fillText("S to start the animation", 50, 100)
        ctx.fillText("P to pause the animation", 50, 150)
        ctx.fillText("R to resume after a pause", 50, 200)
        ctx.fillText("Q to quit: click BEFORE editing!", 50, 250)

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
            ball.dy = -ball.dy
            ball.y = 2*(canvas.height - ball.radius) - ball.y
        
        
    def handle_keydown_events(ev):
        global pause, _id
        if ev.keyCode == 80:  # p or P for Pause
            pause = True
            clear_timeout(_id)
        elif ev.keyCode == 81:  # q or Q  for Quit
            doc.unbind("keydown")
            clear_screen()
            pause = True
            clear_timeout(_id)
        elif ev.keyCode == 82 and pause: # r or R for Resume
            pause = False
            update()
        elif ev.keyCode == 83 and pause: # s or S for Start
            pause = False
            update()
        ev.preventDefault()

and the code in the Editor::

    def update():
        global _id
        clear_screen()
        ball.move()
        stay_in_world()
        write_help()
        ball.draw()
        paddle.draw()
        if pause:
            return
        _id = set_timeout(update, tbf)
            

    #---------------

    pause = True
    fps = 20          # frames per second
    tbf = 1000/fps   # time between frames in ms

    ball = Ball(10, 10)
    paddle = Paddle(100, canvas.height-20)
    clear_screen()
    write_help()

.. topic:: Your turn

    After making the various changes, there are a few lines of code that can be deleted.
    Can you find them?  (The answer can be found by clicking below.)

    .. hint::

        The keyboard events ``r`` and ``s`` identical. We should remove one of them
        and update the help message.

Moving paddle?
--------------

The title of this rather long tutorial page is "Moving Paddle" ... and we still have
not made it move!

.. topic:: Your turn!

    Bind the left and right-arrow keys (you have seen their code earlier in this tutorial)
    so that they make the paddle move left and right.


    .. hint::

        The absolute value function ``abs(n)`` returns ``n`` if n is positive and ``-n``
        if n was initially negative.  Thus, to ensure that a particular value is
        positive, we can use ``n = abs(n)``.  Similarly, if we want a particular
        value to be negative, we can use ``n = -abs(n)``.

Once your code is working, try changing the value of ``fps`` to 60 and notice how much
smoother the ball is moving compared with the paddle.   (Perhaps there is no difference
for you as you may have found a better way to make the paddle move than the one I used
and will describe in the next page of this tutorial.)