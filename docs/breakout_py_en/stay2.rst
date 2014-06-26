Stay in world: part 2
=====================

As mentioned before, the method I used to keep the circle within the bounds
of the canvas is not perfect: the circle sometimes goes partly out
of bounds.  Normally, my advice at this point would be to just keep going,
get the entire code for the game working "adequately" and plan to come
back later to make the appropriate tweaks so that the game is "better".

However, the way the ball does not stay perfectly within bounds annoys me.

If your code works perfectly, then I congratulate you!  If not,
please read on and to fix my version of the code - and perhaps yours as well.  However,
before we start, let me show you I have for the relevant function
so that you can compare with yours.

.. code-block:: py3
        
    def stay_in_world():
        global x, y,  dx, dy
        if x < 0 and dx < 0:
            dx = -dx
            x += dx
        elif x > canvas.width and dx > 0:
            dx = -dx
            x += dx
        if y < 0 and dy < 0:
            dy = -dy
            y += dy
        elif y > canvas.height and dy > 0:
            dy = -dy
            y += dy
        
Keeping things simple
---------------------

Let's try to figure out how it works one step at a time.
You may find it useful to grab a piece of paper and a
pencil or a pen and jot things down.

We'll focus first on the horizontal motion (the ``x`` coordinate).
Suppose the circle is moving towards the right edge of the screen,
so that its ``x`` coordinate is increasing at each frame.
Let's suppose we have ``dx=5``, and that the ``radius`` of the circle
is equal to ``10``.  Furthermore, let's suppose the canvas ``width``
is ``100``  (to keep things simple) and that at a given frame
the center of the circle is at ``x=84``.

.. topic:: Do it!

    Make sure you follow along with a piece of paper, writing and/or
    drawing things to help you figure things out.  I could have 
    included images to show you how it works, but this would not
    help you as much to learn how to figure things out on your own
    which is the ultimate goal.

The leading edge of the cirle is at ``x + radius`` which is ``94``.

In the next animation frame, the position of the center of the
circle (and that of its leading edge) increase by ``dx=5``.
So, the leading edge is at ``99`` which is still less than the canvas
width: the circle is still inside.

In the next animation frame, the leading edge would be at ``99 + 5 = 104``
which is beyond the canvas width.  So, the circle has to bounce back.
By how much? ...  Each frame, we want it to move 5 pixels horizontally.
To reach the edge of the canvas, it moved by 1 pixel ... and moved
4 pixel beyond that.  So, it should bounce back by 4 pixel and be located
at ``96``.  However, remember that this is the position of the leading
edge of the circle; the center of the circle would be at ``96 - 10 = 86``.

You may want to use different numbers to have another example to compare
with.

Let's try to capture this using variables.  To make things simpler,
let's focus on the position of the leading edge which we will call
``right_edge``.  By definition, ``right_edge = x + radius``; we could
also define ``left_edge = x - radius``.

When ``right_edge`` [``104``] becomes greater than the canvas ``width`` [``100``], 
we want to change its position so that it is ``right_edge - width`` [``104-100 = 4``]
less than ``width``  [``100-4=96``].  That is to say, we want::

    right_edge = width -  (right_edge - width)

which we can rewrite as:: 

    right_edge = 2 * width  - right_edge

and we want this to take place::

    if right_edge > width and dx > 0:
        right_edge = 2 * width  - right_edge

However, when drawing a circle, we are not so much interested in where its edge
is located as much as where its center is located.  We know that we
have  ``right_edge = x + radius`` and thus::

    if (x + radius) > width and dx > 0:
        (x + radius) = 2 * width  - (x + radius)

This is the same as::

    if x + radius > width and dx > 0:
        x + radius = 2 * width - x - radius

Subtracting ``radius`` on both side of the equal sign on the second line,
we find::

    if x + radius > width and dx > 0:
        x = 2 * width - x - 2 * radius

which we can write as::

    if x + radius > width and dx > 0:
        x = 2 * (width - radius) - x

.. topic:: Try it!

    If you have not done so already, make the change in your code and
    test it thoroughly, changing the value of ``radius``, ``dx`` and
    ``fps`` so that you can see that the circle really never goes beyond
    the right edge of the canvas.  Remember that the correct variable to
    use is ``canvas.width`` and not simply ``width`` like we have written.
    Also remember to change the direction of motion of the circle when it
    bounces!

Three more times
----------------

So, we know how to prevent the circle from going beyond the right edge.
We still have to figure out how to do the same for the left edge,
as well as the top and bottom of the canvas.

.. topic:: Your turn!

    Figure out how to do that.  Take your time to go through it
    step by step.  Then, when you are done and convinced that it 
    works, click on the hint below so that you can see my solution.

.. hint::

   Are you sure you did not click by mistake?  Is your code working?
   if so, click below to see my solution.

   .. hint::

        .. code-block:: py3

            def stay_in_world():
                global x, y, dx, dy
                if x < radius and dx < 0:
                    dx = -dx
                    x = 2*radius - x
                elif x > canvas.width - radius and dx > 0:
                    dx = -dx
                    x = 2*(canvas.width - radius) - x
                if y < radius and dy < 0:
                    dy = -dy
                    y = 2*radius - y
                elif y > canvas.height - radius and dy > 0:
                    dy = -dy
                    y = 2*(canvas.height - radius) - y