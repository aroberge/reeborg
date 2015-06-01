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
:ice: |ice| Causes Reeborg to slip and continue it movement towards the next
  tile.  This could be problematic if an obstacle lies there.  Reeborg cannot
  detect ice before stepping into it.
:water: |water| Can cause Reeborg to drown.  Fortunately, Reeborg can
  detect it using front_is_clear().
:mud: |mud| Can cause Reeborg to get hopelessly stuck.  Reeborg cannot
  detect mud before stepping into it.


.. |apple| image:: /images/apple.png
.. |banana| image:: /images/banana.png
.. |carrot| image:: /images/carrot.png
.. |daisy| image:: /images/daisy.png
.. |dandelion| image:: /images/dandelion.png
.. |leaf| image:: /images/leaf.png
.. |orange| image:: /images/orange.png
.. |strawberry| image:: /images/strawberry.png
.. |tulip| image:: /images/tulip.png
.. |square| image:: /images/square.png
.. |star| image:: /images/star.png
.. |triangle| image:: /images/triangle.png
.. |impossible-triangle| image:: /images/impossible-triangle.png
.. |token| image:: /images/token.png

.. |grass| image:: /images/grass.png
.. |gravel| image:: /images/gravel.png
.. |ice| image:: /images/ice.png
.. |water| image:: /images/water.png
.. |mud| image:: /images/mud.png

