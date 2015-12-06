
Rule number 3
=============

.. index:: Rule # 3

By now, you should be ready to learn about the third rule for writing
computer programs efficiently.

.. important::

    **Rule # 3**
        When writing computer programs, do not repeat yourself.
        I repeat: **do not repeat yourself!**

Three lefts can make a right
----------------------------

Since you have written quite a few programs by now (you have done the
exercises, didn't you?), you must have realized that having Reeborg make
three left turns in a row gives the same final result as if he were to
make a single right turn. You are probably starting to find it quite
tedious to have to write three ``turn_left()`` instructions each time
you want to have Reeborg turn right. Wouldn't it be nicer if you could
simply write ``turn_right()``?

By the end of this lesson, you will be able to do just that.

Defining functions
------------------

What we have called *instructions* or *commands* so far are examples of
Python **functions**. So, ``turn_left()`` is a function and so is
``move()``. We can define a new Python function as follows:

.. index:: ! def

.. code-block:: python

    def some_well_chosen_name ():
        # some lines of code
        # indented at the same level


``def`` is our first Python **keyword**. Keywords are words that
have a special meaning in a given programming language.
Notice how a colon ``:`` precedes what
is known as a *block of code* and constitutes the *body* of the
function. It is **required** in Python to *indent* such blocks of code
with the same number of spaces at the beginning of each line which, as a side-effect, makes it
easy to identify the function body for a human reader.

Let's write our first Python function::

    def turn_right():
        turn_left()
        turn_left()
        turn_left()

That's it! You will now be able to avoid having to write three
``turn_left()`` functions in a row to simulate a right turn!

.. topic:: Try it!

    Define the ``turn_right()`` function in a program and try to use it,
    perhaps using the world Alone. If you don't know what to try, just have
    Reeborg go around a square by alternating ``turn_right()`` and
    ``move()`` **functions** four times in a row.

How to think about ``def``
-------------------------------

.. note::

   Please note that this simplified explanation does not take into account what is known
   as *variable scope* which is something that we will cover later.

You have just seen how to define a function in Python. Chances are,
you understood right away how to think about them but, just in case,
here's a more detailed explanation which will help you to not only
understand how functions work, but also other Python construct that
involve blocks of code.

Suppose we have the following:

.. code-block:: python
   :emphasize-lines: 7

    def turn_right():  # begin of code block follows
        turn_left()
        turn_left()
        turn_left()   # end of code block

    move()
    turn_right()
    move()

This is equivalent to the following:

.. code-block:: python
   :emphasize-lines: 9, 10, 11

    # define a function
    def turn_right():
        turn_left()
        turn_left()
        turn_left()

    move()
    # begin of code block inside turn_right()
    turn_left()
    turn_left()
    turn_left()
    # end of code block
    move()

In other words, ``def`` defines a name that we can use as a synonym
for all the code that appears inside the code block, and whenever we see
the synonym being **called** [that is, the name appears followed by
``()``], we can think of it as being equivalent to inserting the code
block *as is* at that location.

.. topic:: Try this!

   See if you can simplify your program for the newspaper delivery
   and making it easier to read and understand
   by using a ``turn_right()`` function.  Once you have done so, perhaps
   you can think of other ways in which you can simplify your program by
   defining other functions.
