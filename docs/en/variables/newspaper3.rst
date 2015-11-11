Newspaper delivery revisited again
==================================

Let's go back to our newspaper delivery examples, but this time we will only
look at the deliveries where money is paid for the newspaper.

Below is an attempt at
a solution that would work both Ms. Lovelace's world **Newspaper 1**, and Mr.
Babbage's **Newspaper 2**:

.. code-block:: py3
    :emphasize-lines: 28

    from library import turn_right, turn_around

    def climb_up_one_floor():
        turn_left()
        move()
        turn_right()
        move()
        move()

    def climb_down_one_floor():
        move()
        move()
        turn_left()
        move()
        turn_right()

    def get_money():
        while object_here() :
            take()

    # === End of definitions ===

    take()
    while not object_here():
        climb_up_one_floor()

    get_money()
    put()   # leave Star newspaper
    turn_around()
    while not at_goal() :
        climb_down_one_floor()


.. topic:: Important test!

    Reproduce the above program, run it and note the result.


As you will see, when Reeborg attempts to execute the instruction ``put()``
at the line highlighted in yellow above, it stops and shouts
``I carry too many different objects. I don't know which one to put down!``.

So, the problem is that Reeborg is carrying both money (tokens) and
a newspaper (star).

.. topic:: A solution?

    Change the program so that Reeborg puts down the newspaper **before**
    it takes the money.  Does this work?

Function arguments
------------------

When there are two or more types of objects at a given location,
for example a star and some tokens in the worlds mentioned above, and
we instructs Reeborg to ``take()``, Reeborg cannot know which type of
object it must take.  Similarly, if Reeborg carries many types of objects
and we simply ask him to ``put()``, it cannot know which one it should
put down.

The solution is simple: we need to be more specific.

We have seen function arguments.  And, by a happy coincidence (!), it just
happens that the functions ``take()`` and ``put()`` can accept
an argument.  In the case that interests us, the Star newspaper is represented
by a star, and the argument to use is ``"star"`` as in

.. index:: take(arg), put(arg), object_here(arg)

.. code-block:: py3

    take("star")
    put("star")

For money, we use ``"token"``.


.. topic:: Your turn!

    Change the program above to specify which type of object Reeborg
    must take or put down.  Make sure that your program works correctly
    for both worlds, **Newspaper 1** and **Newspaper 2**.  You might
    want to use ``think()`` to occasionally speed up or slow down
    Reeborg's motion.

.. topic:: Another option

    Change again your program to replace ``object_here()`` by
    ``object_here("token")`` and make sure it still works.
