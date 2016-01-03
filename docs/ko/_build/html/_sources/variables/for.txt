
For loops
=========

.. todo::

   Do::

       for item in a_list:
          #
       for letter in word:
          #
       for _ in range(n):
          #




First, a look at ``while``
--------------------------

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


Now, it's time for ``for``
--------------------------


As we have seen, ``while`` loops can be used with numbers using the
following pattern::

    n = 0                 # initialization
    while n < max_value : # condition to end the loop
        ...
        n += 1  # increment

Another way to write **exactly the same program meaning** is to use a
``for`` loop::

    for n in range(max_value):
       ...

The ``for`` loop in Python can be used for much more than counting items.
However, this will not be covered for now.

What about ``repeat``?
-----------------------

As we had mentioned before, Reeborg's World includes ``repeat`` as
a keyword that is **not** found in Python.  Using ``repeat``, the above
``for`` loop would, in principle, be written as::

    repeat max_value:
        ...

**provided that** ``max_value`` **was an actual number**.
From now on, we will not use ``repeat`` and will use instead the
normal Python way using a ``for`` loop.

