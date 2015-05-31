
For loops
=========

As we have seen, ``while`` loops can be used with numbers using the
following pattern::

    var n = initial_value;  // initialization
    while (n < max_value) {  // condition to end the loop
        ...
        n++;  // increment
    }

Another way to write **exactly the same program meaning** is to use a
``for`` loop::

    for ( var n = initial_value; n < max_value; n++ ) {
        ...
    }

Thus, instead of having the variable initialization, the condition test
for ending the loop and the increment steps on three different lines,
they appear on the same line::

    for (initialization; condition; increment) {...}

However, ``for`` loops and ``while`` loops are completely equivalent.
Deciding which type of loop to choose is usually done based on how much
easier it makes it to read and understand a program: for programs that
use numerical values that are incremented each steps until a specific
value is reached, ``for`` loops are often preferred because the three
steps (initialization, condition, increment) can be seen at a glance.
Note that any one (or more) of these three steps can be omitted in a
``for`` loop. For example, one could write::

    for ( ; !front_is_clear(); ) {...}

instead of::

    while ( !front_is_clear() ) {...}

However, in this case, the ``while`` loop syntax is considered by most
people to be easier to read.

Using the ``for`` loop syntax, we can have a different definition for a
``repeat``-like function::

    function my_repeat(some_function, max_value){
        for(var n = 0; n < max_value; n++) {
            some_function();
        }
    }

    my_repeat(move, 9);
    my_repeat(turn_left, 4);

.. topic:: Try it!

   Try the above program with world **Around 1**.


Reeborg's ``repeat()``
----------------------

Open Reeborg's diary and have Reeborg execute the single line program::

    view_source( repeat );

to find out which definition Reeborg uses for the ``repeat()`` function.

Note that you could also use::

    write( repeat );

but the code would not be as nicely formatted!

