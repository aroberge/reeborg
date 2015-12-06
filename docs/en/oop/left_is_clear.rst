Nothing to the left?
====================

As you know, Reeborg can see if there is a wall blocking its way,
using ``front_is_clear``; he can also see if there is a wall
to its right using ``right_is_clear``, but cannot do the same
on its left.  You are going to fix that.

Exploring the source code
-------------------------

With Javascript chosen as the default language, let's look at the source code. Using::

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
  :emphasize-lines: 3

  function (robot){
      var tile, tiles, tilename;
      if( RUR.control.wall_in_front(robot)) {
          return false;
      }
      tile = RUR.control.tile_in_front(robot);
      if (tile) {
          if (tile.detectable && tile.fatal){
                  if (tile == RUR.tiles.water) {
                      if (!RUR.control._bridge_present(robot)){
                          return false;
                      }
                  } else {
                      return false;
                  }
          }
      }

      tiles = RUR.control.top_tiles_in_front(robot);
      if (tiles) {
          for (tilename in tiles) {
              if (RUR.top_tiles[tilename] !== undefined &&
                  RUR.top_tiles[tilename].detectable &&
                  RUR.top_tiles[tilename].fatal) {
                  return false
              }
          }
      }

      return true;
  }

Even if you are not familiar with Javascript, you should be able to guess
that ``RUR.control.wall_in_front`` is likely related to figuring out if
a wall is blocking Reeborg's way.   Let's have a look by executing::

    view_source(RUR.control.wall_in_front)

Here is what I see

.. code-block:: javascript

    function (robot) {
        var coords;
        switch (robot._orientation){
        case RUR.EAST:
            coords = robot.x + "," + robot.y;
            if (robot.x == RUR.COLS){
                return true;
            }
            if (RUR.control.is_wall_at(coords, "east")) {
                return true;
            }
            break;
        case RUR.NORTH:
            coords = robot.x + "," + robot.y;
            if (robot.y == RUR.ROWS){
                return true;
            }
            if (RUR.control.is_wall_at(coords, "north")) {
                return true;
            }
            break;
        case RUR.WEST:
            if (robot.x===1){
                return true;
            } else {
                coords = (robot.x-1) + "," + robot.y; // do math first before building strings
                if (RUR.control.is_wall_at(coords, "east")) {
                    return true;
                }
            }
            break;
        case RUR.SOUTH:
            if (robot.y===1){
                return true;
            } else {
                coords = robot.x + "," + (robot.y-1);  // do math first before building strings
                if (RUR.control.is_wall_at(coords, "north")) {
                    return true;
                }
            }
            break;
        default:
            throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
        }
        return false;
    }

This is a bit daunting.  It uses a Javascript construct ``switch/case`` that does not exist in Python.
Still, you can get a sense of what it does by using the following trick:
If you when you have ``switch(A) ... case B ... case C ....`` think of this as
``if A==B .... elif A==C ...``.   We could implement the equivalent in Python for a ``left_is_clear`` method,
but there is a better way.   Look at the following::

   view_source(RUR.control.right_is_clear)

The result I see is this:

.. code-block:: javascript

    function (robot){
        var result;
        RUR.control.__turn_right(robot, true);
        result = RUR.control.front_is_clear(robot);
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

.. important::

    The following explanation using ``no_frame`` is no longer valid; it
    needs to be revised.

Note the use of a second argument ``true`` in the various methods.
If we look at the corresponding code using ``view_source``, we see that
``true`` is the value assigned to the variable ``no_frame`` which
has the effect of not recording the frame.  So, when Reeborg turns right (or left),
we do not actually see it happen on the screen.  Sneaky!...

.. topic:: Your turn!

   First, modify your ``turn_right`` method so that it accepts a default argument with
   the value ``False`` given as a default.  This means, that your it should start as follows::

       def turn_right(self):


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