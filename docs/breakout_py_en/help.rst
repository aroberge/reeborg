Help
====

Perhaps you are reading this after taking a pause for a few days 
away from your computer and you are asking yourself 
*"How do I get the circle to move again?"*.  Of course, you can
figure out by looking at the code in the Library, but this is an
unnecessary distraction.  Sometimes, when you are writing code,
it is useful to be able to focus entirely on what you see on
the screen without having to switch back and forth and lose
your train of thoughts.

Yes, I know, you are doing this by alternating between reading
this tutorial, going to the game page where you edit your code
and run it, come back to this tutorial, etc.  However, bear with
me.

Our goal is to fix the code so that the circle bounces exactly
at the edge of the canvas.  To see if it is working properly,
it is helpful to change the number of frames per second, to change
the radius of the circle, to change the increments ``dx`` and ``dy``
by which the circle moves at each frame, etc., and run the code
multiple times using different values.  Here as a reminder is
how we control the code.

- We click on the run button to get the code working
- Clicking on ``s`` starts the animation
- Clicking on ``p`` pauses the animation
- Clicking on ``r`` resumes the animation (after a pause)
- Clicking on ``q`` quits altogether ** and is required before we can edit the code!**

So, let's give ourselves a gentle reminder of this so we do not forget...

Writing text
------------

We can write text on the html canvas.  To do this, we must specify:

- A colour to use; if not, black will be used as the default
- A font choice, specifying the size and the font family.
- A string to write
- A position on the canvas to write it.

Here's a sample code to do all this::

    def write_help():
        ctx.font = "30px sans-serif"
        ctx.fillStyle = "lightgrey"
        ctx.fillText("S to start the animation", 50, 100)
        ctx.fillText("P to pause the animation", 50, 150)
        ctx.fillText("R to resume after a pause", 50, 200)
        ctx.fillText("Q to quit: click BEFORE editing!", 50, 250)

.. topic:: Your turn!

    Write the above code in the editor and call the function where
    needed so that it is a constant reminder.  I also found it useful
    to call ``clear_screen`` in ``animate`` (found in the Library)
    whenever ``q`` was clicked and ended the animation.

.. hint::

    Remember that you clear the screen each time you update
    the animation; this includes any text already present.

As you work on your game, you may find other uses for writing text
on the canvas.  For example, perhaps you want to see how the value of
a certain variable changes: you can write it on the screen.
We will do this later with the value of ``fps``.

Another reminder
----------------

As I worked on this tutorial and added some new functions
and keydown events, I found that the above reminder from ``write_help``
was not enough.  So, I modified ``animate`` to include a reminder as 
follows:

.. code-block:: py3
    :emphasize-lines: 3, 5, 10, 17, 21, 25, 26

    def animate(ev):
        global pause, frame_id
        remind = True
        if ev.keyCode == 80:  # p or P for Pause
            remind = False
            pause = True
            if frame_id is not None:
                clear_timeout(frame_id)
        elif ev.keyCode == 81:  # q or Q  for Quit
            remind = False
            doc.unbind("keydown")
            clear_screen()
            pause = True
            if frame_id is not None:
                clear_timeout(frame_id)
        elif ev.keyCode == 82 and pause:  # r or R for Resume
            remind = False
            pause = False
            update()
        elif ev.keyCode == 83 and pause:  # s or S for Start
            remind = False
            pause = False
            start_animation()
        ev.preventDefault()
        if remind:
            notify("red")

If you press any key other than ``p``, ``q``, ``r`` or ``s``, 
you will see the effect of this reminder.

A better name
-------------

You should always be willing to review your code critically...

Initially, ``animate`` seemed to me to be the right name for the above function.
However, it is really just taking care of handling
key events. So, change its name to ``handle_keydown_events``, which is a
more accurate name for it, and make
sure that your program still works.  (You will have to change
the name at two different places.)