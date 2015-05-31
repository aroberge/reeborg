Rule # 6
========

Before we start adding more bricks, we need to fix the "fatal" flaw mentioned previously.  
The code we used was the following::

    if ball.overlaps_with(brick):
        ball.y -= ball.dy
        ball.dy = - ball.dy
        brick.is_visible = False
    if brick.is_visible:
        brick.draw()

The "fatal" flaw that occurred was that the ball seemingly bounced off the brick
after the brick had been broken and was no longer visible on the screen.
One easy solution is to check if the brick is visible, as follows:

.. code-block:: py3
   :emphasize-lines: 1

    if ball.overlaps_with(brick) and brick.is_visible:
        ball.y -= ball.dy
        ball.dy = - ball.dy
        brick.is_visible = False
    if brick.is_visible:
        brick.draw()
        
This approach works.  However, let's compared this code with what
we have for collisions between the ball and the paddle::

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
    
Remember Rule # 6?

.. important::

    **Rule # 6**
        Give objects information and let them determine their own
        behaviour.

.. topic:: Your turn

    Can you change the existing code so that the relevant objects 
    (``ball`` and ``brick`` here) are given the required 
    information and determine their own behaviour?

I will stop here, so as to help you resist temptation and avoid looking at
my solution before coming up with your own.