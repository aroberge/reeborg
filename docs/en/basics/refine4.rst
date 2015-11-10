
Refinements: part 4
===================

As you most likely found out, we were too hasty in asking Reeborg to
move forward after putting down a token. We need to check if there is a
wall preventing him from moving first. Here's a solution to the problem::

    put()
    if not front_is_clear():
        turn_left()
    move()
    while not object_here():
        if right_is_clear():
            turn_right()
            move()
        elif front_is_clear():
            move()
        else:
            turn_left()

.. topic:: Try it!

    Test it now and see that it works. Can you imagine situations where it
    might not work?

Refinements: part 5
===================

Consider world **Around 4**

.. topic:: Try it!

    Does the program written previously work with it?

As you probably guessed, if you didn't try it (you should, really!), it
does not. To make it work, we need to replace the ``if`` we just added
by a ``while``. Try it!
