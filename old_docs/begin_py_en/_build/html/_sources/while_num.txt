While counting
==============

Select world **Around 1**. You have seen before that Reeborg takes 9 steps
before reaching the first square where he is blocked by having a wall in
front of him. Let's use the increment operator to have Reeborg keep
track of the number of steps and stop just before hitting a wall::

    number_of_steps = 0;
    while number_of_steps < 9 :  # "<" means "less than"
        move()
        number_of_steps += 1

.. topic:: Try it!


    Try to run the above. Then, modify the program to write the value of
    ``number_of_steps`` in Reeborg's Diary each time it is incremented.
    

Defining ``repeat()``?
----------------------

In the above program, Reeborg was counting and doing a number of steps
(``move``) up to a predetermined value. We have seen before how to
accomplish this using a single instruction::

    repeat(move, 9)

Let's define a function ``my_repeat`` that will *hide* the code with the
while loop above::

    def my_repeat():
        number_of_steps = 0
        while number_of_steps < 9 :
            move()
            number_of_steps += 1

    my_repeat()   # use it!

That's not very useful compared with ``repeat()`` since both the number
of steps to take and the specific instruction to repeat are
*hard-coded*. We can do better by *passing* **arguments** to
``my_repeat`` as follows::

    def my_repeat(some_function, max_value):
        number_of_steps = 0
        while number_of_steps < max_value :
            some_function()
            number_of_steps += 1

    my_repeat(move, 9)   # use it!
    my_repeat(turn_left, 4)

.. topic:: Try it!

   Try to run the above program.

Scope
-----

In the definition above, ``number_of_steps`` was a **local** variable
only known inside the function ``my_repeat``.  
An other way, which we have seen previously,
is to us a **global** variable as follows::

    number_of_steps = 0
    def my_repeat(some_function, max_value):
        global number_of_steps
        while number_of_steps < max_value :
            some_function()
            number_of_steps += 1

Whether a
variable is *local* to a function or *global* is known as the **scope**
of the variable. Generally, it is recommended to use local variables
whenever possible so that if you reuse the same variable name (locally)
elsewhere in a program, it will be treated as a completely different
variable and won't affect the value of a similarly named variable
elsewhere. If you use global variables, a change in one part of the
program will change the value of that variable everywhere else - often
leading to some hard to trace bugs.
