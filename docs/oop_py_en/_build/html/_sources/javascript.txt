Javascript
==========

Remember when you ran this code?

.. code-block:: py3

    r = UsedRobot()
    inspect(r)

We are going to do the equivalent with Javascript. 

At the very top of the Reeborg's World window, click to select
Javascript instead of Python.  Then run the following code:

.. code-block:: javascript

   var r = new UsedRobot();
   inspect(r);

If you look in the diary, you will see ``body`` as we had in the
Python code, but will also see some familiar methods like
``at_goal()``, ``move()`` and many others.

Now we are ready to look at some code.

.. topic:: Do this!

   Execute the following Javascript code and look at the result
   in the Diary.
   
   .. code-block:: javascript
   
       var r = new UsedRobot();
       view_source(r.turn_left);
       
   Make sure the code is exactly as written above.

.. important::

   You may have noticed that I usually do **not** show you the result of running
   these short programs.  One reason is that I occasionnally change the
   Javascript or the Python code powering Reeborg's World in order to
   add new features or fix bugs.  By looking at the code displayed in
   the Diary, you have access to my best code (so far) which may differ
   from the one that existed when I wrote this tutorial.  However, while
   there might be some differences between the two, it should be close 
   enough for you to figure out what is going with the help of this tutorial.

Based on the result that I see printed in Reeborg's Diary, my next guess
is to execute the following.

.. code-block:: javascript

   var r = new UsedRobot();
   view_source(RUR.control.turn_left);
   
After doing so, I see the following:

.. code-block:: javascript

   function (robot, no_frame){
       "use strict";
       robot._prev_orientation = robot.orientation;
       robot._prev_x = robot.x;
       robot._prev_y = robot.y;
       robot.orientation += 1;  // could have used "++" instead of "+= 1" 
       robot.orientation %= 4;
       if (no_frame) return;
       RUR.control.sound_id = "#turn-sound";
       RUR.rec.record_frame();
   }

As mentioned above, you might see something slightly different.
Here is the equivalent Python code::

   def (robot, no_frame):
       robot._prev_orientation = robot.orientation
       robot._prev_x = robot.x
       robot._prev_y = robot.y
       robot.orientation += 1
       robot.orientation %= 4
       if no_frame:
           return
       RUR.control.sound_id = "#turn-sound"
       RUR.rec.record_frame()

We will come back to this code sample later; for now, remember that we were
talking about "recording frames" ... It looks as though the last instruction
is the one we were looking for.  Time to go back to coding in Python.
Select Python as the programming language at the top of Reeborg's World window
before running the following program.

.. topic:: Try this!

   Select world **Empty** and run the following code to 
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

.. topic:: Your turn!

   Design a robot class that can "hop" horizontally, only increasing
   the ``x`` coordinate by 1 each time (like in a ``move`` method) but
   effectively jumping over walls.  Create a robot instance and have
   it solve the hurdles challenges, **Hurdles 1** to **Hurdles 4**, going
   in a straight line.  For each existing world, 
   you will first have to click on "Edit World" and
   remove the robot already present.  You may find it useful to then click
   on "browser:Save" so that you can reload this robot-free world if needed.
   A complete solution can be written in only 7 lines of code.
   
   If you have forgotten about incrementing variables, you can either look
   at the code above on this page to give you a hint, or go back and
   read `Increment <../begin_py_en/increment.html>`_.