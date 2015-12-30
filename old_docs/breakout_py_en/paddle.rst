Paddle
======

In breakout, which is the game we are making, we hit a ball
with a paddle.  So, let's draw the simplest paddle we can make:
a rectangle.  To do this, we use the canvas ``fillRect`` method.

.. topic:: Do this!

    Write the following code in the Python editor::

        def draw_paddle():
            x = 100
            y = canvas.height - 20
            width = 80
            height = 10
            ctx.fillStyle = "blue"
            ctx.fillRect(x, y, width, height)

    Add a call to ``draw_paddle`` just before drawing a
    circle in ``update``.  Make sure to test it.


Moving paddle?
--------------

So, we know how to draw a simple paddle.
We now need to make it move.  To do that, we need to
change its ``x`` coordinate (the paddle usually does not move up
and down on the screen).  Note how I used a **local** variable
inside ``draw_paddle`` to distinguish it from the other
variable ``x`` that was used to move the circle.  If I want
to make the value of ``x`` inside ``draw_paddle`` change, I can
either change its name (so as to distinguish it from the ``x`` denoting
the position of the circle) or pass it as an argument to the function.
However, if I do that, I still have to think of a name for it as
I call it from outside the function.  Perhaps something like:
``draw_paddle(paddle_x)``.   And, suppose I want to give the
option of changing its size, and perhaps its vertical position
as well, the perhaps I should plan to pass all four variables
as arguments, something like::

    draw_paddle(paddle_x, paddle_y, paddle_width, paddle_height)

.. important::

    STOP!

Whenever we see a possible confusion about variable names, or
a multitude of new variables created in a program, it is time
to think about what we are doing and try to see if there is
a better way to think about the problem.

Paddle and ball
---------------

So far, we have drawn a paddle and a moving circle; that moving
circle represents a ball in our game.  So, we have two objects:
a paddle and a ball, each having their own position, colour, size,
etc.  Since we already do quite a lot with the ball (circle), let's
focus on this one first and create a **class** of such objects
and use a single instance (for now) in our program.
Here are some of the relevant parts of the code we have for the ball::

    def draw_circle(x, y, radius, color):
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, pi*2)
        ctx.closePath()
        ctx.fill()

    dx = dy = 5
    radius = 10
    color = 'red'

Here's the code to create a class for such an object::

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

Note that we have given default values for most of the arguments, based
on what we had so far.

.. topic:: Your turn!

    Define the class ``Ball`` as above.  Then reorganize
    your code using the following steps:

    #. Inside ``start_animation()``, create one instance of the Ball using the
       default values ``ball = Ball(10, 10)`` and make it draw itself
       usign ``ball.draw()``.  Remove all unused variables in that function.
       Make sure that ``ball`` is a global variable so that it is known outside
       this function.

    #. Inside  ``update()`` replace the function call ``draw_circle(...)``
       by the ``draw()`` method of the ball.

    #. Inside ``update()``, replace all instances of ``x``, ``y``, ``dx``
       and ``dy`` by the appropriate attributes of ``ball``, i.e.
       ``ball.x``, ``ball.y``, etc.   Remove any global variable that
       are no longer needed.

    #. Do the same for ``stay_in_world()``.  Yes, this is very tedious, and it
       does not look good, but it is required at this point.  We'll make this look better in
       a short while.

    #. Remove the function ``draw_circle`` from your code; it is no longer needed.

    #. Carefully read over your code and remove any variables that are no longer needed.


**Can you think of other changes you should make?**

More cleanup
------------

If you have followed the instructions I gave you above,
your function ``stay_in_world`` should look as follows::

    def stay_in_world():
        global ball
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

This is silly: we have a function that controls the behaviour of a single
object.  Clearly, this should be made a method of the relevant class of
objects.

.. topic:: Your turn!

    Make ``stay_in_world`` a method of the class ``Ball``.  After you
    have done this, make sure that your code still work correctly.

.. topic:: Can you do one more thing?

    Can you think of a simple method to add to the class ``Ball`` ?

    .. hint::

        What does the ball do inside ``update()``?