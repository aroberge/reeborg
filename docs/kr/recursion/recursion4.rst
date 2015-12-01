Counting on recursion
=====================

Reeborg knows how to count ... but we have not seen that yet and will
not for a while. If you know some Python other than what you've
learned here, you might already know how to make Reeborg count using
numerical variables; however, I ask you to not use those in what
follows.

Select world **Tokens 5**. Where Reeborg stands, a single token can be
found. You know how to make Reeborg take the token and move to the next
square. I ask you to do this and have Reeborg repeat these two steps
until he finds itself on a square where no token is to be found. Then,
Reeborg must drop all the tokens collected on that square and move to
the next square.

The exact same program must work with world **Tokens 6**, which has a
different number of tokens - so you can not use ``repeat`` as you
don't have a fixed number of repetitions.

Reeborg starts with an infinite number of tokens in his pockets: so you
can not use ``carries_object()`` to figure out when to stop dropping tokens
on the one spot.

.. topic:: Try this!

    Use recursion to write a solution to this problem. An outline
    of a solution can be found below::

        def collect():
            # something
            # something
            if some_condition:
                # something
            # something

        collect()
        move()

.. topic:: Recursive challenges

    Review all of the previous challenges and try writing new solutions using
    recursion instead of ``while`` loops.

