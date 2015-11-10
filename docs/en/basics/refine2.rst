
Refinements: part 2
===================

Here's the cause of the problem we had at the end of part 1: we put down
a token and, before we had the chance to move, tested to see if we were
not next to a token. Since we were next to a token, we never go the
chance to get in the ``while`` loop. Perhaps we can change the program
to add a ``move()`` before we start the loop, as follows::

    put()
    move()
    while not object_here():
        if front_is_clear():
            move()
        else:
            turn_left()

.. topic:: Try it!

   Make sure the above program works before moving on.

Not so simple world
-------------------

Let's try the program we wrote on a slightly more complicated world
**Around 2**.

.. note::

    Do not forget to include::

        from library import turn_right

When you try your program, you will see that the result is not exactly
what we wanted: Reeborg takes a shortcut, and doesn't go all the way
around. The problem is that we assumed that Reeborg only had to move
forward or turn left to go around the world; we never took into account
situations where we would have wanted him to make a right turn. What
Reeborg needs to do is first to check on his right to see if there is
still a wall; if not, we have him make a right turn. Here's a modified
program that *attempts* to do just that::

    put()
    move()
    while not object_here():
        if right_is_clear():
            turn_right()
        elif front_is_clear():
            move()
        else:
            turn_left()

.. topic:: Your turn!

    Does it work? Read it carefully to decide for yourself. Then try it to
    confirm your opinion by running the program, or make any change you
    think appropriate.
