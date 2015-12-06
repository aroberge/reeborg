Javascript
==========

Remember when you ran this code?

.. code-block:: py3

    r = UsedRobot()
    inspect(r)

We are going to do the equivalent with Javascript.

At the very top of the Reeborg's World window, click to open
the "Additional options" dialog and select
Javascript instead of Python.  Then run the following code:

.. code-block:: javascript

   var r = new UsedRobot();
   inspect(r);

Here is what I see when I do this::

    body
    at_goal()
    build_wall()
    front_is_clear()
    carries_object()
    is_facing_north()
    move()
    put()
    token_here()
    right_is_clear()
    object_here()
    take()
    turn_left()


So, nothing that starts and end with a double underscore, and we see
``body`` as we had in the
Python code, but will also see some familiar methods like
``at_goal()``, ``move()`` and many others.

Now we are ready to look at some code.

.. topic:: Do this!

   Execute the following Javascript code and look at the result
   in the Diary.

   .. code-block:: javascript

       var r = new UsedRobot();
       view_source(r.turn_left);

   Make sure the code is exactly as written above.  Note that I use
   ``view_source`` instead of ``inspect`` which, as it turns out, would
   not help me at all in this case.

Based on the result that I see printed in Reeborg's Diary

.. code-block:: javascript

   function () {
           RUR.control.turn_left(this.body);
       }

my next guess is to execute the following.

.. code-block:: javascript

   var r = new UsedRobot();
   view_source(RUR.control.turn_left);

After doing so, I see the following:

.. code-block:: javascript

   function (robot){
       "use strict";
       robot._prev_orientation = robot._orientation;
       robot._prev_x = robot.x;
       robot._prev_y = robot.y;
       robot._orientation += 1;  // could have used "++" instead of "+= 1"
       robot._orientation %= 4;
       RUR.control.sound_id = "#turn-sound";
       RUR.rec.record_frame();
   }

As mentioned above, you might see something slightly different.
Here is the equivalent Python code:

.. code-block:: py3

    def unknown_function_name (robot):
        robot._prev_orientation = robot._orientation
        robot._prev_x = robot.x
        robot._prev_y = robot.y
        robot._orientation += 1
        robot._orientation %= 4
        RUR.control.sound_id = "#turn-sound"
        RUR.rec.record_frame()

We will come back to this code sample later; for now, remember that we were
talking about "recording frames" ... It looks as though the last instruction
is the one we were looking for.  Time to go back to coding in Python.
Select Python as the programming language at the top of Reeborg's World window
before running the following program.

.. topic:: Try this!

   Select world **Empty** and run the following code **with the code highlighting
   turned off** to
   confirm that you can add new capabilities to
   Reeborg and show its effect properly at each step.

   .. code-block:: py3

      class Teleporter(UsedRobot):

         def jump(self, x, y):
            self.body.x = x
            self.body.y = y
            RUR.rec.record_frame()

      jumper = Teleporter()
      jumper.jump(3, 5)
      jumper.jump(7, 2)

    Try again afterwards with the code highlighting turned on.  Can you
    figure out what is going on?

.. topic:: Your turn!

   Design a robot class that can "hop" horizontally, only increasing
   the ``x`` coordinate by 1 each time (like in a ``move`` method) but
   effectively jumping over walls.  Create a robot instance and have
   it solve the hurdles challenges, **Hurdles 1** to **Hurdles 4**, by going
   in a straight line, straight through walls!  For each existing world,
   you will first have to click on "Additional options" followed by "Edit world" and
   remove the robot already present; save the corresponding world in a name
   of your choice; that way, it will be added to the world menu.

   A complete solution can be written in only 7 lines of code.

.. hint::

   You can move the robot in the desired way by incrementing its x
   variable as follows::

       self.body.x += 1

