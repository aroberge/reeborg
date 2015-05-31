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


.. topic:: Try this!

    Choosing an appropriate world, write a short program that will ensure
    that Reeborg will turn left until he faces north, no matter what his
    starting orientation is.

Getting results from functions
------------------------------

Tests like ``is_facing_north()`` are actually Javascript functions. They
differ from other functions like ``turn_left()`` or ``move()`` in that
they ``return`` a value. Let's start by considering a simple example:

.. topic:: Try this!

    .. code-block:: javascript

        function interrupted_two_steps() {
            move();
            return;
            move();
        }

        interrupted_two_steps();

If you use the strict version of Javascript, you will get a warning *Unreachable 'move' after 'return'*
and see that Reeborg only takes one step. You can get rid of this warning by
using the "regular" version of Javascript.


The ``return`` keyword can actually be accompanied by something else.

.. topic:: Try this!

    For example, try the following::

        function north(){
           return is_facing_north();
        }

        while (!north()) {
            turn_left();
        }

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
*variable* to remember its orientation after two left turns::

    function is_facing_south(){
        var remember;  
        turn_left();
        turn_left();
        remember = is_facing_north();
        turn_left();
        turn_left();
        return remember;
    }

    // now, ensure that Reeborg is facing South
    while (!is_facing_south()) {
        turn_left();
    }

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
    orientation is. Test it with Reeborg in various starting orientations,
    by giving him a few ``turn_left()`` instructions first.

How to think about return
-------------------------

Suppose we have the following::

    function some_function () {
        ...
        return something;
    }

    ... = some_function();

In this case, the call to ``some_function()`` on the last line gets
replaced by the value of ``something`` which is what follows the
``return`` keyword. If nothing follows ``return`` the result is
``undefined``.

.. topic:: More returns


    Reeborg can determine if there is a wall in front of him, using
    ``front_is_clear()``, or if there is a wall to his right, using
    ``right_is_clear()``. Write a test that has Reeborg turn left 4 times,
    so that he ends up back in the same orientation that he started with,
    but that returns ``true`` if there is no wall to his left.

.. topic:: Challenges!

    Use the test you have written to have Reeborg get out of worlds **Maze 1** and
    **Maze 2** by following the **left** wall. Do the same for solving
    challenges for worlds **Storm 1** and **Storm 2**, that is, go around the
    one-room houses in the opposite direction compared with your previous
    solutions.


