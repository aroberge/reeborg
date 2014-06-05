Brick
=====

It is now time to add bricks ... let's make that a single brick to start.
A brick is represented as a rectangle on the screen, like we did
for the paddle.  Unlike the paddle, it does not moved once laid out.
So, we can adapt the code for the ``Paddle`` class, removing any 
attribute (like ``dx``) or method relating to movement::

    class Brick(object):
        
        def __init__(self, x, y, width=60, height=30, color="green"):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.calculate_bounding_box()
        
        def calculate_bounding_box(self):
            self.x_min = self.x
            self.y_min = self.y
            self.x_max = self.x + self.width
            self.y_max = self.y + self.height
            
        def draw(self):
            ctx.fillStyle = self.color
            ctx.fillRect(self.x, self.y, self.width, self.height)

Let's start by creating a brick at ``x=200`` and ``y=200``.

.. topic:: Your turn

    Add the ``Brick`` class to your code, create a brick at the location
    mentioned above and make sure it gets drawn before the ball does.
    When you run the program, the ball should be going "through/over" the brick.

Destroying a brick
------------------

When the ball hits a brick, we want the brick to be broken (hence the name of the game: breakout)
and no longer be visible.  As for the ball, let's do something simple like we do
when it hits the paddle: we simply reverse its vertical direction.
Here is the code I have inside ``update``::


    if ball.overlaps_with(brick):
        ball.y -= ball.dy
        ball.dy = - ball.dy
        brick.is_visible = False
    if brick.is_visible:
        brick.draw()

.. topic:: Your turn

    Implement the above code and test it.  You will need to add a line
    to the ``Brick`` class.

The code I wrote above has a bug in it.  Actually, it has two bugs in it: 
one "fatal", in that it does not do what it is supposed to do, and a
second one, less severe, as it would give rise to a potentially unacceptable
game behaviour.

You may want to test it thoroughly to see if you can figure out what the two
bugs are and, at least, fix the "fatal" bug.