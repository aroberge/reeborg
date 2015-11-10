

Newspaper delivery revisited
============================

Let's go back to our newspaper delivery example; we'll consider the
delivery to Richard Pattis in **Newspaper 0**. Below is a solution to that
problem, with a few added comments.

.. code-block:: python
   :linenos:

    take() # the star newspaper

    # climb up first floor
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()
    move()
    move()

    # climb up second floor
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()
    move()
    move()

    # climb up third floor
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()
    move()
    move()

    put() # put down the newspaper

    # turn around
    turn_left()
    turn_left()

    # climb down floor
    move()
    move()
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()

    # climb down floor
    move()
    move()
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()

    # climb down floor
    move()
    move()
    turn_left()
    move()
    turn_left()
    turn_left()
    turn_left()

This solution is quite long ... and it is easy to make mistakes when
typing it. We note however that there are quite a few repeated code
segments for which we could create functions. We have already defined
``turn_right()`` and ``turn_around()``; let's use them and define a few
others.

.. code-block:: python
   :linenos:

    from library import turn_right, turn_around

    def climb_up_one_floor():
        turn_left()
        move()
        turn_right()
        move()
        move()

    def climb_up_three_floors():
        climb_up_one_floor()
        climb_up_one_floor()
        climb_up_one_floor()

    def climb_down_one_floor():
        move()
        move()
        turn_left()
        move()
        turn_right()

    def climb_down_three_floors():
        climb_down_one_floor()
        climb_down_one_floor()
        climb_down_one_floor()


    # === End of definitions ===

    take()  # the star newspaper
    climb_up_three_floors()
    put() # leave paper
    turn_around()
    climb_down_three_floors()

Each function contains no more than 5 instructions; it's much easier to
verify that each function does what it is supposed to do than verifying
an entire list of commands like we have previously. Once we know that
the functions do what they are supposed to do, making use of them allow
us to write a complete program in 5 more lines of code - again, much
easier to verify that it is right. All together, using functions to
avoid repetitions, we end up with a shorter program that is also much
easier to read.

.. topic:: Your turn!

    Write the above program and make sure it works correctly.
    Once this is done, you will be ready to learn another trick
    to make it even simpler.

Since functions like ``climb_up_one_floor()``, ``climb_up_three_floors``, etc.,
are specific to this problem, it is probably **not** a good idea to save
them in the library; you don't want to have too many functions in your
library so that you are always able to remember all that are there. If
you do find that you use a function many times in different programs,
then it is a good idea to put it in your library.
