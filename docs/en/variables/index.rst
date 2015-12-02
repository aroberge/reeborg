Variables
==============

At the very beginning of this tutorial, we wrote the following:

.. epigraph::

    ``move()`` is an example of a Python **function**.
    A function has a name; in this case, it is ``move``.
    Valid names must start with either a letter or the underscore character "_"
    and may contain letters, numbers or the underscore character "_".
    The name of the function is followed by ``()``. This tells Reeborg (Python)
    that the function must be *executed* or *called* (which are two synonyms).

Functions are an example of what we call an **object**.
We can give one or many names to a given object.  We call
**variable** the name that we give to an object.
Python uses the equal sign ``=`` to associate a name (variable) and
an object in the following way::


    variable = object

For example, if you find that ``turn_left()`` is too long to write, you
could define another name (variable) for it as follows::


    left = turn_left    # no parentheses!
    left()              # use it

.. topic:: Your turn!

    Use a new name (variable) for at least one existing function in a program.
    **Can you use two different names to refer to the same object in a
    single program?**

.. toctree::
   :maxdepth: 2
   :numbered:

   variables
   diary
   think
   newspaper3
   world
   increment
   scope
   comparison
   return
   listes
   string_index
   for
   arguments1a
   arguments1b
   slice
   harvest3

