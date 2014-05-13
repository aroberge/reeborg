`Previous <Javascript:void(0);>`__ `Table of
Contents <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__

Increment
=========

Make sure you have the **Editor**, the **World** and the **Diary**
panels open. Select world Around 1 and adjust the width of the **World**
panel so that you see the entire world. (You can width of the panels by
"grabbing" the dotted line between panels and dragging it.)

Now, suppose we wanted to count the number of steps taken by Reeborg to
reach the wall on the right from its starting position. One way to do
this is to use a variable which I will name ``number_of_steps`` and give
it an initial value of 0. Then, each time that Reeborg takes a step, I
will add 1 to the *previous* value of ``number_of_steps``. This is done
in Javascript using the following syntax:

.. code:: jscode

    number_of_steps = number_of_steps + 1;

**Do not think of this as a mathematical equation!** Clearly, if this
were a mathematical equation, the variable on the left hand side of the
"equal sign" would not have the same value as the terms on the right
hand side. However, in Javascript, and many other programming languages,
"=" is known as the **assignment operator**: Javascript determines the
value on the right hand side of "=" and use the variable name on the
left hand side as a way to remember that value. Thus, if we have

.. code:: jscode

    var n;
    n = 1;
    n = n + 3;
    write(n);  // outputs 4

it is equivalent to

.. code:: jscode

    var n;
    n = 1;
    n = 1 + 3;  // notice how we use "1" instead of "n"
    write(n);  // outputs 4

**Try it!**

Because this type of operation, known as *incrementing* a variable
occurs so often, Javascript, and many other languages, allow the use of
the following shortened notation, using the ``+=`` operator:

.. code:: jscode

    var n;
    n = 1;
    n += 3;
    write(n);  // outputs 4

If the value by which we want to *increment* the variable is 1, we can
even use a shorter expression:

.. code:: jscode

    var n;
    n = 1;
    n++;
    write(n);  // outputs 2

**Try it!**

Counting steps
--------------

We are now ready to write a program to have Reeborg count the number of
steps using world Around 1. I will write it for you here, but you must
copy it in the editor to run it. Ideally, you should then modify it to
try the other ways we have seen and that can be used to *increment* a
variable.

.. code:: jscode

    var number_of_steps = 0;

    function move_and_count_steps() {
        move();
        number_of_steps++;
    }

    while (front_is_clear()){
        move_and_count_steps();
    }

    write(number_of_steps);  // should be 9

Your turn
---------

Write a program so that Reeborg goes around world Around 1 and have him
count the number of steps **and** the number of left turns, writing them
in his diary at the end. You should start by putting a token down to
mark what will be the end position.

`Previous <Javascript:void(0);>`__ `Next <Javascript:void(0);>`__
