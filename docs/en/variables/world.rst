World
=====

.. todo::

    Explain ``World("short name")`` then ``World("url")`` and finally
    ``World("url", "short name")``

.. note::

    Since ``World()`` is a very special function, I decided not to follow
    the normal Python convention and have its name start with an
    uppercase letter.



Choose a world other than **Home 1**.  Then run the following program
**twice**::

    World("Home 1")
    move()
    move()

The first time you run it, you should see Reeborg informing you that the world has
changed to **Home 1**, which you should be able to confirm by looking
at the world.

The second time you run it, because **Home 1** is already selected, the
function ``World()`` is effectively ignored, and the rest of the program is
executed.