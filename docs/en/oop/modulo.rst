Modulo operator
===============

Let's go back a step.  When I wrote and executed:

.. code-block:: javascript

   var r = new UsedRobot();
   view_source(RUR.control.turn_left);

I saw the following:

.. code-block:: javascript
   :emphasize-lines: 7

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

Notice the highlighted line with the ``%`` symbol; this symbol represents the **modulo operator**,
in both Python and Javascript, as well as many other languages.  Before I explain what it does
try the following Python code; the result will appear in Reeborg's Diary.
(Make sure to have Python selected as your programming language.)

.. code-block:: py3

    for i in range(10):
        print(i, i%4)

You should see two columns of integers. On the left, the integers increase steadily from 0 to 9.
On the right, the integers cycle from 0 to 3 in a repeating pattern.

The modulo operator calculates the **remainder** from division by an integer.  Remember when
you first learn about divisions, before learning about fractions.  You first learned that 8 divided
by 4 gave 2, but that 7 could not be divided by 4.  **Then, you learned that you could say
7 divided by 4 gives 1 with a remainder of 3.**   Yet, later, you saw that 7 divided by 4 was
1 and 3/4, etc.

So, the modulo operator calculates for you that remainder from division by an integer. In the
above code for the ``RUR.control.turn_left`` function, it is used to ensure that ``orientation``
cycles between the values from 0 to 3, incrementing by 1 (modulo 4) each time a left turn is done.
Since a right turn is equivalent to 3 left turns, this suggest that we increase the orientation by
3 instead of by 1 when attempting to implement a ``turn_right`` method.

.. note:: **Important**

    Make sure to turn off highlighting of the lines of code being executed
    since it injects some extra calls to ``RUR.rec.record_frame()`` for
    each line of code, and would lead to confusing results.



.. topic:: Try this!

   Try the following code to see if it works::

      class RepairedRobot(UsedRobot):
          def turn_right(self):
              self.body._orientation += 3
              self.body._orientation %= 4
              RUR.rec.record_frame()

      reeborg = RepairedRobot(3, 3)  # away from walls
      for i in range(4):
          reeborg.move()
          reeborg.turn_right()

You will notice that the "oil leak" does not look right; this is because it is drawn
from some assumed prior position and orientation.  Although we will eventually "fix"
the robot by removing the oil leak, it still might be nice to have this look better
while the oil leak is present.  To do so, we can pretend that we did two left turns
first, calculate what the position and orientation should be at that point, use
these as "previous values" which are used to draw a trace from the previous position
to the current one after the move.   Here's the code to do this::

  # Remember to turn off code highlighting

  class RepairedRobot(UsedRobot):
      def turn_right(self):

          # save previous values to know from where to start drawing
          self.body._prev_orientation = self.body._orientation
          self.body._prev_x = self.body.x
          self.body._prev_y = self.body.y

          # mimic two previous left turns for prior orientation
          self.body._prev_orientation += 2
          self.body._prev_orientation %= 4

          # do right turn
          self.body._orientation += 3
          self.body._orientation %= 4
          RUR.rec.record_frame()

  reeborg = RepairedRobot(3, 3)  # away from walls
  for i in range(4):
      reeborg.move()
      reeborg.turn_right()

.. topic:: Try it!

   Make sure you try to run the above code and try to understand what each line does.

.. topic:: Your turn!

   Add a ``turn_around`` method, which is equivalent to having Reeborg do
   two left turns in one single step.  Test your method by having Reeborg move
   around in its world and make sure that traces left by the "oil leak" are
   straight lines.
