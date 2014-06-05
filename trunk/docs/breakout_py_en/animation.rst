Animation
=========

.. topic:: Your turn!

    Complete the following code to make the circle move in the appropriate
    direction each time you press an arrow key::

        clear_screen()

        x = y = 200
        dx = dy = 5
        draw_circle(x, y, 10, 'red')

        def move_circle(ev):
            global x, y
            if ev.keyCode == _: # which arrow?
                x -= dx
            if ev.keyCode == _: # which arrow?
                y -= dy
            if ev.keyCode == _: # which arrow?
                x += dx
            if ev.keyCode == _: # which arrow?
                y += dy               
            if ev.keyCode == 81:  # q or Q
                doc.unbind("keydown")
            ev.preventDefault()

            draw_circle(x, y, 10, 'red')

        doc.bind("keydown", move_circle)

    One you have it working, you might want to see what happens if you
    press on two arrow keys at the same time.

.. hint::

    The ``y`` coordinates increases from top to bottom.  Also, there is an instruction missing
    before ``draw_circle``.

Automatic animation
-------------------

In the example above, to make the circle move, you needed to press an arrow key.
However, it is possible to have the browser animate things by itself.
If you look on the web, you will see that there are three Javascript functions
to do that:

#. ``setInterval``
#. ``setTimeout``
#. ``requestAnimationFrame``

Furthermore, if you read any recent tutorial, you will see that the recommendation
is to use ``requestAnimationFrame``.  While I agree it is a better function to use
**I will not use it for this tutorial**.  One of the reasons is that it is
**too good** as it let the browser decides when is the most efficient time to
draw things on the screen which, in turn, can hide some important concepts or
make them more difficult to grasp.  I will use instead ``setTimeout``, or
rather its Brython equivalent ``set_timeout``.  Here's the code I ask you
to use, presented in 4 blocks:

.. code-block:: py3

    from browser.timer import set_timeout, clear_timeout

    clear_screen()
    dx = dy = 5

    fps = 4          # frames per second
    tbf = 1000/fps   # time between frames in ms
    pause = True

We import not only ``set_timeout`` but also ``clear_timeout``; we will see
the relation between the two below.  

Animations are done by showing a certain number of frames per second, usually
abbreviated as ``fps``.  To have animations that look smooth to the eye, we should
aim to have at least 24 if not 30 frames per second.  The ideal situation is
when we have one animation frame each time the monitor refreshes, which is usually
60 times per second.   Here I chose to use only 4 fps so that we can perceive
each frame individually.  

The unit of time used by most functions is the millisecond abbreviated ms; 
there are 1000 ms in 1 second.  The time between frames, in ms, is thus
1000 divided by the numbers of frames per second.

We then define a function to start the animation.

.. code-block:: py3

    def start_animation(): 
        global x, y
        x = y = 10
        draw_circle(x, y, 10, 'red')
        update()

.. note:: 

    ``id`` is the name of a Python function.  This is why I use ``_id`` as a variable
    name so as to not confuse the two.

This function ends with a call to the function ``update``::


    def update():
        global x, y, _id
        x += dx
        y += dy
        clear_screen()
        draw_circle(x, y, 10, 'red')
        if pause:
            return
        _id = set_timeout(update, tbf)

The function ``update`` changes the values of ``x`` and ``y`` so that the circle
is drawn elsewhere on the canvas and appears to move.  The last line of
this function is what makes animations possible: the function ``set_timeout`` instruct
the browser to call the function given in its first argument, which is ``update`` here,
at a time ``tbf`` (time between frames) in the future.  It returns a unique number which
the function ``clear_timeout`` can use to cancel the future request.

In a certain sense, having ``update`` call ``set_timeout`` which will call ``update`` 
is very much like recursion.

Finally, we define a callback function which will allow us to control what is
being shown on the screen using our keyboard::

    def animate(ev):
        global pause, _id
        if ev.keyCode == 80:  # p or P for Pause
            pause = True
            clear_timeout(_id)
        elif ev.keyCode == 81:  # q or Q  for Quit
            doc.unbind("keydown")
            pause = True
            clear_timeout(_id)
        elif ev.keyCode == 82 and pause: # r or R for Resume
            pause = False
            update()
        elif ev.keyCode == 83 and pause: # s or S for Start
            pause = False
            start_animation()
        ev.preventDefault()

    doc.bind("keydown", animate)

.. topic:: Your turn!

    Enter the code above in the browser, doing your best to understand what each line
    does before running the code.  Then, run the code and confirm your understanding.

.. important::

    Before you edit your code, if the animation is running, you **must** press ``q``
    to stop it otherwise you will not be able to type code in the editor!
    This is a side effect of ``ev.preventDefault()`` that we included in the ``animate``
    function which we bound to ``keydown`` events.

.. topic:: Experiment!

    Here are some things you may want to try:

    #.  Replace the line ``elif ev.keyCode == 83 and pause:`` by
        ``elif ev.keyCode == 83:`` and press on ``r`` a few times in a row; you should see
        multiple concurrent animations taking place.

    #. Change the value of ``fps`` and those of ``dx`` and ``dy``.

    #.  Add a couple more keyCodes and use them to change the size of the circle being
        drawn.  You will need to introduce a variable like ``radius`` to do this, and
        use it instead of the number 10 as argument of ``draw_circle``.