Comparison with other implementations
=====================================

In what follows, I make some quick "first-impressions" comparisons
between Reeborg's World and other *Karel the robot*-inspired implementations,
by comparing the simplest program for each implementation.


I only mention those that require the student to write code.
Please feel free to contact me to correct any misrepresentation I may
have made of the other "Karel the robot" implementations.

.. note::

    I arbitrarily chose a single "move" function to represent the simplest valid
    program in a given implementation.

First, Reeborg's World
----------------------

The simplest valid program is::

    move()

That's it: a single instruction.  What could be simpler when
teaching beginners?

If one wants to use an OOP approach instead (starting with
an empty world), the simplest valid program is::

    reeborg = UsedRobot()
    reeborg.move()

Once again, that's it; it's difficult to be simpler than this.

Because using standard libraries is something useful, students
can first learn about libraries by writing their own code and, in doing so,
they learn that library modules are just programs like any others.
Assuming they have define a function, say ``turn_right()``, in their library,
the following program will be valid:

.. code-block:: python

    from library import turn_right
    turn_right()

So, the idea is to have the student deal with as few concepts as possible
to write programs, only learning new concepts (such as Object-Oriented notation
and importing code from a library) after they have learned the basics.

Also, having a visually rich world environment can make programming tasks
both more appealing and more varied than in simpler worlds.

When it comes to other implementation, notice how everything (using
a library, using OOP techniques) is often required right from the start,
making it a challenge for beginners to get started.

Karel the robot
---------------

The original Karel the robot did not have the concept of a library.
It used a Pascal inspired language.  The simplest valid program one
could write was something like the following::

    BEGINNING-OF-PROGRAM

        BEGINNING-OF-EXECUTION
            move;
            turnoff
        END-OF-EXECUTION

    END-OF-PROGRAM

The ``turnoff`` instruction was required; the equivalent ``done()``
in Reeborg's World is optional.

Karel++
-------

Karel++ is a C++ based version to which Richard Pattis, the inventor
of Karel the robot, contributed. (http://csis.pace.edu/~bergin/CHAP02.html)

The simplest program is:

.. code-block:: cpp

    task
    {
        ur_Robot Karel(1, 1, East, 0);
        Karel.move();
        Karel.turnOff();
    }

The graphical representation of the world is rather limited, and only
one type of object is found, like in the original Karel the Robot.


Monty Karel
-----------

The makers of Karel++ have also a Python version.
(http://csis.pace.edu/~bergin/MontyKarel/index.html)
Here's the simplest program:

.. code-block:: python

    from karel.robota import UrRobot
    from karel.robota import East

    if __name__ == '__main__' :
        karel = UrRobot(1, 1, East, 0)
        karel.move()
        karel.turnOff()

For a basic "Hello world" type of program, this is a rather complicated
one which hides Python's strength when it comes to simplicity and
readability.

The graphical representation of the world is rather limited, and only
one type of object is found, like in the original Karel the Robot.

Karel J. Robot
--------------

The makers of Karel++ have also a Java version.
(http://csis.pace.edu/~bergin/KarelJava2ed/Karel++JavaEdition.html)
Here's the simplest program based on my reading of the documentation:

.. code-block:: java

    package kareltherobot;

    public class SomeName implements Directions
    {
        public static void main(String [] args)
        {
            UrRobot Karel = new UrRobot(1, 1, East, 0);
            Karel.move();
            Karel.turnOff();
        }
    }



Java being Java ... there is a lot of extra "cruft", including a number
of keywords, that has to be included when writing even the simplest program.

The graphical representation of the world is rather limited, and only
one type of object is found, like in the original Karel the Robot.

Guido van Robot
---------------

Guido van Robot (http://gvr.sourceforge.net/) uses a custom, limited mini-language
whose syntax is inspired by Python.  The equivalent program to those
mentioned above would be written simply as::

    move
    turnoff

Many developers who worked on Guido van Robot helped me when I first started
working on RUR-PLE, the desktop precursor to Reeborg's World.  They, in turn,
adapted the graphical world editor I developed for RUR-PLE so that it could
be included in Guido van Robot.

The graphical representation of the world is rather limited, and only
one type of object is found, like in the original Karel the Robot.

Code Combat
-----------

Code Combat (https://codecombat.com) is an absolutely beautiful environment,
having visually rich animated graphics and sounds.
It presents the user with pre-defined worlds, and very precise tasks that
must be accomplished.

The simplest valid program, using the Python version, would be::

    self.moveRight()

However, the simplest task requires more than one such command.
Furthermore, there is absolutely no explanation given at the beginning
as to why this complicated syntax (*why ``self.``*?) must be used.

While I envy the richness of the graphical environment, I find it a bit
overwhelming and inflexible to use.


