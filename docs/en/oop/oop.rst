The dot notation
================

We are going to learn about a modern programming style called
Object-Oriented Programming [OOP].
Before we start writing object-oriented programs,
we will first learn how to read and understand the notation used.

All in a dog's day
------------------

Fido is a dog. During a typical day, he does various actions: he eats,
runs, sleeps, etc. Here's how an object-oriented programmer might write
this::

    Fido = Dog()
    Fido.eats()
    Fido.runs()
    Fido.sleeps()

In addition, Fido has various qualities or attributes. These are
variables, like we have seen before except that they "belong" to Fido.
It is tall (for a dog) and its hair is black. Here's how the programmer
might write the same things::

    Fido.size = "tall";
    Fido.hair_colour = "black";

In the object-oriented language, we have the following:

-  ``Dog`` is an example of a *class* of **objects**.
-  ``Fido`` is an **instance** (or particular object) in the Dog class.
-  ``eats(), runs()`` and ``sleeps()`` are **methods** of the Dog class;
   **methods** are essentially like **functions** which we have seen before (the
   only difference is that they *belong* in a given
   class/object/instance).
-  ``size`` and ``hair_colour`` are attributes of a given
   instance/object; attributes can take any value that a "normal"
   variable can take.
-  The connection between the attributes or the methods with the object
   is indicated by a "dot" (".") written between them.

Objects can also have other objects that belong to them, each with their
own methods or attributes::

    Fido.tail.wags()
    Fido.tail.type = "bushy";
    Fido.left_front_paw.moves()
    Fido.head.mouth.teeth.canine.hurts()

Let's now see how Reeborg uses the dot notation.

A Used Robot gets his name
--------------------------

So far, all the programs we wrote instructing Reeborg to accomplish
tasks have been written without using the dot notation. Let's change
this, starting with a simple example.

First, we start by selecting the world **Empty** which has no robot in it.

Now, you might remember what we said about Reeborg: it is old and faulty
... since it is a Used Robot. [We will learn how to fix it and its
friends later.] So, we will create our first instance of a ``UsedRobot``
and name it, appropriately, Reeborg! We will then instruct it to take
one step.

.. topic:: Try it!

   Create a robot and have it take its first step using the following code::

      reeborg = UsedRobot()
      reeborg.move()

   When you are done, try to write a more complicated program, having Reeborg's
   name preceding any command given to him.

.. important::

   You may have noticed that I named the robot ``reeborg`` with all lower case
   letters.  It is a convention in Python (and many other programming languages)
   to give a name starting with a lower case letter to *instances* of a class of objects,
   reserving names that start with an upper case letter, like ``UsedRobot``, for
   classes of objects.

   **However**, I will often **not** follow this convention in naming Reeborg and
   other robots.

Many robots
-----------

.. topic:: Try this!

   Select the world **Empty** which has no robot in it.  Then enter the following
   code::

       reeborg = UsedRobot()
       reeborg.move()
       erdna = UsedRobot()
       erdna.turn_left()
       erdna.move()
       reeborg.move()

   You can add even more robots!


For the advanced reader
-----------------------

In addition to the dot notation, there is another way to get the value of
attributes or methods that belong to an object in Python.  Suppose I have a ``Dog()``
as above, for which I can have the following::

    Fido.size = "tall"
    Fido.run()  # is an action that Fido can do

With Python, one can use the built-in function ``getattr``, whose name
is meant to remind of "get attribute", as follows::

    how_big = getattr(Fido, "size")    # equivalent to how_big = "tall"
    action = getattr(Fido, "run")
    action()       # equivalent to Fido.run()

``getattr`` can be very useful in some contexts but its use is overly
complicated for what we need to do in Reeborg's world.