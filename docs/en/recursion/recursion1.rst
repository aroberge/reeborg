
Recursion: a simple example
============================


The simplest example of recursion is that of a single recursive function,
that is a function that calls itself::

    def recursive():
        if not completed_task():
            ...
            recursive()  # the same function is called ...

Let's consider a real program for Reeborg to execute.

.. topic:: Try this!

    Select **Home 1** and have Reeborg do the following::

        def go_home():
            if not at_goal():
                move()
                go_home()

        # now do it!
        go_home()

Once you have tried the above and tried to understood it, go to the
next lesson where we will review it and consider a slightly trickier example.
