Information for teachers
========================

.. important::

    If you are a teacher using Reeborg's World, please get in touch with me
    so that I can keep you informed of important changes.  I would also
    like to have an idea of who uses it.

.. important::

    (to be verified) I can save world definitions on my server so that these
    could be loaded via select_challenge().



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