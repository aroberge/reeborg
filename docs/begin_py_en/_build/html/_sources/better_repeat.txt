
A better **repeat()**
=====================

.. note::

    This lesson covers some very advanced concepts. If you do not
    fully grasp them the first time around, you should feel free to continue
    with the other lessons.

You have seen how we can use our function ``repeat()`` to reduce the
number of lines of code needed to accomplish the same thing. For
example, if we want to simulate a right turn, we can write
``repeat(turn_left, 3)``, thus replacing three instructions with one.
The problem with doing this in general is that it does not make the code
much more readable since we do not introduce descriptive names. A better
approach that we have seen is to use ``repeat()`` inside a well-named
function definition like this::

    def turn_right ():
        repeat(turn_left, 3)

However, we can do this differently. First, we have just seen how
``repeat()`` can be defined using a for loop::

    def repeat (function, n):
        for i in range(n):
            function()

Second, we need to remember what the ``return`` statement does in a
function. For example::

    def some_function ():
        # some lines of code
        return something;

    a = some_function()
    # a will now be a synonym for "something"

Just like we can have functions as arguments of other functions, we can
``return`` functions!

.. code-block:: py3

    def better_repeat (fn, n):
        def old_repeat():
            for i in range(n):
                fn()
        return old_repeat

    # now, use it to define a new way to turn right
    my_turn_right = better_repeat(turn_left, 3)

    my_turn_right()  # and use it!

.. topic:: Try it!

   See how you can create a new function using the ``better_repeat()`` function.

Extending this idea
-------------------

In addition to things that need to be repeated, we can also extend this
idea to conditions that need to be tested for...

.. code-block:: py3

    def do_while(fn, condition):
        def until():
            while condition():
                fn()
        return until

    walk_to_the_wall = do_while(move, front_is_clear)
    walk_to_the_wall()

.. topic:: Try it!

    Try the above.  Then, when you are done, you might want to define
    ``do_while_not(fn, condition)`` where we are doing something until a
    condition is **not** satisfied.

An other way to repeat
======================

Here we present a different way to repeat a given instruction, one that
is more specific to the instruction that we want to repeat. Suppose we
want to *turn right* or *turn around* but want to have a single function
name to remember. One way to do it is as follows::

    def turn(n)
        for i in range(n):
            turn_left()

Using this definition, ``turn_right()`` would be written as ``turn(3)``
and ``turn_around()`` would be written as ``turn(2)``. Try it!

Having a default behaviour
--------------------------

Remember how ``take()`` and ``take("token")`` are equivalent? Would it
be nice to have something similar for ``turn()`` where ``turn()``, with
no argument, would be equivalent to a single ``turn_left()``
instruction?

This can be accomplished as follows::

    def turn(n):
        if n is None:    # None indicates that no argument was given
            n = 1        # default behaviour
        for i in range(n):
            turn_left()

Note that, if a number less than 1 is passed as an
argument, the ``for`` loop is skipped and Reeborg does not turn.

.. topic:: Try it!

   Write programs that make use of the code samples above.
