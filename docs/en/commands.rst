Basic commands
==============

.. important::

    In this section, we assume that the world in which Reeborg is
    has only one kind of object at a given time.

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



.. |move_e_before| image:: /images/move_e_before.png
.. |move_e_after| image:: /images/move_e_after.png
.. |move_n_before| image:: /images/move_n_before.png
.. |move_n_after| image:: /images/move_n_after.png
.. |move_w_before| image:: /images/move_w_before.png
.. |move_w_after| image:: /images/move_w_after.png
.. |move_s_before| image:: /images/move_s_before.png
.. |move_s_after| image:: /images/move_s_after.png

at_goal(): condition which is "true" if Reeborg has reached "home"
build_wall(): adds a wall right in front of where Reeborg is
done(): instructs the program to stop (end) at that point.
front_is_clear(): "true" if no wall blocking Reeborg's way
is_facing_north(): "true" if Reeborg is facing North (towards the top of the screen)
move()
put() or put("object") where object is one of "token", "triangle", "square", "star", etc.
right_is_clear(): "true" if no wall is to the immediate right of Reeborg
repeat(f, n): executes ``f()`` n times
object_here(): "false" if there is no object at Reeborg's location, otherwise it returns a list containing the names of the objects found at that location. We can also give a specific name as an argument and it will return "true" or "false" if at least one such object is found at that location.
take() or take("object") where object is one of "token", "triangle", "square" or "star"
turn_left()



