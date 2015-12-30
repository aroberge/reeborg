.. IntroOOPPython documentation master file, created by
   sphinx-quickstart on Tue May 13 16:08:53 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Introduction to OOP in Python with Reeborg
==========================================

As you know, Reeborg is in poor shape. 
It can only turn to its left, its compass is broken as
it can only be used to determine whether or not Reeborg is facing North.
Reeborg cannot turn its head left, so it cannot find out if there is
a wall to its left without turning its entire body.
Finally, it leaks oil which is bad for itself and the environment.

Using the power of Object-Oriented Programming, you will learn how to
fix Reeborg and how to give it additional capabilities.

.. note::

   **For the advanced reader**

   If you are not a beginner Python programmer and are experimenting on
   your own based on what you already know, 
   you may find that some advanced but valid Python code you write
   will occasionally raise some unexpected exceptions.  The reason is that most
   of the code powering Reeborg's world is written in Javascript and
   there's only a thin layer that has been written in Python using
   Brython.  As a result some Javascript objects, methods or attributes
   are not directly available.  Furthermore, animations are done by
   cloning and saving the world state as a JSON string; if you
   attempt to create your own class using some objects already present,
   you may unknowingly create a circular reference which will prevent
   the cloning and raise an exception.

   I could have written the entire program in Python using Brython ...
   but it would have made the situation worse if I had tried to use
   the result to enable programmers to use Javascript or CoffeeScript
   as their language of choice -- which they can do now.



Contents:

.. toctree::
   :maxdepth: 2
   :numbered:
   
   oop
   turn_right
   turn_right2
   javascript
   modulo
   facing_south
   left_is_clear
   leak
   testing



