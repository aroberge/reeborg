Rule #6 - again
================

.. important::

    **Rule # 6**
        Give objects information and let them determine their own
        behaviour.

The reason for having this rule is that it makes code easier to maintain
by keeping as much relevant information contained within a single object.
By following this rule, if we later want to change the behaviour of that object,
we can do so without having to worry about potential impact elsewhere
in the code.

The **working** code we have is the following::

    def update():
        # ... some lines of code ...
        if ball.overlaps_with(paddle):
            ball.handle_hit_with_paddle()
        if ball.overlaps_with(brick) and brick.is_visible:
            ball.y -= ball.dy
            ball.dy = - ball.dy
            brick.is_visible = False
        if brick.is_visible:
            brick.draw()
        ball.draw()
        paddle.draw()
    
Checking whether or not the ball is hitting the paddle, or vice-versa
as is done with ``ball.overlaps_with(paddle)`` is something that belongs,
in some sense, to both objects.  So, we keep this check in ``update()``.
Once we do determine that a collision has taken place, we inform the
``ball`` object and let it determine what to do.  We can do something similar
(and more) with the rest of the code as follows::

    def update():
        # ... some lines of code ...
        if ball.overlaps_with(paddle):
            ball.handle_hit_with_paddle()
        if ball.overlaps_with(brick):
            ball.handle_hit_with_brick()
            brick.handle_hit_with_ball()
        brick.draw()
        ball.draw()
        paddle.draw()

Note that we no longer check to see if ``brick.is_visible`` is ``True``
as part of the check for a collision (which was our fatal flaw previously)
nor before drawing the brick!   If you did not end up with the same
code as I wrote above, you might be wondering how it can work without bugs...

First, let me show you the new ``draw()`` method for the ``brick``::

    def draw(self):
        if not self.is_visible:
            return
        ctx.fillStyle = self.color
        ctx.fillRect(self.x, self.y, self.width, self.height)

Next, the code for handling collisions for the ``ball`` object::

    def handle_hit_with_brick(self):
        self.y -= self.dy
        self.dy = - self.dy  

I still do not check to see if the brick is visible ...

Finally, the remaining method for the ``brick``::

    def handle_hit_with_ball(self):
        self.is_visible = False
        self.x_min = self.x_max = self.y_min = self.y_max = -1

By choosing negative values for the ``brick``, we ensure that it
can never overlap with the ``ball``.  Granted, this will be less
efficient than using a single check to see if ``brick.is_visible``
before computing the overlap; however, unless we find that
this is so inefficient that it is affecting the behaviour of the game,
it is better to use this as it simplifies the code following
Rule #6.
