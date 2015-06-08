Information for teachers
========================

.. important:: Please help reduce bandwidth usage.

    If http://reeborg.ca/world_dev.html is loaded in your browser, you
    can update its contents in a number of ways explained below.


Reducing bandwidth
------------------

There are many features you can use to reduce bandwidth usage and have
Reeborg's world be more responsive.   The first way is better illustrated
by an example.

Assuming you have
http://reeborg.ca/world_dev.html already in a browser tab,  write the
following one-liner in the editor and run this program (twice).

.. code-block:: python

    World("gravel_path")

The first time the program is executed, the correct world is selected.
The second time the program is executed, this instruction is ignored
and the rest of the program (left up to you to write) is executed.

Once the world is loaded, you might want to click on the
"World info" button at the top, and then click anywhere on the world
and see some information about this world, including a description
of the task to accomplish.

A world using exactly the same logic, but with a radically different
appearance, can be loaded using

.. code-block:: python

    World("/test_worlds/no_gravel_path")

Notice how this world is located in a subdirectory.

World hosting
*************

.. note::

    Les équivalents français de ``World`` et ``Permalink`` sont
    ``Monde`` et ``Permalien``.

I will host the worlds you create on my website so that they can
be easily loaded using the above method and reduce bandwidth usage.
Your worlds will be in your own subdirectory.
However, I do have a request: you must agree to give me permission
to make at least one of your worlds available to others
by listing it on the `World contributed by users <contributed.html>`_
page with proper attribution.

Ideally, I would like to get permission to list **all** the worlds
you create and that are hosted on my server.  If everyone does so,
teaching resources will grow and become more useful to everyone as
time goes on.

Updated the world using permalinks
**********************************

A second, similar way, is to use hosted permalinks.  For example,
you can try the following:

.. code-block:: python

    Permalink("test_permalink")

Permalinks can encode world state as well as editor and library
content - thus can be used to show a complete solution.  If permalinks
are hosted, a pure "world" version (without any program) would be made;
permalinks themselves will not be divulged on a public site unless
they only contain program stubs (and/or simple library content).



Programming paradigms
---------------------


Reeborg's World support a simple function-based programming style; for
example, a simple program might be:

.. code-block:: python

    def turn_right():
        turn_left()
        turn_left()
        turn_left()

    move()
    take()
    turn_left()
    move()
    if right_is_clear():
        turn_right()

It can also accept OOP-style programming.

.. code-block:: python

    class BetterRobot(UsedRobot):

        def turn_right(self):
            for i in range(3):
                self.turn_left()


    reeborg = BetterRobot(3, 3)
    reeborg.move()
    reeborg.turn_right()
    reeborg.take("apple")  # more than one object might be present in advanced worlds


.. todo::

   more to come ...



.. figure:: ../images/rurple_book.png

   Two books (red for teacher, blue for students)
   produced by Samsung Korea based on RUR-PLE, the desktop
   program precursor to Reeborg's World.