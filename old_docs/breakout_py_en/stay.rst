Stay in world!
==============

Currently, once the animation starts, the circle will keep going
eventually moving off the canvas where it can no longer be seen.
Let's change this.

Cleaning up
-----------

Before we write some new code, let's clean up.  Move
all the import statements to the top of the Python editor; 
personally, I try to follow the Python recommended practice
of putting first the modules from the standard library
(like ``math``) followed by third-party modules (like ``browser``).

Next, put in all the functions definitions.  Finally, at the end,
include the various variable assignments and function calls.

Finally, introduce two new variables, ``radius`` and ``color``, 
give them values of ``10`` and ``red`` respectively and use them
in the ``draw_circle`` calls.

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

        from math import pi
        from browser import doc
        from browser.timer import set_timeout, clear_timeout

        def draw_circle(x, y, radius, color):
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, pi*2)
            ctx.closePath()
            ctx.fill()

        def clear_screen():
            ctx.clearRect(0, 0, canvas.width, canvas.height)

        def start_animation():
            global x, y
            x = y = 10
            draw_circle(x, y, radius, color)
            update()

        def update():
            global x, y, frame_id
            x += dx
            y += dy
            clear_screen()
            stay_in_world()
            draw_circle(x, y, radius, color)
            if pause:
                return
            frame_id = set_timeout(update, time_between_frames)

        def animate(ev):
            global pause, frame_id
            if ev.keyCode == 80:  # p or P for Pause
                pause = True
                if frame_id is not None:
                    clear_timeout(frame_id)
            elif ev.keyCode == 81:  # q or Q  for Quit
                doc.unbind("keydown")
                clear_screen()
                pause = True
                if frame_id is not None:
                    clear_timeout(frame_id)
            elif ev.keyCode == 82 and pause:  # r or R for Resume
                pause = False
                update()
            elif ev.keyCode == 83 and pause:  # s or S for Start
                pause = False
                start_animation()
            ev.preventDefault()

        def stay_in_world():
            pass

        # end of function definitions

        canvas = doc["game-canvas"]
        ctx = canvas.getContext('2d')
        frame_id = None
        pause = True
        dx = dy = 5
        radius = 10
        color = 'red'

        fps = 4                          
        time_between_frames = 1000/fps   

        doc.bind("keydown", animate)
        clear_screen()

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
    of the canvas before bouncing back.  After you get that working,
    you can decide if it is worth trying to have it work better so that
    the circle never goes beyond a wall.
    
    Note that it might be useful to change the radius of the circle 
    (make it bigger) and the number of frames per second to see better
    how things work.

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

