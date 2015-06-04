.. Reeborg's World documentation master file, created by
   sphinx-quickstart on Sun May 31 17:47:43 2015.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Reeborg's World's documentation!
===========================================

*Et pour les francophones, bienvenue au monde de Reeborg; il y aura quelque chose pour vous sous peu.*

Reeborg's World is an adaptation of Richard Pattis's *Karel the robot*.
It supports three programming languages (Python, Javascript and CoffeeScript) although
the focus is on Python which is my favourite programming language and, I believe,
the ideal one to use for teaching programming concepts.  Unless otherwise
noted, this documentation will refer to the Python version by default.

.. note::

    Reeborg's World uses Python 3 syntax (thanks to Brython) and follows
    the PEP 8 naming convention.

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


Depending on your preference, you might be interested in different
aspects of Reeborg's World.  Note that the same information may be
presented in more than one of the following categories; however,
the focus is different for each of them.

.. toctree::
   :maxdepth: 2

   commands
   objects
   students
   teachers
   translators
   developers
   artists


.. todolist::


Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

