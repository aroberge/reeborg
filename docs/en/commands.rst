Basic commands
==============

.. note::

    Reeborg's World uses Python 3 syntax (thanks to Brython) and follows
    the PEP 8 naming convention.


In this section, we focus on simple worlds and document
commands that Reeborg can follow.  Commands are Python functions.
In Python, a function named ``my_function`` is executed when
it is "called" by having its name followed by parentheses:
``my_function()``.

In this section, we consider only functions with no arguments.
There are two types that we will consider:

1. Simple actions that Reeborg can execute, like ``move()``

2. Information gathering that Reeborg can do, like ``front_is_clear()``
   which instructs Reeborg to determine if there are immediate
   obstacle in its path.


``move()``
----------

Reeborg's World is defined on a grid.  Reeborg's action take place
on a single grid location **or** Reeborg can move from one grid
location to another when told to ``move()``.

=================  =================
Before ``move()``   After ``move()``
-----------------  -----------------
|move_e_before|    |move_e_after|
|move_n_before|    |move_n_after|
|move_w_before|    |move_w_after|
|move_s_before|    |move_s_after|
=================  =================



.. |move_e_before| image:: ../images/move_e_before.png
.. |move_e_after| image:: ../images/move_e_after.png
.. |move_n_before| image:: ../images/move_n_before.png
.. |move_n_after| image:: ../images/move_n_after.png
.. |move_w_before| image:: ../images/move_w_before.png
.. |move_w_after| image:: ../images/move_w_after.png
.. |move_s_before| image:: ../images/move_s_before.png
.. |move_s_after| image:: ../images/move_s_after.png

A ``move()`` instruction can fail, and cause the program to come
to a halt if Reeborg's path is blocked.


``turn_left()``
---------------

A ``turn_left()`` command instructs Reeborg to turn 90 degrees
to its left.  Such a command can never fail.


.. important::

    In this section, we assume that the world in which Reeborg is
    has only one kind of object at a given time.

``take()``
----------

A ``take()`` command instructs Reeborg to pick up an object
located at its position.  This command can fail if there
are no object at that location; it can also fail if there
are two different kinds of objects, since Reeborg would not
know which one to take.

``put()``
---------

A ``put()`` command instructs Reeborg to put down an object
that it is carrying.  This command can fail if Reeborg
carries no object, or if Reeborg carries more than
one type of objects since it would have no way to know
which one to put down.



``is_facing_north()``
---------------------

Reeborg is able to determine whether or not it is facing
North (towards the top of the computer screen).


``at_goal()``
-------------

Reeborg can determine if it has reached its final destination,
as indicated in the task.

``front_is_clear()``
--------------------

Reeborg is able to determine if there are immediate obstacles
(like a wall) in its path.

``right_is_clear()``
--------------------

Reeborg is able to determine if there would be obstacles to
its right, if it were to turn in that direction and then
move forward in this new direction.

``object_here()``
-----------------

Reeborg can determine whether or not there is at least one
object at his location.

``carries_object()``
--------------------

Reeborg can determine whether or not it carries at least
one object.

``pause()``
-----------

Instructs Reeborg to pause the execution of the program
at that point and wait until someone clicks on either
the "run" button or the "step" button to resume.


``done()``
----------

Instructs Reeborg to ends its program, whether or not
all other lines of code have been executed.
