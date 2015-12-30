Bouncing differently
====================

Let's review the code we have so far for the
ball bouncing off a brick.  I also included the similar
one for bouncing off the paddle and the code for
``move`` motion that comes prior to a collision.

.. code-block:: py3

    class Ball(object):
        # many lines of code

        def move(self):
            self.x += self.dx
            self.y += self.dy

        def handle_hit_with_paddle(self):
            if self.dy > 0:
                self.y -= self.dy
                self.dy = - self.dy

        def handle_hit_with_brick(self):
            self.y -= self.dy
            self.dy = - self.dy   

Other than a test to see if the ball is going "up" in the case
of a collision with the paddle, the code for dealing with a collision
is identical in both cases.  The first line::
 
     self.y -= self.dy
    
undoes the vertical motion that was done prior to a collision.
The second line::

    self.dy = - self.dy

reverses the direction of motion.  Together, these two lines
of code could be renamed as the following single function::

    def reverse_vertical_motion(self):
        self.y -= self.dy
        self.dy = - self.dy

However, as we have seen, when bouncing off a brick, if the ball
hits the side of a brick, it might make more sense to reverse 
the **horizontal** motion.  And, if the ball were to hit exactly
on the corner of a brick, it might make more sense to reverse
both the **horizontal** and **vertical** motion.  

How can we determine what to do when?

As we have seen in the case of ``stay_in_world``, we can do a detailed
calculation to figure out by how much the ball goes beyond a certain
boundary (which could be the edge of a brick in the case which
currently interests us) and use that information to calculate the
correct position of the ball.

I am not going to do this here.

What I will do instead, is code a relatively simple improvement based
on the existing code, leaving it up to you, when the game is "finished",
to decide if further improvement is needed.  I wrote "finished" in quotation
marks because it is **always** possible to change things (collision handling,
artwork, sound effects, etc.) to make the game "better".

What I have done so far, when a collision (overlap) is detected, is to assume
that reversing the vertical motion would preclude an overlap with the same object.
If a ball comes from the side of a brick, this is clearly not true; instead,
I should reverse the horizontal motion in that case -- and perhaps reverse
both in the case of a "corner" hit.  Here's a simple and approximate way to
do this::

    def handle_hit_with_brick(self, brick):
        # note: I need to have "brick" as a parameter
        self.reverse_vertical_motion()
        if self.overlaps_with(brick):
            self.reverse_vertical_motion()  # undo the first reversal
            self.reverse_horizontal_motion()
            if self.overlaps_with(brick):       # corner hit
                self.reverse_vertical_motion()  # was needed after all

    def reverse_horizontal_motion(self):
        self.x -= self.dx
        self.dx = - self.dx
        
.. topic:: Your turn!

    Implement the above code.  Remember to pass the ``brick`` object to the
    ``handle_hit_with_brick`` method call inside ``update()``.
    
Better collision with paddle
----------------------------

If you have played a good breakout game before, you know what you can
almost aim the ball by choosing where it hits the paddle: have the ball
hit near the end of the paddle and it is deflected sideways.  Some games
even implements some kind of "friction" where, depending on how fast you
move the paddle sideways as it hits the ball, the path of the ball is
affected differently.

Keeping in mind that this is a simple tutorial, we will implement a
very simple version of changing how the ball bounces depending on where it
hits a paddle.  Our logic is illustrated by this pseudo-code::

    def handle_hit_with_paddle(self, paddle):
        self.reverse_vertical_motion()
        
        # calculate the horizontal change in speed based on where
        # the ball hits the paddle
        
        # keep the overall ball speed constant: if the horizontal speed
        # increases (decreases), the vertical speed must decrease (increase)
        # to compensate.

Here's the actual code I use::

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

I also changed the ``__init__`` method of the ``Ball`` to calculate
the initial value of ``self.speed``.


.. topic:: Your turn!!

    Implement the above code, or something similar, to make the game
    more interesting by controlling where the ball hits the paddle.
    Remember to pass the ``paddle`` object to the
    ``handle_hit_with_paddle`` method call inside ``update()``.
