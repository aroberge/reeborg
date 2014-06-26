Keeping the paddle in
=====================

Here is the code I have for moving the paddle with the keyboard::

    def handle_keydown_events(ev):
        global pause, _id
        if ev.keyCode == 37:   # left arrow
            paddle.dx = - abs(paddle.dx)
            paddle.move()
        if ev.keyCode == 39:   # right arrow
            paddle.dx = abs(paddle.dx)
            paddle.move()
        # more code follows for the other keys

.. note::

    Beginners often become too attached to code that "works" or spend
    too much time thinking about how to write the "best" code before
    actually writing some code.  Often, a very productive approach is
    to write something that "works" as a prototype and be ready to
    replace it later.  

The problem with this approach is that the motion of the paddle is not smooth.
However, it does the job for now, except that the paddle can go out of bounds.
Time to do something like we did for the ball.

.. topic:: Your turn

    Write a method ``stay_in_world()`` that ensures that the paddle never
    gets out of the canvas.  Note that, unlike the ball, the paddle should not "bounce" off
    the edges of the screen.  You need to find a good place to call
    this function.

To help you avoid "cheating" by looking at my code, I will end this
tutorial page here; my version of the code with a brief explanation
will come out next.