Finding the right spot
======================

While the program you just wrote works for worlds **Tokens 1** and **Tokens 2**,
it will fail if you try it for worlds **Tokens 3** and **Tokens 4**.

.. topic:: Try it!

   Try your program with all four worlds.

Another condition
-----------------

In addition to being able to find out if tokens are located at the
position where Reeborg finds himself, Reeborg can also determine if he
reached the coloured square which we described before as Reeborg's home.
In many worlds, it makes more sense to think of this as Reeborg's goal
destination, rather than home, and the function that Reeborg uses to
determine this is ``at_goal()``. Here's the outline of a solution that
should work in all four worlds mentioned above.::

    function move_until_done() {
        if ( at_goal() ) {
            // something
        }
        move();
        if ( token_here() ){
            // something
            // something else
            // something else again
        }
    }

    repeat(move_until_done, 42);

Complete the above (in the Javascript Code editor) and make sure it works for all
four worlds mentioned above.

And now, something different
----------------------------

You did complete the above exercise, didn't you? ... Good. 

.. topic:: Do this!

    Select
    either world **Home 1** or **Home 2**. Would the same program you use for
    the **Tokens** world work? After you
    have determined this, try running it to confirm your understanding.

Hurdles again!
--------------

Have a look at worlds **Hurdles 1** and **Hurdles 2**. Ignoring the end goal for
a second, a program that Reeborg could follow to race over these hurdles
would alternate between two instructions

-  ``move();``
-  ``jump_over_hurdle();``

with the appropriate definition for ``jump_over_hurdle()``. If you could
include a test (``if`` statement) at some point to see if you have
reached the goal, you could use the above to create a new function, that
we could call ``move_and_jump_until_done()`` so that a program suitable
for both worlds **Hurdles 1** and **Hurdles 2** would be::

    repeat(move_and_jump_until_done, 42);

.. topic:: Do it!

    Write such a program and make sure it works.

**Could this program work without changing anything for world
Hurdles 4?**

