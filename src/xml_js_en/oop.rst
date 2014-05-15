`Previous <Javascript:void(0);>`__ `Table of
Contents <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__

The dot notation
================

We are soon going to learn about a modern programming style called
Object-Oriented Programming [OOP]. Javascript is known as a Prototype
based language rather than an OOP language, but **for the basic concepts
covered in this lesson**, Prototype based languages and OOP languages
are indistinguishable. Before we start writing object-oriented programs,
we will first learn how to read and understand the notation used.

All in a dog's day
------------------

Fido is a dog. During a typical day, he does various actions: he eats,
runs, sleeps, etc. Here's how an object-oriented programmer might write
this.

.. code:: jscode

    var Fido = new Dog();
    Fido.eats();
    Fido.runs();
    Fido.sleeps();

In addition, Fido has various qualities or attributes. These are
variables, like we have seen before except that they "belong" to Fido.
He is tall (for a dog) and his hair is black. Here's how the programmer
might write the same things.

.. code:: jscode

    Fido.size = "tall";
    Fido.hair_colour = "black";

In the object-oriented language, we have the following:

-  ``Dog`` is an example of a *class* of **objects**.
-  ``Fido`` is an **instance** (or particular object) in the Dog class.
-  ``eats(), runs()`` and ``sleeps()`` are **methods** of the Dog class;
   'methods' are essentially like 'functions' which we saw before (the
   only difference is that they belong in a given
   class/object/instance).
-  ``size`` and ``hair_colour`` are attributes of a given
   instance/object; attributes can take any value that a "normal"
   variable can take.
-  The connection between the attributes or the methods with the object
   is indicated by a "dot" (".") written between them.

Objects can also have other objects that belong to them, each with their
own methods or attributes:

.. code:: jscode

    Fido.tail.wags();
    Fido.tail.type = "bushy";
    Fido.left_front_paw.moves();
    Fido.head.mouth.teeth.canine.hurts();

Let's now see how Reeborg uses the "dot" notation.

`Previous <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__
