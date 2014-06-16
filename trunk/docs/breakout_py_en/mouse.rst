Controlling the paddle with the mouse
=====================================

Controlling the paddle with the keyboard does not result in
smooth motion of the paddle.  A better way is to control
it using the mouse.

We already saw before how to get the position of the mouse
inside the canvas::

    def get_mouse_position(ev, canvas):
        bound = canvas.getBoundingClientRect()  # gets the position of the canvas
                                                # on the page
        x = ev.clientX - bound.left
        y = ev.clientY - bound.top
        return x, y

We can call a modified version of this function (without having ``canvas`` as an argument as it is known globally) inside the following
method for the ``Paddle`` class::

    def mouse_move(self, ev):
        x, y = get_mouse_position(ev)
        self.x = x
        keep_paddle_in()
        self.calculate_bounding_box()

We also need to "bind" this method so that it is invoked when the mouse move:

.. code-block:: py3
    :emphasize-lines: 2

    paddle = Paddle(100, canvas.height-20)
    doc.bind("mousemove", paddle.mouse_move)

.. topic:: Your turn!

    Implement the above code and test it!

Hiding the cursor
------------------

If you find the cursor distracting, you can hide it as follows:

.. code-block:: py3
    :emphasize-lines: 5, 12

    def handle_keydown_events(ev):
        # ... some lines of code
        elif ev.keyCode == 81:  # q or Q  for Quit
            doc.unbind("keydown")
            canvas.style.cursor = "default"
            clear_screen()
            pause = True
            if _id is not None: 
                clear_timeout(_id)
        elif ev.keyCode == 83 and pause: # s or S for Start
            pause = False
            canvas.style.cursor = "none"
            update()

Bounces: not so straight
------------------------

If you have played breakout before, you may have noticed that
the ball bounces differently depending on where it hits the paddle.
This makes it easier to aim for a particular brick or empty path
between bricks.   A simple approach is to change the value
of ``dx`` for the ball so that it is zero if the ball hits
the paddle right on its midpoint, and is either positive
or negative depending if it hits to the right or the
left of the midpoint.

.. topic:: A challenge for you!

    Try to implement a different way for the ball to bounce off
    the paddle so that it is almost possible to aim it towards a particular
    spot.

In the next tutorial, I will give a basic way to do this.  It will involve
changing some lines of the existing code.