Refinements: part 1
===================

In this multi-part lesson, we are going to write a complete program to
solve problems of increasing complexity. For each lesson, I will present
a tentative solution that will contain one mistake. Try to find it
before moving on to the next lesson.

A simple problem
----------------

Let us start by considering a simple problem: having Reeborg go around
his world **once** and stop when it is back at its starting point. In
concrete terms, select world **Around 1**. We have done something like this
before, when we introduced the ``front_is_clear()`` test. Here's the
outline of a solution which supposes that Reeborg carries at least one
token at the beginning:

#. Put down a token to mark the starting (and ending) point.
#. Move forward until facing a wall.
#. Turn left when facing a wall.
#. Repeat steps 2 and 3 until we find the token we had put down.

Take your time to think about the above algorithm. Then, consider this
solution in code::

    put()
    while not object_here():
        if front_is_clear():
            move()
        else:
            turn_left()

.. topic:: Your turn!

    Take the time to think about what the above program instructs Reeborg to
    do before trying to run it. Can you find a problem with the proposed
    solution?
