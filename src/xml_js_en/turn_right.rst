`Previous <Javascript:void(0);>`__ `Table of
Contents <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__

Many right turns
================

Select the world Empty which has no robot in it. Next define the
following function:

.. code:: jscode

    function turn_right(robot) {
        robot.turn_left();
        robot.turn_left();
        robot.turn_left();
    }

Note how we pass the variable ``robot`` as an argument to the function
and how we use it inside the function; this variable will be the robot's
name.

After defining this function, you can use it as follows:

.. code:: jscode

    var Reeborg = new UsedRobot();
    var Erdna = new UsedRobot();
    Reeborg.move();
    turn_right(Reeborg);
    Erdna.turn_left();
    turn_right(Erdna);

This works ... but it does not look right since the *function* that is
used to make the robots turn right uses a different syntax from the
*method* that is used to make them left. There has to be a better way...

`Previous <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__
