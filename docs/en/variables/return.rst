Return
======

.. note::

    North is toward the top of the screen; East
    is toward the right, West toward the left and South toward the bottom.


As you know, Reeborg is not exactly in good shape. He can only turn
left, has an oil leak, can only see walls when they are right in front
of him or immediately to his right, and can see tokens only when he is
literally standing on top of them. Reeborg has also a (somewhat broken)
compass which he can used to find out if is is facing north ... or not.
To find out if he is facing north, you can ask Reeborg to do the test
``is_facing_north()``.


.. topic:: Programming time!

    Run the following program to select a simple world that has Reeborg
    start in an arbitrary orientation::

        World("/src/worlds/face_north.json", "Face north")

    Then, write a short program that will ensure
    that Reeborg will turn left until he faces north, no matter what his
    starting orientation is.

A few experiments
-----------------

Select world **Alone** and execute the following program::

    repeat 4:
        print("turn_left: ", turn_left() )
        print("is_facing_north: ", is_facing_north() )

Do you notice anything interesting?

After you are done, execute the following program::

    def interrupted_two_steps():
        move()
        return
        move()

    print(interrupted_two_steps())

Notice how Reeborg does only one move.

Finally, run the following::

    def three():
        return 3

    print(three())

Getting results from functions
------------------------------

.. note::

    If a function has no ``return`` statement, or if the ``return``
    keyword is alone on a line of its own, a Python function will
    return a value of ``None``, which is another Python keyword.

Tests like ``is_facing_north()`` are actually Python functions. They
differ from other functions like ``turn_left()`` or ``move()`` in that
they ``return`` a potentially useful value.

.. topic:: Try this!

    Try the following::

        def north():
           return is_facing_north()

        while not north():
            turn_left()

As you have tried it, you noticed that ``north()`` was giving the same
result as ``is_facing_north()``; that is the effect of the ``return``
statement. We can use this to have Reeborg be able to identify
orientations other than North. First, note that if Reeborg turns left 4
times, he will be back to its initial orientation; we do want Reeborg to
end the test in the same orientation as that which he had at the start.
Now, suppose we would like to know if Reeborg was facing South. We could
ask Reeborg to turn left twice, note if his orientation is North (which
it should be if he was facing South) or not, turn left twice more, to go
back to its original orientation, and tell us what he remembered using
the ``return`` statement. One thing we need to do: have Reeborg use a
**variable** to remember its orientation after two left turns::

    def is_facing_south():
        turn_left()
        turn_left()
        remember = is_facing_north()
        turn_left()
        turn_left()
        return remember

    # now, ensure that Reeborg is facing South
    while not is_facing_south():
        turn_left()

.. topic:: Try it!

    It will not take you long, and you will be ready for the next exercise!


The above way works ... but, depending on its initial orientation, you might get
dizzy if you keep track of all left turns that Reeborg has to make: when
its orientation is not South, for each left turn that he makes to change
its orientation, he must make 4 more to determine its new orientation!

In a future tutorial, when we talk about Object-Oriented Programming,
we will find a way, by digging in Reeborg's built-in program, to
fix its compass and have it determine its orientation without getting
dizzy.

.. topic:: Mini-quiz!

    Write a program that has Reeborg face West, no matter what his original
    orientation is. Test your program with this world::

        World("/src/worlds/face_west.json", "Face west")

How to think about return
-------------------------

Suppose we have the following::

    def some_function ():
        ...
        return something

    ... = some_function()

In this case, the call to ``some_function()`` on the last line gets
replaced by the value of ``something`` which is what follows the
``return`` keyword. If nothing follows ``return`` the result is
``None``.

.. topic:: More returns


    Reeborg can determine if there is a wall in front of him, using
    ``front_is_clear()``, or if there is a wall to his right, using
    ``right_is_clear()``. Write a test that has Reeborg turn left 4 times,
    so that he ends up back in the same orientation that he started with,
    but that returns ``True`` if there is no wall to his left.

.. topic:: Challenges!

    Use the test you have written to have Reeborg get out of worlds **Maze 1** and
    **Maze 2** by following the **left** wall. Do the same for solving
    challenges for worlds **Storm 1** and **Storm 2**, that is, go around the
    one-room houses in the opposite direction compared with your previous
    solutions.
