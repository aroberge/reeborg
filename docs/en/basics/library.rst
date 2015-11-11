
Using the Library
=================

.. index:: ! from ... import

When programmer make use of a given function in different programs,
rather than redefining it in each program they write, they put them in
special programs called **libraries** and they have a way to ensure that
their other programs can use the functions that are found in the
library.

You are going to use the function ``turn_right()`` **a lot!** Instead of
rewriting it each time (remember Rule # 3), what you are going to do is
to write it **once** (more) but, this time, instead of writing it in the
editor with the **Python Code** tab, you will click on the **library** tab and
write it there. Oh, and you should also write ``turn_around()`` there as
well.

.. image:: ../../../src/images/library.png


Then, when you want to use the functions defined in your library, you will
simply type ``from library import`` (followed by the function names, separated
by commas) on its own line in the Python Code editor.

.. topic:: Do this!

   After writing the functions ``turn_right()`` and ``turn_around()`` in
   the library, go back to the Python Code editor (so you no longer see your
   functions) and write a short
   program that nonetheless uses them to make sure that they work as
   expected. If they don't, go back and fix them.  Remember to use
   ``from library import turn_right, turn_around`` in your main program.

.. hint::

   With the appropriate functions defined in the library,
   here is such a program::

       from library import turn_right, turn_around
       move()
       turn_around()
       move()
       turn_right()
       move()
       turn_around()
       move()
       turn_left()  # back at starting position


From now on, whenever you define a function that you use more than once,
add it to your library so that you don't have to redefine it every time.


Reeborg can understand French
---------------------------------

There exists a special library which enables Reeborg to understand
French.  For example, instead of writing ``move()``, one can write ``avance()``
and Reeborg will do the right thing.  For example, try the following::

    from reeborg_fr import avance, tourne_a_gauche

    avance()
    tourne_a_gauche()

.. topic:: Your turn!

    Write a short program which uses the functions of the French library.

.. admonition:: For educators

    When the French library is imported, the online help
    (available via "Addition options" -> "Help") is updated to include
    all the French functions available.  The only restriction however
    is that function arguments, such as ``"token"`` in ``take("token")``
    **must** still be specified in English.  To use a version
    completely translated in French, you must go to
    `Le monde de Reeborg <http://reeborg.ca/monde.html>`_

    If you would like to create a new version, a Spanish version for example,
    please contact me.
