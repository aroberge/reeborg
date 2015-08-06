Information for educators
=========================

.. figure:: ../images/rurple_book.png

   *Two books (red for teacher, blue for students)
   produced by Samsung Korea based on RUR-PLE, the desktop
   program precursor to Reeborg's World.*

In the beginning ...
--------------------

R. Pattis created *Karel the robot* in 1981, to introduce some
basic concepts in programming to Stanford's students.  This approach
has been found to be simple enough that it could be used not only
with university-level students but with learners of all ages.

.. note::

    I have one small request for educators: if you use Reeborg's World, please
    consider contact me and sharing **at least** one of your custom-designed
    worlds that I will include in this documentation
    so that others may be inspired by it.

Reeborg's World has been created with the goal of simplifying Pattis's
idea as much as possible, while still making it possible to
introduce very advanced programming concepts.

The simplest valid program in Reeborg's World is::

    move()

That's it: a single instruction.  What could be simpler when
teaching beginners?

If one wants to use an OOP approach instead (starting with
an empty world), the simplest valid program is::

    reeborg = UsedRobot()
    reeborg.move()

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

However, this simplicity does not limit what can be done.
The Python version of Reeborg's World is based on Brython_, and includes
many Python modules found in Python's standard library.

.. _Brython: http://brython.info


Advanced tasks
---------------

If you have not done so, select "Documentation menu": this will
bring up a program whose purpose is to change the default menu
and bring up world choices used in this documentation.

After having done so, select "Demo 1"; this will load up a world
with a simple task to perform:

|simple_demo1|

.. |simple_demo1| image:: ../images/simple_demo1.png

Note that a solution is already included in the editor.
You may want to run it to see it in action.

Once you are ready, replace the program in the editor
by the following:

.. code-block:: python

    import json  # very incomplete Brython module
    from browser import window

    # First, use the builtin JSON Javascript function as it can
    # show a nicely formatted representation of the world;
    # this should have been implemented in the Brython json module
    # but is currently missing.
    world_str = window.JSON.stringify(RUR.current_world, None, 2);
    print(world_str)

    # Convert the json world representation into a Python dict
    # using Brython's json module.
    world_dict = json.loads(world_str)

    # We can now use Python's standard notation for dicts and lists
    # to extract the required information.
    print(world_dict["robots"][0]["orientation"] == RUR.EAST)


World states are encoded as JSON objects. In this case, the content
of the world (converted to a Python dict), when I executed
the above code, was as follows:

.. code-block:: json

    {
      "robots": [
        {
          "x": 1,
          "y": 1,
          "orientation": 0,
          "_prev_x": 1,
          "_prev_y": 1,
          "_prev_orientation": 0
        }
      ],
      "walls": {
        "6,1": [
          "east"
        ]
      },
      "description": "Simple task demo.",
      "small_tiles": false,
      "rows": 12,
      "cols": 14,
      "objects": {
        "4,1": {
          "token": 1
        }
      },
      "goal": {
        "objects": {
          "6,1": {
            "token": 1
          }
        },
        "possible_positions": [
          [
            9,
            1
          ]
        ],
        "position": {
          "image": "house",
          "x": 9,
          "y": 1
        }
      }
    }


Advanced students could, in principle,
use this information to explore advanced concepts,
similar to the ones found on the Berkeley_ site that uses PacMan to explore
topics in Artificial Intelligence.

.. _Berkeley: http://ai.berkeley.edu/project_overview.html


More information
----------------

More relevant information can be found elsewhere in this documentation;
I encourage you to explore it and to report any error or make suggestions
for improvement.
