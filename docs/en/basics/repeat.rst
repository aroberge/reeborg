Repeat
======

Often, we will find that we want to repeat a series of instructions a
fixed number of times. There is a way in Python to do so ... but it
has too many new concepts to explain at this time. I will just show you
the code, and immediately introduce ``repeat``, a simpler replacement
for it, unique to Reeborg's World.  The standard way
is known as a **for loop** and is written as follows:

.. code-block:: python

    for i in range(n):
        # some
        # instructions
        # here

.. note::

   Using ``repeat`` will not work in Python programs meant to be
   run outside of Reeborg's World.

Now that you have seen this cryptic code which includes two Python
keywords, ``for`` and ``in``, as well as a built-in function, ``range``,
let's introduce instead ``repeat``.
We will use the example ``get_money()`` from the previous newspaper
delivery example::

    def get_money():
        take("token")
        take("token")
        take("token")
        take("token")
        take("token")

Inside ``get_money()``, we repeat 5 times the command ``take()``.
Using ``repeat``, we can rewrite the above as follows::

    def get_money():
        repeat 5:
            take("token")

Now, by using ``repeat`` we have yet
another way to eliminate repetitions in our code.

.. topic:: Try it!

    Change your program for the newspaper problem so that
    you use ``repeat`` wherever it would shorten the code.
    If you did not save it,
    go back to the previous lesson and redo it using ``repeat``.

