Moving Paddle
=============

Before we get the paddle moving, let's go back to the last step of the previous
page.  I asked you to identify what the ball did inside the function ``update``.
The relevant lines of code are::

    ball.x += ball.dx
    ball.y += ball.dy

Their goal is to make the ball move.  So, we should really replace them by
the line::

    ball.move()
    
and define the appropriate method for the class ``Ball``.

Paddle class
------------

We want to move the paddle.  Eventually, we will control it using the mouse, but
it might be easier to do it first using the keyboard since we are already
dealing with keyboard events.  

Just like we introduced a ``Ball`` class, we should do the same and create a 
``Paddle`` class.

.. topic:: Your turn

    Replace the ``draw_paddle`` function a method call ``paddle.draw()`` with
    a proper ``paddle`` object defined. Make any other change you deem appropriate.

When you have done the required changes, click on the hint below to see the code
I have written for this.

.. hint::

    .. code-block:: py3
        :emphasize-lines: 8

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


        def start_animation():
            global ball, paddle
            ball = Ball(10, 10)
            paddle = Paddle(100, canvas.height-20)
            update()

        def update():
            global ball, paddle, frame_id
            ball.move()
            ball.stay_in_world()
            paddle.move()
            clear_screen()
            write_help()
            ball.draw()
            paddle.draw()
            if pause:
                return
            frame_id = set_timeout(update, time_between_frames)

.. important::

    It is a good idea to review the code written regularly and to see
    if things still make sense, or if there isn't a better, more consistent
    way to organize the code.  


Moving paddle?
--------------

The title of this rather long tutorial page is "Moving Paddle" ... and we still have
not made it move!

.. topic:: Your turn!

    Bind the left and right-arrow keys (you have seen their code earlier in this tutorial)
    so that they make the paddle move left and right.  Make sure to remove the code that
    made the paddle move on its own!

    .. hint::

        The absolute value function ``abs(n)`` returns ``n`` if n is positive and ``-n``
        if n was initially negative.  Thus, to ensure that a particular value is
        positive, we can use ``n = abs(n)``.  Similarly, if we want a particular
        value to be negative, we can use ``n = -abs(n)``.

Once your code is working, try changing the value of ``fps`` to 60 and notice how much
smoother the ball is moving compared with the paddle.   (Perhaps there is no difference
for you as you may have found a better way to make the paddle move than the one I used
and will describe in the next page of this tutorial.)