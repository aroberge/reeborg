`Previous <Javascript:void(0);>`__ `Table of
Contents <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__

A Used Robot gets his name
==========================

So far, all the programs we wrote instructing Reeborg to accomplish
tasks have been written without using the dot notation. Let's change
this, starting with a simple example.

First, we start by selecting the world Empty which has no robot in it.

Now, you might remember what we said about Reeborg: it is old and faulty
... since it is a Used Robot. [We will learn how to fix it and its
friends later.] So, we will create our first instance of a ``UsedRobot``
and name it, appropriately, Reeborg! We will then instruct it to take
one step.

.. code:: jscode

    var Reeborg = new UsedRobot();
    Reeborg.move();

If you don't like the combination of ``new`` with ``Used``, remember
that while Reeborg might be a ``UsedRobot``, it is ``new`` to you
[spoken like a true used robot salesperson].

Try it!
-------

You might want to write a more complicated program, having Reeborg's
name preceding any command given to him.

One more keyword: ``instanceof``
--------------------------------

We have already said that Reeborg, as defined above, is an ***instance
of*** a ``UsedRobot``. Open Reeborg's diary and verify this:

.. code:: jscode

    var Reeborg = new UsedRobot();
    write( Reeborg instanceof UsedRobot);

Actually, ``UsedRobot`` is derived from a more primitive class of
objects: ``RUR.Robot`` as can easily be verified.

.. code:: jscode

    var Reeborg = new UsedRobot();
    write( Reeborg instanceof UsedRobot);
    write( Reeborg instanceof RUR.Robot);

However, a ``RUR.Robot`` is not a ``UsedRobot``:

.. code:: jscode

    var Reeborg = new RUR.Robot();
    write( Reeborg instanceof UsedRobot);
    write( Reeborg instanceof RUR.Robot);

We will learn more about "derived" classes of objects later.

`Previous <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__
