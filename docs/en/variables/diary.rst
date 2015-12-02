Reeborg's diary
===============

.. index:: print(), function argument

Have Reeborg execute the following program::

    print()

You should see a pop-up window appear with the title **Reeborg writes:**.
This window is Reeborg's diary.  Feel free to move it around
on your computer screen.

.. note::

    **Important:** the example on the right does not execute the
    function ``move``; however, if we do::

        print( move() )

    so that ``move`` is executed, the Python keyword ``None`` will
    be printed.  Why that is the case will be explained later.

Now, run the following program::

    print(move)

At the time I revised this tutorial, the result in Reeborg's diary was::

    <function move>

(previously, instead of ``move``, ``_move_`` was the name that appeared for
reason that you might guess after having read this page.)
What if we were to define another variable (name) for the same object (function)?

.. code-block:: py3

    step = move
    print(step)
    print(move)

The result is::

    <function move>
    <function move>

This shows clearly that ``=`` simply gives a name to an object,
the object in this case being what Python calls ``<function move>``
when asked to print it.
On the other hand, if we define a completely new function, like::

    #  step = move
    def step():
        move()

    print(step)

the result will be::

    <function step>

which is a different object from ``<function move>`` even though,
if called, ``step()`` would have the exact same result as ``move()``.


A function can have an argument
-------------------------------

In computer programs, the word **argument** refers to a variable
that determines the result of a function.
For example, as we have seen::

    print(move)

the variable ``move`` is the argument of the function ``print()``.
The argument of a function appears between the parentheses which
indicate that the function is called.


Writing text
------------

Writing the name of a function like we have done above by
using the ``print()`` function is something that is done
**extremely** rarely when writing programs.
What is done much, much more often is to write text.

In programming terms, a *character* is any letter, number or symbol that
can be printed and a *string of characters*, or simply *string*, is any
sequence of character that can be printed. For example, try the
following::

    print("Hello world!")
    print('Hello again.')

.. index:: \', \", \n, escape character, escape sequence

Note that the quotes that surround the *string* have to be the same,
either double quotes like ", or single quotes like '. To have a string
that contains some quote characters, we can either surround it by quotes
of a different type or use the *escape character* ``\``::

    print("Let's go.")
    print('Let\'s go.')

We can combine strings using the ``+`` symbol::

    print("Goodbye! " + "And thanks for all the fish.")

We can also start on a new line using the following *escape sequence*:
``\n``::

    print("Thank you. \nTry again")

.. topic:: Try it!

    Make sure you try to run the above code samples or some similar.


Reeborg knows mathematics
-------------------------

.. index:: +, *, -, /, //

.. topic:: Try this!

    Try running the following program and look at the output in Reeborg's
    diary.

    .. code-block:: py3

        print( 2 + 3 )  # adding numbers
        print( 2 * 3 )  # multiplying numbers
        print( 3 - 2 )  # subtracting numbers
        print( 6 / 2 )  # dividing numbers
        print( 1 + 3 * 2 ) # multiplication is done before addition

        # using parentheses to change normal order of operations
        print( (1 + 3) * 2 )

        print( 2 ** 5 ) # power ... 2**5 = 2 * 2 * 2 * 2* 2

.. note::

    Note that spaces around the operators like ``+`` and ``*``
    are ignored by Python; however, they can make it easier for humans
    to read the code.

In the above examples, the result was always an integer (or whole number)
except when dividing numbers which gave a **floating point** number:
``6 / 2`` gives ``3.0``.

If we want the result of dividing two numbers to be an integer,
we use the double division sign instead::

    print( 6 // 2 )  # integer division

Using variables
---------------

We have already seen the idea of using different names (variables) as synonyms.
Let's use this idea again as explore
mathematical operations some more::

    length = 4
    width = 6
    area = length * width  # area of a rectangle
    print(area)            # will output 24

.. topic:: Try it!

    Make up your own examples and run them.


.. important::

   The *character* "2" is not the same as the *number* 2.  Try out
   the following::

       print("2" + 2)

Multiple arguments
-------------------

Some functions, like ``print()``, can take many arguments: the
various arguments are separated by commas.
To illustrate this, try out the following program::


    length = 4
    width = 6
    area = length * width
    print("The area of a rectangle of length", length,
          "and width", width, "is", area)

