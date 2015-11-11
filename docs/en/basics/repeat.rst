Repeat
======

.. index:: repeat

Often, we will find that we want to repeat a series of instructions a
fixed number of times. There is a way in Python to do so ... but it
has too many new concepts to explain at this time. I will just show you
the code, and immediately introduce ``repeat``, a simpler replacement
for it, unique to Reeborg's World.  The standard way
is known as a **for loop** and is written as follows:

.. code-block:: python

    for i in range(n):
        # some
        # instructions
        # here

.. note::

   Using ``repeat`` will not work in Python programs meant to be
   run outside of Reeborg's World. A **loop** is a block of
   instructions that is repeated.

In Reeborg's World, we can write a ``repeat`` *loop* as follows::

    repeat n:    # "n" is a whole number
        # some
        # instructions
        # here

For example, the following code will make Reeborg trace a square::

    repeat 4:
        move()
        turn_left()


By using ``repeat``, we can rewrite some function definitions without
having to repeat instructions::

    def turn_right():
        repeat 3:
            turn_left()


So, by using ``repeat`` we have yet
another way to eliminate repetitions in our code.

.. topic:: Try it!

    Change your program for the newspaper problem so that
    you use ``repeat`` wherever it would shorten the code.
    If you did not save it,
    go back to the previous lesson and redo it using ``repeat``.

.. admonition:: For educators

    My reason for having ``repeat`` as an addition to Python's
    standard notation was to avoid having to introduce 4 concepts
    at the same time (loops, variables as in ``_`` in ``for _ in range(n)``,
    builtin functions like ``range`` as well as the concept of
    function arguments).

    By design the ``n`` in ``repeat n`` **must** be an integer literal;
    it cannot be a variable.  When students learn about variables, they
    should learn the proper Python syntax to do loops and forget about
    the non-standard ``repeat``.
