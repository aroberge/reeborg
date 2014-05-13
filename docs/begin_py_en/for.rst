
For loops
=========

As we have seen, ``while`` loops can be used with numbers using the
following pattern::

    var n = 0             # initialization
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


Reeborg's ``repeat()``
----------------------

Open Reeborg's diary and have Reeborg execute the single line program::

    view_source( repeat );

You will see a completely different code than the above as this will
reveal the ``repeat`` function used by Reeborg ... and written using
Javascript.  In fact, it uses Javascript's version of a ``for`` loop
which looks very different from the Python version.  
If you compare the Javascript code with the Python one, you will likely
agree that Python is a "cleaner" language, with fewer extra characters
like ``;`` or ``}``.


