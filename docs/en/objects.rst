Objects, background images, etc.
================================

In addition to walls, which can block Reeborg's path, there are a number
of images that are used to represent various objects.


Basic objects
-------------

Reeborg can interact with various objects.  He can ``take()``
and ``put()`` down the following such objects, in particular,
|token| **token**, Reeborg's favourite object.  Tokens are like coins, except
most people find them of little value, especially with the smiling face
image; Reeborg begs to differ.

If there are more than one
object present, and Reeborg needs to specify which object to ``take()`` or
``put()`` down, Reeborg uses the name of the object as a string of character,
as in ``put("token")``  or ``take('token')``  [both single and double quotes
can be used, as long as they occur in pairs.]

In addition to tokens, Reeborg can interact with various geometrical
shapes, fruits, flowers, vegetables, etc.  [Many of these images
have been adapted from http://openclipart.com]


:apple: |apple|
:banana: |banana|
:carrot: |carrot|
:daisy: |daisy|
:dandelion: |dandelion|  While they can be pretty, dandelions are
  usually considered to be weeds - and often need to be removed from the world.
:leaf: |leaf|  Reeborg doesn't particularly likes leaves.
  The presence of a leaf (or more) in Reeborg's World usually
  indicates that Fall has arrived, the leaves are falling from the trees,
  and Reeborg must rake them instead of playing.  Given the opportunity,
  Reeborg always prefer to play.
:orange: |orange|
:strawberry: |strawberry|
:tulip: |tulip|
:square: |square|
:star: |star|
:triangle: |triangle|  A triangle of this kind could only exist inside
  Reeborg's World.  Here's a close-up view of this triangle.

|impossible-triangle|


Background tiles
----------------

:grass: |grass|  Harmless for Reeborg to walk on.
:gravel: |gravel|  Harmless for Reeborg to walk on.
:water: |water| Can cause Reeborg to drown.  Fortunately, Reeborg can
  detect it using ``front_is_clear()``.
:mud: |mud| Can cause Reeborg to get hopelessly stuck.  Reeborg cannot
  detect mud before stepping into it.
:brick wall: |bricks|  Reeborg can crash into this; fortuntaly, it can
    detect it using ``front_is_clear()``.
:ice: |ice| Causes Reeborg to slip and continue it movement towards the next
  tile.  This could be problematic if an obstacle lies there.  Reeborg cannot
  detect ice before stepping into it.

|slip|

Special objects
---------------

Special objects, like normal objects, are drawn above background tiles.
However, they can not be picked up by Reeborg and they can change the
expected behaviour of a tile.

:bridge: |bridge|  Allows Reeborg to cross safely over water.  Reeborg will
  always express its happiness at being able to cross over a bridge instead
  of falling in water.
:fences:  |fence4| - |fence5| - |fence6| - |fence7|
  Can be detected by Reeborg.  If Reeborg is asked to move where a fence is
  located, Reeborg will attempt to jump over it but will fail miserably.
  Note that to make enclosed areas, you might have to overlap the image of the
  last one over one of the other three images.
:box: |box| Boxes are pushed out of the way by Reeborg ... provided something
  else, like a wall or another box, etc., is not preventing the box to move.
  A box pushed by Reeborg in the water will float and become a bridge allowing
  Reeborg to safely cross over water.  The example below illustrates this

|box-blocked|

Goals
-----

Reeborg, must accomplish certain goals, like reaching a final position,
or dropping certain objects at a certain location.
To indicate that one (or more) object must be dropped at a given
position, these grey images are used:

|apple_goal| |banana_goal| |carrot_goal|
|daisy_goal| |dandelion_goal| |leaf_goal| |orange_goal|
|strawberry_goal| |tulip_goal| |square_goal| |star_goal|
|triangle_goal| |token_goal|


To indicate that Reeborg must end its task at a given final position,
one of these images is used:

|green_home_tile| |house| |racing_flag|

.. |green_home_tile| image:: ../images/green_home_tile.png
.. |house| image:: ../images/house.png
.. |racing_flag| image:: ../images/racing_flag.png

.. |apple| image:: ../images/apple.png
.. |banana| image:: ../images/banana.png
.. |carrot| image:: ../images/carrot.png
.. |daisy| image:: ../images/daisy.png
.. |dandelion| image:: ../images/dandelion.png
.. |leaf| image:: ../images/leaf.png
.. |orange| image:: ../images/orange.png
.. |strawberry| image:: ../images/strawberry.png
.. |tulip| image:: ../images/tulip.png
.. |square| image:: ../images/square.png
.. |star| image:: ../images/star.png
.. |triangle| image:: ../images/triangle.png
.. |impossible-triangle| image:: ../images/impossible-triangle.png
.. |token| image:: ../images/token.png

.. |grass| image:: ../images/grass.png
.. |gravel| image:: ../images/gravel.png
.. |ice| image:: ../images/ice.png
.. |water| image:: ../images/water.png
.. |mud| image:: ../images/mud.png
.. |bricks| image:: ../images/bricks.png
.. |slip| image:: ../images/ice_slip.gif

.. |bridge| image:: ../images/bridge.png
.. |box| image:: ../images/box.png
.. |fence4| image:: ../images/fence4.png
.. |fence5| image:: ../images/fence5.png
.. |fence6| image:: ../images/fence6.png
.. |fence7| image:: ../images/fence7.png
.. |box-blocked| image:: ../images/box_blocked.gif

.. |apple_goal| image:: ../images/apple_goal.png
.. |banana_goal| image:: ../images/banana_goal.png
.. |carrot_goal| image:: ../images/carrot_goal.png
.. |daisy_goal| image:: ../images/daisy_goal.png
.. |dandelion_goal| image:: ../images/dandelion_goal.png
.. |leaf_goal| image:: ../images/leaf_goal.png
.. |orange_goal| image:: ../images/orange_goal.png
.. |strawberry_goal| image:: ../images/strawberry_goal.png
.. |tulip_goal| image:: ../images/tulip_goal.png
.. |square_goal| image:: ../images/square_goal.png
.. |star_goal| image:: ../images/star_goal.png
.. |triangle_goal| image:: ../images/triangle_goal.png
.. |token_goal| image:: ../images/token_goal.png

