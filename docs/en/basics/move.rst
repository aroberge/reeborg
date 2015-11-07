First program
=============

.. figure:: ../../../src/images/move.png
   :align: left

If you followed the instructions given at the very beginning
of this tutorial, you just had Reeborg take its very first step.
In the editor panel, there is a
single instruction::

    move()

``move()`` is an example of a Python **function**.
A function has a name; in this case, it is ``move``.
Valid names must start with either a letter or the underscore character "_"
and may contain letters, numbers or the underscore character "_".
The name of the function is followed by ``()``. This tells Reeborg (Python)
that the function must be *executed* or *called* (which are two synonyms).
This function must be on a line of its own. [We will see exception to this
rule later on.]

Occasionnally we will make **flowcharts** which are graphical representations of a program.
In a flowchart, a single instruction like ``move()`` might be represented
as follows:

.. figure:: ../../../flowcharts/move1.jpg
   :align: center

and a complete program containing this single instruction would be represented
as follows:

.. figure:: ../../../flowcharts/move.jpg
   :align: center

In a flowchart, the sequence of instructions follows the arrows, starting at "Start"
and ending at "Stop".

.. topic:: Try this!

    Add a second ``move()`` instruction so that Reeborg takes two steps instead
    of only one.

.. hint::

   Each instruction must appear on its own line, with no extra space
   at the beginning of the line.


Dealing with eRRoRs
-------------------

When writing computer programs, you will likely make many errors.
To see how Reeborg react to some errors, I will ask you to intentionally
introduce one error in the program.


.. topic:: Try this!

    Change ``move()`` to ``Move()`` (with an uppercase M) and try to
    execute the program.

What happened?
~~~~~~~~~~~~~~

Python, the language that Reeborg understands, is "case sensitive";
that is, lowercase letters have a different meanings than uppercase
ones. Now that you see how Reeborg deals with errors, go back,
fix the program and run the corrected version.


Rule #1
-------

Did you try all that I suggested to you above?  If not,
I urge you to go back to do it.  You see, the most important rule you
must follow if you wish to learn programming is the following:

.. important::

    Rule # 1
        Learning about computer programming is like learning to play
        a musical instrument: you have to **do it**, not simply read
        about it.


Every time I suggest you try something, I have a reason for doing
so.  Sometimes it will not be apparent right away, but I really encourage
you to try it.  I would even suggest to you that you should do more
than what I suggest and try different things just to explore further.

A special tool to help you
---------------------------

At the very top of Reeborg's World, you will find a button
titled **Reeborg's keyboard**.  If you click on it, a special
keyboard will appear.  By clicking on a each button, the corresponding
instruction, Python keyword, etc., will be inserted in the editor
automatically.   This can be useful to ensure that names are
spelled out correctly and that required parentheses are not forgotten.


.. admonition:: For teachers

    Reeborg's keyboard could be especially useful for three categories
    of users: the younger ones, who find typing on a normal keyboard
    difficult, those that use a touch screen, and those that use a non-English
    keyboard and may have trouble entering some symbols required for Python.

    As I am writing this note, Reeborg's keyboard includes one
    instruction (``no_highlight()``) which is not documented in this
    tutorial nor in the online help.  This type of omission could happen
    with other instructions ... if that is the case, please contact me
    so that I can make the required corrections.
