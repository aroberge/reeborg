.. Breakout documentation master file, created by
   sphinx-quickstart on Wed May 28 21:28:54 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Breakout: Making a simple game with Python
==========================================

**Prerequisite:** you should have gone through the short
`Introduction to Object Oriented Programming in Python <../oop_py_en/>`_
before reading this tutorial.

Open `the game world environment <../../game.html>`_  in a separate tab
or browser window and follow along the instructions given in this tutorial 
to learn how to make your own game.   This tutorial is inspired from 
`Bill Mill's canvas tutorial <http://billmill.org/static/canvastutorial/index.html>`_.

The game made in this tutorial is not very pretty, nor does
it work perfectly: in particular, collisions between the ball and
the bricks are definitely **not** pixel perfect.
However, since you will be familiar with the entire
program (more than 600 lines of code), you will be able to make some
small tweaks yourself at the end to make it work better and make it
a better looking game.  To see the game in its final state, 
enter the following code in the editor::

    from breakout import Game
    game = Game()

and play with it!  Note that some bricks require more than one hit to
be broken and others can't be broken at all.
If you want a greater challenge, press the up arrow
key a few times while you play to speed up the game.  The game has
three levels.  Adding new levels is **extremely** easy.
As a simple example, you can replace the existing first level by one having
a single huge brick as follows::

    import breakout
    breakout.levels[1] = "\n.1."
    game = breakout.Game()
    
.. important::

   If you have started a game, and want to edit code in the editor, you
   **must** quit the game by pressing "q".
    
If you have both Firefox and Chrome, you may find it useful to open the 
`the game world environment <../../game.html>`_ in each browser.
In one browser, you could write the code the way I do it in this tutorial.
In the other, you could write your own version, perhaps adding different
features, or doing things differently.
You don't have to do this, of course: a single browser with two tabs, one 
for this tutorial and one for the game world environment, is sufficient
to go through this tutorial.

Reeborg's World saves the state of your code on **your** computer 
using the "Local Storage" of your browser whenever you run it
successfully.  
**However, I strongly recommend that you save your work regularly in a file
on your own computer.**

Have fun!


Contents:

.. toctree::
   :maxdepth: 2
   :numbered:

   canvas
   events
   animation
   stay
   help
   stay2
   paddle
   paddle2
   paddle3
   bounding_box
   game_over
   cleaning
   brick
   rule6
   rule6a
   bricks
   bounce
   mouse
   game_object
   rule7
   four_canvases
   images_bb


