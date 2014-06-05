Stay in world!
==============

Currently, once the animation starts, the circle will keep going
eventually moving off the canvas where it can no longer be seen.
Let's change this.

Cleaning up
-----------

Before we write some new code, let's clean up.  Move
the import statement from the Python editor to the
Library, just below the other import statement: it is
good programming practice to keep all the import statements
visible at the top of the code.  (Remember that the
code in the Library is the code that is going to be run first.)

Next, move the definition of the function ``clear_screen`` and
its invocation also to the Library. Do the same for
the definition of the function ``start_animation`` and
``animate`` as well as for the statements
``pause = True`` and ``doc.bind("keydown", animate)``.

Finally, introduce a new variable called ``radius``, give
it the value of 10 and use it in the call for ``draw_circle``
inside ``update``.

.. topic:: Clean up and test!

    Do the above suggested changes and test your code.  
    Make sure it still works correctly with all four
    keys: ``p``, ``q``, ``r`` and ``s`` controlling the 
    animation.

New code
--------

Add a new function called ``stay_in_world``, with an
empty body using Python's ``pass`` statement and call it
just before drawing the circle inside ``update``.
Once you've done this, click on the hint below so that
you can compare my code at this point with yours; the
value of ``fps`` might differ from yours as we may have
experimented with different values at this point.

.. hint::

    .. code-block:: py3

        radius = 10
        dx = dy = 5
        fps = 20          # frames per second
        tbf = 1000/fps    # time between frames in ms

        def update():
            global x, y, _id
            x += dx
            y += dy
            clear_screen()
            stay_in_world()
            draw_circle(x, y, radius, 'red')
            if pause:
                return
            _id = set_timeout(update, tbf)
            

        def stay_in_world():
            pass

.. topic:: Write the code!

    Here is a difficult assignment to get perfectly right:
    write the code definition for ``stay_in_world`` so that
    the circle always stays entirely within the world, bouncing
    on the "walls."  Remember that the top-left corner of
    the canvas is located at ``(0, 0)``.  The bottom-right corner
    is located at ``(canvas.width, canvas.height)``.

    Do not try to getting it perfect right away. Start with making
    sure that the circle changes direction when it goes beyond a "wall";
    do not worry at first if the circle is partly beyond the edge
    of the canvas before bouncing back.

A few of you may find the above easy.  Many of you may find this
very difficult to do. I am going to give you a series of hints.
If a given hint does not seem to give you something that works,
think hard about what may be the cause before clicking on the following
hint: you will learn much more if you think of the solution yourself
rathe than just reading it.

.. hint::

    The signs of ``dx`` and ``dy`` control the direction of motion.
    You can change the sign as follows: ``dx = - dx``.

.. hint::

    ``dx`` and ``dy`` need to be known outside of ``stay_in_world``
    just like other variables that we have seen.

.. hint::

    A simple implementation that sort of works is the following::

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

You might have something that works better than the above code. 
This simple implementation is not good enough for a real game ...
but it might be good enough for now.  When you write a game, you
should focus on putting all the pieces together quickly, not worrying
about how polished it looks - otherwise, you might never finish the
game.

Personally, at this point, I find the fact that the circle goes beyond
the boundaries of the canvas somewhat distracting.  So, before
implementing other parts of the code, I will fix that.  
I have a reason for doing so as you will see later.




