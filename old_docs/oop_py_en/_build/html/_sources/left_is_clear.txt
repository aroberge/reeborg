Nothing to the left?
====================

As you know, Reeborg can see if there is a wall blocking its way,
using ``front_is_clear``; he can also see if there is a wall
to its right usign ``right_is_clear``, but cannot do the same
on its left.  You are going to fix that.

Exploring the source code
-------------------------

Let's look at the source code. Using::

    view_source(front_is_clear)

we see:

.. code-block:: javascript

  function () {
        return RUR.control.front_is_clear(RUR.current_world.robots[0]);
      }

with a similar result for ``view_source(right_is_clear)``.  Let's
dig further.  By running::

    view_source(RUR.control.front_is_clear)

I get the following code (you might get something slightly different)

.. code-block:: javascript

    function (robot, flag){
        var coords;
        if (!flag) {
            RUR.rec.record_frame();
        }
        switch (robot.orientation){
        case RUR.EAST:
            coords = robot.x + "," + robot.y;
            if (RUR.control.is_wall_at(coords, "east")) {
                return false;
            }
            break;
        case RUR.NORTH:
            coords = robot.x + "," + robot.y;
            if (RUR.control.is_wall_at(coords, "north")) {
                return false;
            }
            break;
        case RUR.WEST:
            if (robot.x===1){
                return false;
            } else {
                coords = (robot.x-1) + "," + robot.y; // do math first before building strings
                if (RUR.control.is_wall_at(coords, "east")) {
                    return false;
                }
            }
            break;
        case RUR.SOUTH:
            if (robot.y===1){
                return false;
            } else {
                coords = robot.x + "," + (robot.y-1);  // do math first before building strings
                if (RUR.control.is_wall_at(coords, "north")) {
                    return false;
                }
            }
            break;
        default:
            throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.front_is_clear().");
        }
        return true;
    }

This is a bit daunting.  It uses a Javascript construct ``switch/case`` that does not exist in Python.  
Still, you can get a sense of what it does by using the following trick: 
If you when you have ``switch(A) ... case B ... case C ....`` think of this as
``if A==B .... elif A==C ...``.   We could implement the equivalent in Python for a ``left_is_clear`` method,
but there is a better way.   Look at the following::

   view_source(right_is_clear)

The result I see is this:

.. code-block:: javascript

    function (robot){
        var result;
        RUR.control.__turn_right(robot, true);
        result = RUR.control.front_is_clear(robot, true);
        RUR.control.turn_left(robot, true);
        return result;
    }

You see, Reeborg's designers had implemented a prototype version enabling 
Reeborg to turn right.  They used Python's convention of starting a method
name with two consecutive underscore to denote something "private" that is
not meant for outsiders to use -- or, at least, they consider it not ready
to be used.  

Looking at the entire function, here what happens:

#. Reeborg turns to its right
#. Reeborg uses ``front_is_clear`` to see if there is a wall in front of its new orientation
#. Reeborg turns back to its original position

Note the use of a second argument ``true`` in the various methods.
If we look at the corresponding code using ``view_source``, we see that
``true`` is the value assigned to the variable ``no_frame`` which 
has the effect of not recording the frame.  So, when Reeborg turns right (or left),
we do not actually see it happen on the screen.  Sneaky!...

.. topic:: Your turn!

   First, modify your ``turn_right`` method so that it accepts a default argument with
   the value ``False`` given as a default.  This means, that your it should start as follows::

       def turn_right(self, no_frame=False):

   
   Make sure that if ``no_frame`` is set equal to ``True`` when the method is called,
   no frame recording will take place.

   Then, using the logic of the above ``right_is_clear`` Javascript function,
   implement a ``left_is_clear`` method for your RepairedRobot class.  Make sure that you
   pass a second argument of ``True`` to all methods you call within ``left_is_clear``.

   Finally, test it in the world **Empty** with the following code::

       reeborg = RepairedRobot()
       while reeborg.left_is_clear():
           reeborg.turn_left()

   If you have done things properly, Reeborg should make a single left turn.