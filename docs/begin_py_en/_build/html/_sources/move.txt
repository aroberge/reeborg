

First program
=============

So, you just had Reeborg take its very first step. In the editor panel, there is a
single instruction::

    move()

``move()`` is an example of a Python **function**. 
A function has a name; in this case, it is ``move``.  
Valid names must start with either a letter or the underscore character "_"
and may contain letters, numbers or the underscore character "_".
The name of the function is followed by ``()``. This tells Reeborg (Python)
that the function must be *executed* or *called* (which are two synonyms).
This function must be on a line of its own.

.. topic:: Try this!

    Add a second ``move()`` instruction so that Reeborg takes two steps instead
    of only one.


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