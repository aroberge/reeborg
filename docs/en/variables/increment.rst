Increment
=========


Select world **Around 1**.

Suppose we wanted to count the number of steps taken by Reeborg to
reach the wall on the right from its starting position. One way to do
this is to use a variable which I will name ``number_of_steps`` and give
it an initial value of 0. Then, each time that Reeborg takes a step, I
will add 1 to the *previous* value of ``number_of_steps``.

Simple enough?

Before I write a Python program to do just that, let's do an experiment.

.. topic:: Try this!

    Run the following program::

        n = 1
        n = n + 3
        print(n)

    What did you see?    Then, try running the following::

        a = a + 3
        print(a)

    Very different result, isn't it?


In computer programming, the action of changing the value of a variable
so that it increases is called *incrementing* a variable.
When the variable decreases, we use the verb **decrement** instead.


Understanding increments
------------------------

Remember when we saw variables and the assignment operator ``=``.
A variable is a name given to an object so that we can refer to it
using that name.  The basic form is::

    variable = object

One example we gave before was::

    length = 4
    width = 6
    area = length * width  # area of a rectangle
    print(area)            # will output 24

To figure out what object ``area`` refers to, Python needs to
replace the variables ``length`` and ``width`` by the object they refer to::

    area = 4 * 6

However, ``4 * 6`` is still not an object: it is the product of two
objects.  So Python needs to do some more work and get::

    area = 24

Now, we truly have an equation with a name (variable) on the left-hand side
of the assignment operator ``=``, and an object (``24``) on the right
hand-side.  Let's go back to the previous example::

    n = 1
    n = n + 3

Having the same variable name ``n`` appearing
on both sides of the assignment operator does not change the logic:
first we find out which **single** object is meant on the right-hand side,
and only then do we assign a name to it.
Thus, the line of code::

    n = 1

instructs Python that whenever we write ``n`` we mean it to be thought of
as ``1``.  The next line of code is::

    n = n + 3

This is clearly not a standard mathematical operation!
Remember, we just saw that the assignment operator tells Python
to assign a new name to an object.  Here, the object is obtained via::

    n + 3

We've already instructed Python
that we want ``n`` to refer to ``1``.   Thus ``n + 3`` should be thought
of as ``1 + 3``.   Python knows how to add integers, and it can
replace this sum of two integers by a single one: ``4``.
Thus, ``n + 3`` refers to the object ``4``, and the line of code::

    n = n + 3

really means::

    n = 4

And this line can be thought of as telling Python *whatever* ``n`` *meant before,
forget about it, and think of it as meaning* ``4`` *from now on.*

What about ``a = a + 3``?  Python first looks at the right hand side ``a + 3``,
finds a variable ``a`` which has not been assigned to any object before,
so it doesn't know what to do with it, and lets us know by giving
an error message.

.. topic:: Counting steps

    It is time to have Reeborg count the number of steps needed to
    reach the wall in front of him in world **Around 1**.
    Do this with the following program::

        number_of_steps = 0

        while front_is_clear():
            number_of_steps = number_of_steps + 1
            move()

        print(number_of_steps)

.. topic:: Your turn

    Have Reeborg go all the way once around world **Around 1**.
    Along the way, Reeborg should could the number of steps **and**
    the number of left turns, printing both of these values
    at the end.  **Important** Do this **without** defining your own
    functions.


Augmented assignment operators
------------------------------

.. index:: augmented assignment operators

.. index:: +=, -=, /=, *=, //=, **=

In Python programs, we often need to do something like::

    number_of_steps = number_of_steps + 1

or::

    pizza_slices = pizza_slices - 2

Not only this is long to write, but it also does not respect
Rule # 3: **Do not repeat yourself**, since we have the same variable
name written **twice** on the same line.
There is a shorter way to write such lines of code which avoid
repetitions, using what are known as **augmented assignment operators**.

We can rewrite the above lines of code as::

    number_of_steps += 1
    pizza_slices -= 2

For each mathematical operator, ``+, -, /, //, *, **``, there is a corresponding
augmented assignment operator ``+=, -=, /=, //=, *=, **=``.

.. important::

   When using augmented assignment operators, do not leave a space between the
   different symbols.  Thus, write ``+=`` and not ``+  =``.

.. topic:: Your turn

    Have Reeborg go all the way once around world **Around 1**.
    Along the way, Reeborg should could the number of steps **and**
    the number of left turns, printing both of these values
    at the end.  This time, **use augmented assignment operators**.


Back to the yard work?
----------------------

At the end of the previous lesson, you were left with a task for Reeborg
that couldn't be done because you couldn't use ``carries_object()``.
While you now know how to keep track of the number of leaves picked
up by Reeborg, there are two more programming concepts we must
learn so that Reeborg can accomplish his task.  We will do this
in the following two sections.

