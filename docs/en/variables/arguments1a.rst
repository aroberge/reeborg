Function arguments
====================

We have seen that, when there are more than one type of objects
in Reeborg's World, we must sometimes specify which object
Reeborg must take or put down by using a function argument as in::

    take("token")
    put("star")

However, we have not seen yet how to define such a function.
It is actually fairly easy: all we have to do is include a variable as
an argument between the parentheses when defining the function.
For example, suppose we want to define a function ``turn()`` that
would take a number as its argument so that the number indicates
the number of left turn we want Reeborg to make.  Thus
``turn(1)`` would correspond to a single left turn whereas
``turn(3)`` would correspond to three left turns (which, as we know,
amounts to having Reeborg make a right turn).  One way to
do this is as follows::

    def turn(number):
        for _ in range(number):
            turn_left()


.. topic:: Your turn!

    Define such a ``turn`` function and try it out in a program.


Many arguments
-------------------

If you recall, ``print()`` can take more than one argument, with
each argument separated by a comma.  You can probably guess how
we can define a similar function::

   def my_function(argument_1, argument_2, ...):
      # code block

Suppose that, like above, we want to be able to specify a number
of turns ... and also a number of moves ... and a number of *whatever*.
We could define a function like ``turn`` for each type of repeated
action; however, there is a more general way which only requires
to define a single function, which we will call my_repeat (**repeat** would
have been a better name, but it's a special Reeborg keyword).
Here's a possible definition::

    def my_repeat(function, number):
        for _ in range(number):
            function()

So, if we call it with ``turn_left`` and ``3`` as arguments::

    my_repeat(turn_left, 3)

it will be interpreted as::

    for _ in range(3):   # number is replaced by 3
        turn_left()      # function is replaced by turn_left

which we recognize as our familiar ``turn_right`` equivalent.
However, having defined ``my_repeat`` we can use it with different
numbers and functions, such as::

    my_repeat(move, 4)   # move 4 steps


.. topic:: Your turn!

    Define such a ``my_repeat`` function and try it out in a program.

.. important::

    Unlike ``print()``, which can take an arbitrary number of arguments,
    the functions we have defined so far will always require a set number
    of arguments  (1 for ``turn``, 2 for ``my_repeat``). You should check
    what happens if you give a different number of arguments than what
    was indicated when defining the function.

    Creating functions which can accept an arbitrary number of arguments
    is something which we will see later, after we have seen a few other
    concepts.
