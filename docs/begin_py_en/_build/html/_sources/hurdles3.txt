Hurdles yet again!
==================

Reeborg lives in Canada where it not only can rain or be sunny, but snow
can also be falling ... usually not all three at the same time ... but
it does happen... Let's suppose that only one of those can happen. Then,
Reeborg could be faced with the following choices::

    if it_rains():
        play_indoors()
    elif it_snows():
        go_skiing()
    else:
        go_swimming() # assuming it is warm!

Notice the use of ``elif`` (which means "else if") for choice 2. If we took into account other
possible weather phenomena, like hail, thunder, fog, drizzle, etc., we
could add other choices using additional ``elif: ...`` code blocks.

How to think of ``if/elif/ ... /else`` statements
----------------------------------------------------

A series of ``if/elif/ ... /else`` statements is equivalent to
inserting the **first** code block that evaluates to ``True``. Thus::

    if False:
        do_1()
    elif True:
        do_2()
    elif True:
        do_3()
    else:
        do_4()

is equivalent to::

    do_2()

whereas::

    if False:
        do_1()
    elif False:
        do_2()
    elif False:
        do_3()
    else:
        do_4()

is equivalent to::

    do_4()

etc.

Back to hurdles
---------------

Just two lessons ago, you wrote a program that worked for worlds
**Hurdles 1** and **Hurdles 2** but not for **Hurdles 3**. Your program was likely
something like this

.. code-block:: python

   def jump_over_hurdle():
        # some suitable definition

   def move_and_jump_until_done():
        move()
        if at_goal():
            done()
        jump_over_hurdle()

    repeat(move_and_jump_until_done, 42)

The reason it is not working for **Hurdles 3** is that it is written with
the assumption that the hurdles are evenly spaced. Let's use our new
condition ``front_is_clear()`` and keyword ``else`` to change that.

Here's a new program that should work for the world we mentioned above,
provided you fill in the missing pieces.

.. code-block:: python

   def jump_over_hurdle():
        # suitable definition

   def run_jump_or_finish ():
        if at_goal():
            # something
        elif front_is_clear():
            # something
        else:
            # something

    repeat(run_jump_or_finish, 42)

Note the structure of the ``if/elif/else`` statements; as is mentioned above,
you should see that it gives three independent choices: only one of them
will be executed.

.. topic:: Do it!

    Write such a program and make sure it works.

Could this program work without changing anything for world **Hurdles 4**?
... Have a look and you will likely conclude that the answer is no.
You might want to try it just to be sure. It will take a little
``while`` until we are ready to write a program that can make Reeborg
race **Hurdles 4** as well as the other three.
