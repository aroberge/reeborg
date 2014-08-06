Not ... true!
=============

Reeborg is upset. It's **not** raining; it's **not** snowing. Yet, he
cannot go outside and practise for his hurdles race.

Why, do you ask? It's because Reeborg is waiting for you to learn about
Python's **not**.

Time to be negative.
--------------------

Python, we can indicate that something is not true by writing ``not True`` 
which is synonymous of ``False``. Likewise, ``not False`` is
equivalent to ``True``. 

Please, make Reeborg happy
--------------------------

You have already written a program that enables Reeborg to jump hurdles;
parts of it went something like this:

.. code-block:: python

   def run_jump_or_finish ():
        if at_goal():
            # something
        elif front_is_clear():
            # something
        else:
            # something

.. topic:: Try it!

    Make Reeborg happy by re-writing this program in three other versions,
    by choosing different combinations of the negation keyword ``not`` **and**
    different combinations of ``if/elif/else``. 

You should use the three code samples below but pay close
attention to where the ``not`` keyword occur **and** to what is actually
included in each code block.

.. code-block:: python

   # first choice:

   def run_jump_or_finish ():
        if at_goal():
            # something
        elif not front_is_clear():
            # something
        else:
            # something

   # second choice ... trickier

   def run_jump_or_finish ():
        if not at_goal():
            if front_is_clear():
                # something
            else:
                # something
        else:
            # something

   # third choice:

   def run_jump_or_finish ():
        if not at_goal():
            if not front_is_clear():
                # something
            else:
                # something
        else:
            # something

