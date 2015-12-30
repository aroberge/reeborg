Rule #5
=======

The problem with the previous code is that we checked for collision (overlap)
between the ball and the brick even if the brick had been hit and was
no longer visible.  So, we need to add a condition to ensure that the brick
is visible.  This gives us the following code:

.. code-block:: py3
    :emphasize-lines: 4, 5, 7, 8

    def update():
        # ... some lines of code
        if ball.overlaps_with(paddle) and ball.dy > 0:
            ball.y -= ball.dy
            ball.dy = - ball.dy
        if brick.is_visible and ball.overlaps_with(brick):
            ball.y -= ball.dy
            ball.dy = - ball.dy
            brick.is_visible = False
        if brick.is_visible:
            brick.draw()
        ball.draw()
        # ... more lines of code

where some repeated lines of code are highlighted.  
I also have the following:

.. code-block:: py3
    :emphasize-lines: 4, 5, 6, 8, 9, 10

    def handle_keydown_events(ev):
        global pause
        if ev.keyCode == 37:   # left arrow
            paddle.dx = - abs(paddle.dx)
            paddle.move()
            keep_paddle_in()
        if ev.keyCode == 39:   # right arrow
            paddle.dx = abs(paddle.dx)
            paddle.move()
            keep_paddle_in()
        # ... more lines of code

However, remember **Rule #3** from the beginner's tutorial.

.. important::

    **Rule # 3**
        When writing computer programs, do not repeat yourself.
        I repeat: **do not repeat yourself!**

If you look at the previous examples, you will find that we have
some repeated code.  By Rule #3, we should put the repeated code
inside a function or method.  For example, perhaps I should
write the following:

.. code-block:: py3
    :emphasize-lines: 4, 6, 16, 18

    def update():
        # ... some lines of code
        if ball.overlaps_with(paddle) and ball.dy > 0:
            ball.bounce_vertically()
        if brick.is_visible and ball.overlaps_with(brick):
            ball.bounce_vertically()
            brick.is_visible = False
        if brick.is_visible:
            brick.draw()
        ball.draw()
        # ... more lines of code

    def handle_keydown_events(ev):
        global pause
        if ev.keyCode == 37:   # left arrow
            paddle.move_left()
        if ev.keyCode == 39:   # right arrow
            paddle.move_right()
        # ... more lines of code

This would work.  However, it shares another problem that the above
code had but in a less obvious way: we are hard-coding behaviour for
an object based on some information.  We should do this
differently.

.. important::

    **Rule # 5**
        Give object information and let them determine their own
        behaviour.

For example, if you look at the above function ``handle_keydown_events``
where I explicitly wrote ``paddle.move_left()``.  Perhaps, in my game,
I want to create situations where the paddle appears to be confused
and pressing the left arrow sometimes result in a movement towards
the right rather than the left.  It is better to write the code as
follows:

.. code-block:: py3
    :emphasize-lines: 4, 6, 16, 18

    def update():
        # ... some lines of code
        if ball.overlaps_with(paddle) and ball.dy > 0:
            ball.hit("paddle")
        if brick.is_visible and ball.overlaps_with(brick):
            ball.hit("brick")
            brick.is_visible = False
        if brick.is_visible:
            brick.draw()
        ball.draw()
        # ... more lines of code

    def handle_keydown_events(ev):
        global pause
        if ev.keyCode == 37:   # left arrow
            paddle.move("left")
        if ev.keyCode == 39:   # right arrow
            paddle.move("right")
        # ... more lines of code

Of course, this means that I will have to change the existing
``move()`` method for the ``Paddle`` class.  Before I do this,
I want to draw your attention to another application of
Rule #5.

.. code-block:: py3
    :emphasize-lines: 7

    def update():
        # ... some lines of code
        if ball.overlaps_with(paddle) and ball.dy > 0:
            ball.bounce("paddle")
        if brick.is_visible and ball.overlaps_with(brick):
            ball.bounce("brick")
            brick.is_visible = False
        # ... more lines of code

``is_visible`` is an attribute of a given brick.  Perhaps I want
some bricks to be invisible to the player ... but still there, becoming visible
when they are hit once.  Or perhaps I want a brick to required being
hit multiple times before being destroyed; I may have different types of 
brick and each individual brick would know its own properties.

.. topic:: Your turn

    I have given you quite a few things to think about.  Try to rewrite your
    code using the suggestions I mentioned above and make sure it works
    each time you define a new function or method.  You'll see my version
    on the next page of this tutorial.