Tricky recursion
================

Before considering a slightly more complex example, let's review the
preceding example::

    def go_home():
        if not at_goal():
            move()
            go_home()

    # now do it!
    go_home()

Now, remember how I explained that when a function is called, we can
think of it as replacing the function call by the body of that function.
By this, I mean that this instruction::

    if not at_goal():
        move()
        go_home()

Let's assume that the first time we execute these instructions,
``at_goal`` is ``false`` and hence ``not at_goal()`` is ``true`` ... like
it was for world **Home 1**. In this case, the above calls to ``move`` and
``go_home()`` are executed, and the above code is equivalent to::

        move()
        go_home()

We can now replace the call to ``go_home()`` by its definition::

        move()
        if not at_goal():
            move()
            go_home()

and could, in theory, keep going like this forever, always replacing the
call to ``go_home()`` by its definition.

However, we don't want that as we want things to end eventually ...
which they do fortunately for world **Home 1**. In that case after a
second ``move()``, ``at_goal()`` would be true and and the ``if`` statement
would be ignored.  Thus, the code in this case is equivalent to::

        move()
        move()

**It is really important that you understand the above explanation
before going any further.** So, make sure to read it again if necessary
as we are going to consider a slightly trickier example.

Small change...
---------------

Consider the program below::

    def go_home():
        if not at_goal():
            move()
            go_home()
        turn_left()

    # now do it!
    go_home()

.. topic:: Think about it

    Try to figure out what it does before trying to have Reeborg execute it.
    An explanation follows in the next lesson.

