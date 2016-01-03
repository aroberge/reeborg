Pause and think
===============

.. index:: pause(ms)

A long time ago, when we first talked about bugs, we mentioned
the instruction ``pause()``.  When Reeborg encounters that
instruction, it pauses ... and waits for us to click on
a button before moving again.

.. image:: ../../../src/images/pause1.gif

Actually, the function ``pause()`` can take an **optional** argument,
which is the number of milliseconds Reeborg pauses before resuming
execution by itself.

.. image:: ../../../src/images/pause2.gif


.. note::

    A millisecond is one thousandth of a second.
    This means that it takes 1000 milliseconds to
    equal one second.

.. topic::  Try it!

   Write a program that has Reeborg take various pauses, resuming
   the execution by itself.

Think
-----

.. index:: think(ms)

.. note::

    There is a lot going behind the scene to make Reeborg move, pick up
    objects, etc., and display the updated result on the screen.  All this
    cannot happen instantenously ... but it is usually very fast.
    Using ``think()`` introduces an **additional** amount of time; by
    default, this extra time is 250 millisecond (which is one quarter
    of a second).


So far, excluding the use of ``pause()``,
you have written programs where Reeborg execute each step
at a steady rate.  In a way, it is as though Reeborg **thinks**
for a short while before executing each instruction.
Actually, you can control the (additional) time it takes for
Reeborg to show the result of any action.  To do this, you
can use the function ``think(ms)`` where ``ms`` is an integer
argument that represents the (additional) time in millisecond taken by
Reeborg to perform any action.

.. topic:: Try this!

    Write a program that uses ``think(ms)``.  You can use ``think(ms)``
    at many different parts of a program, showing some parts really
    fast, and slowing down in others by using different values
    for the ``ms`` argument.  To have Reeborg move as fast
    as possible, use ``think(0)``.

