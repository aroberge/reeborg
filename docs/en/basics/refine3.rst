Refinements: part 3
===================

As you should have noticed the program doesn't work. What happens is
that Reeborg gets in an infinite loop when there is no wall around him.
We need to have him ``move()`` after turning right, as indicated below::

    put()
    move()
    while not object_here():
        if right_is_clear():
            turn_right()
            move()
        elif front_is_clear():
            move()
        else:
            turn_left()

More complicated world
----------------------

.. topic:: Another world!

    Now, consider **Around 3**; will our program work?

As you probably guessed, unfortunately the answer is no. Try to figure
out why before reading any further.

