
More recursion
==============

The last program we considered was the following::

    def go_home():
        if not at_goal():
            move()
            go_home()
        turn_left()

    # now do it!
    go_home()      # first call

By now, you probably have figured out how it works; at the very least,
you should have tried to run it! Let's analyze it assuming we run it in
world **Home 1**. As usual, we consider the single instruction::

    go_home()

which gets replace by the body of the function definition::

    if not at_goal():
        move()
        go_home()    # second call
    turn_left()

Since Reeborg has not reached its goal yet,
the ``if`` statement block is executed::

    move()
    go_home()        # second call
    turn_left()

Once again, we replace ``go_home()`` by its definition::

    move()
    if not at_goal():
        move()
        go_home()    # third call
    turn_left()
    turn_left()

and do it one more time::

    move()
    move()
    if not at_goal():
        move()
        go_home()    # would be fourth call
    turn_left()
    turn_left()
    turn_left()

After the second ``move()`` instruction, Reeborg has reached its goal
and the ``if`` statement block is not executed::

    move()
    move()
    if not at_goal():
        move()      # not called
        go_home()   # not called
    turn_left()
    turn_left()
    turn_left()

.. note::

   ``go_home`` is called three times ... and Reeborg does three left turns.
   This is perhaps something that Reeborg can use to count ...  Remember this!

Thus, after reaching its goal, Reeborg does three left turns (a
celebratory dance perhaps?) before ending its program.

.. topic:: Try it!

   By running it, check that the recursive program does indeed result in having Reeborg
   make three left turns at the end.

Another test
------------

Using again the same world, can you figure out what would be Reeborg's
final orientation if he executes the following program?

.. code-block:: py3

    def go_home():
        move()
        if not at_goal():
            go_home()
            turn_left()
        turn_left()

    # now do it!
    go_home()

.. topic:: Do this!

    Try to figure out the above program without running it
    and then check your understanding
    by seeing Reeborg in action.  What would happen if Reeborg were already
    at its goal before running the program?


