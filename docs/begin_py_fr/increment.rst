Increment
=========

Make sure you have the **Editor**, the **World** and the **Diary**
panels open. Select world **Around 1**.

Suppose we wanted to count the number of steps taken by Reeborg to
reach the wall on the right from its starting position. One way to do
this is to use a variable which I will name ``number_of_steps`` and give
it an initial value of 0. Then, each time that Reeborg takes a step, I
will add 1 to the *previous* value of ``number_of_steps``. This is done
in Python using the following syntax::

    number_of_steps = number_of_steps + 1

**Do not think of this as a mathematical equation!** Clearly, if this
were a mathematical equation, the variable on the left hand side of the
"equal sign" would not have the same value as the terms on the right
hand side. However, in Python, and many other programming languages,
"=" is known as the **assignment operator**: Python determines the
value on the right hand side of "=" and use the variable name on the
left hand side as a way to remember that value. Thus, if we have::

    n = 1
    n = n + 3
    print(n)  # outputs 4

it is equivalent to::

    n = 1
    n = 1 + 3  # notice how we use "1" instead of "n"
    print(n)  # outputs 4


.. topic:: Try it!

   Try to run the above code and see what is printed in Reeborg's Diary.

Because this type of operation, known as *incrementing* a variable
occurs so often, Python, and many other languages, allow the use of
the following shortened notation, using the ``+=`` operator::

    n = 1
    n += 3
    print(n)  # outputs 4

.. topic:: Try it!

   Try running programs like the ones above to make sure you understand
   these ways to increment the numerical value of a variable.

Counting steps
--------------

We are now ready to write a program to have Reeborg count the number of
steps using world **Around 1**. 

.. topic:: Try it!

    Copy the code below in the editor to run it. Ideally, you should then modify it to
    try the other ways we have seen and that can be used to *increment* a
    variable::

        number_of_steps = 0

        def move_and_count_steps():
            global number_of_steps
            move()
            number_of_steps += 1

        while front_is_clear():
            move_and_count_steps()

        print(number_of_steps)  # should be 9

In the above program, we use the ``global`` keyword to indicate to Python that
the variable ``number_of_steps`` used inside the ``move_and_count_steps`` function
is assigned a value elsewhere.  

Note that when you run this program, the number of steps is printed **before**
Reeborg moves.  This is because the program is first run behind the scene and
played back like a movie, one frame at a time.  You can use the function ``write``
specific to Reeborg's World instead of ``print`` if you want to see what Reeborg
writes in its diary done as a programming step, like the ``move`` or ``turn_left``
functions.

.. topic:: Your turn!

    Write a program so that Reeborg goes all the way around world **Around 1** and have him
    count the number of steps **and** the number of left turns, writing them
    in his diary at the end. You should start by putting a token down to
    mark what will be the end position.
