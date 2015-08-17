
For loops
=========

As we have seen, ``while`` loops can be used with numbers using the
following pattern::

    n = 0                 # initialization
    while n < max_value : # condition to end the loop
        ...
        n += 1  # increment

Another way to write **exactly the same program meaning** is to use a
``for`` loop::

    for n in range(max_value):
       ...

The ``for`` loop in Python can be used for much more than counting items.
However, this will not be covered in this tutorial.

Using the ``for`` loop syntax, we can have a different definition for a
``repeat``-like function::

    def my_repeat(some_function, max_value):
        for n in range(max_value):
            some_function()

    my_repeat(move, 9);
    my_repeat(turn_left, 4);

.. topic:: Try it!

   Try the above program with world **Around 1**.

