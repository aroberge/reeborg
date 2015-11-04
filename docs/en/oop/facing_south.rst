Facing South
============

Reeborg's compass is broken; he can use it to determine if he is
facing North using ``facing_north()``, but that's it.

When we introduced ``return`` in `a previous tutorial <../begin_py_en/return>`_
we saw how we could define a test so that Reeborg could determine if
he was facing South, using the following::

    def is_facing_south():
        turn_left()
        turn_left()
        remember = is_facing_north()
        turn_left()
        turn_left()
        return remember

    # now, ensure that Reeborg is facing South
    while not is_facing_south():
        turn_left()

.. topic:: Do this!

    Define a method ``is_facing_North`` by replacing ``pass`` by the appropriate
    lines of code.

    .. code-block:: py3

        class RepairedRobot(UsedRobot):
            def is_facing_south(self):
                pass

        reeborg = RepairedRobot(3, 3)
        while not reeborg.is_facing_south():
            reeborg.turn_left()

    Reeborg should **not** turn on the screen as it determines its direction.

.. hint::

   Instead of doing a left turn using ``reeborg.turn_left()``, change the value
   of the ``orientation`` prior to using ``remember = is_facing_north()``

.. topic:: Do it another way!

   There are two ways to have Reeborg determine its orientation.  One is by using
   a code similar to the **function** ``is_facing_south()`` written above and
   introduced in the lesson about ``return``.
   The other way is to dig in the Javascript code, using ``inspect`` and ``view_source``
   and see how it could possibly be implemented in a single line of code, without the
   need to use a variable like ``remember``.

.. topic:: Do even more!

   Implement the methods ``is_facing_east()`` and ``is_facing_west()``.  Make sure
   to test them by running some programs that make use of them.

Extend this idea
----------------

If Reeborg's compass is fixed, it means that Reeborg should be able to orient itself
rapidly to face any direction as required.

.. topic:: Try this!

    Design four methods, one for each direction starting with ``face_north()`` which 
    will have Reeborg turn immediately to face the required direction in a single step.
    Make sure that you record that step as a "frame".  You do not have to worry about
    the appearance of the oil leak.