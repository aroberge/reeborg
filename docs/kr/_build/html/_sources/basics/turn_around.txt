
Turn around
===========

In addition to having Reeborg making right turns, you *might* have had
him turn around a few times; by turning around, I mean changing
direction so that Reeborg is heading back to where it was coming from.
We can define a function ``turn_around()`` as follows::

    def turn_around():
        turn_left()
        turn_left()

Try it!

Back to ``turn_right()``
------------------------

Remember ``turn_right()``? Here it is again::

    def turn_right():
        turn_left()
        turn_left()
        turn_left()

Notice how the first two instructions are identical to the function
definition for ``turn_around()``. When this happens, we have to remember
Rule # 3:

.. important::

    Rule # 3
        When writing computer programs, do not repeat yourself.
        I repeat: **do not repeat yourself!**

So, we have some repeated instruction. While ``turn_right()`` is already
very simple, a good programming practice is to replace parts of code
that are repeated by a simple function. Thus, we should rewrite
``turn_right()`` as follows::

    def turn_right():
        turn_around()
        turn_left()

The idea behind this is that, the shorter a function is, the least
likely there will be bugs in it. Furthermore, once we have a well-tested
bug-free function, we make sure that we use it whenever we can when
writing longer functions. I admit, this is almost a silly example ...
but I don't have more complicated examples at this point to illustrate
this important idea.

.. topic:: Your turn

    Define a ``step_back()`` function that would undo a ``move()`` function.
    By this, I mean that you should have::

        # starting somewhere at location x,y
        move()
        step_back()
        # back at the same location,
        # facing in the same direction as before

    Make sure you to test it!

Do not use the hint unless you feel you absolutely can not do it otherwise!

.. hint::

   You might want to use ``turn_around()`` twice in defining ``step_back()``.