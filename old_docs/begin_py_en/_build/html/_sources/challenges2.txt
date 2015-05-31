
Revisiting some challenges
==========================

It is time to solve some of the challenges introduced early on.

Using ``while``, ``if``, ``else``, etc., you will write programs that
will be able to accomplish various tasks. In writing these programs, you
should keep the following in mind:

#. Remember rule #2 and choose names that are descriptive for the
   problems you are attempting to solve
#. Follow the principles given in rule #4: start by solving simpler
   problems first and generalize your solution so that it can be applied
   to more than one problem
#. Remember rule #3: avoid repeating code as much as possible.

Now, remember rule #1 ... and make sure that, this time, you solve
**all** the challenges mentioned below.

.. important::

    Make sure you save your various solutions as you might want to come back
    to them later.


Before harvesting
-----------------

Select world **Harvest 4** which occurred shortly after the garden was
seeded. Some carrot seeds sprouted well, others yielded two or three
plants while some did not sprout at all. Help Reeborg weed out the
excess seedlings, and plant some new seeds at locations where some were
missing. Here is a suggestion for some vocabulary to use::


    var carrot_here = token_here
    var plant_carrot_seed = put
    var remove_seedling = take

    def ensure_one_carrot_at_spot():
        ...


.. topic:: Do it!

    Write a program as described above.


Ready to harvest
----------------

The weeding went well (I hope!), the growing season is over and it is
time to harvest. Select world **Harvest 1** or **Harvest 2** and have Reeborg
collect all the tokens which represent plants to harvest.

Notice how one can view the world **Harvest 1** as having horizontal (or
vertical) rows having the same length, while world **Harvest 2** can be seen
as having diagonal rows having the same length.

One possible approach is to define a function ``harvest_one_row`` and a
second one called ``harvest_two_rows`` as well as ``move_to_first_row``.
Using these, can write a general solution. Note that these individual
functions may have to be different in different worlds.

With suitable function definitions, the programs for either world
**Harvest 1** or **Harvest 2** can be written as::

    move_to_first_row()
    repeat(harvest_two_rows, 3)

Note however that you may choose a different way to solve the problems
than that which is described above.

.. topic:: Do it!

    Write a program to do the harvesting as described.
    
Stormy weather
--------------

It was a beautifully sunny day. Reeborg was playing outside with his
friend. Suddenly, it started to rain and Reeborg remembered that the
windows in his house were all open. So Reeborg went back to his house
and stopped in front of the door, unsure of how to proceed.

.. topic:: Do it!

    Using the ``build_wall()`` instruction, help Reeborg close the windows
    of his house. When Reeborg finishes his task, he will stand in the
    doorway, watching the rain fall, waiting for it to stop before he can go
    back and play outside. The world is **Storm 1**.

Reeborg's friend's turn.
------------------------

Erdna, Reeborg's friend, lives in a bigger house as shown on **Storm 2**.
Erdna was playing outside with Reeborg when it started raining. Help
Erdna close the windows in her house.

.. topic:: Try it!

    Your challenge is to write a single program that will work for both
    Reeborg and Erdna ... however, it might be a bit tricky.

.. hint::

    To determine if there's a window at a given location, a robot may
    have to take an extra step and, depending on the result, may have to
    turn around, go back and close that window.

After the storm
---------------

The wind blew really hard last night. There is litter everywhere outside
Reeborg's house. His parents asked him to go and clean up the path
leading to the curb, **Storm 3**, as well as the driveway: **Storm 4**.

.. topic:: Do it!

    Following the instructions in your program, 
    Reeborg should collect all the litter, and put it in the garbage can,
    and close the lid, using ``build_wall()``.

More yard work!
---------------

Reeborg's parents are so proud of his work, that they ask him to pick up
all the garbage that got blown away in their backyard during the
windstorm, as illustrated on **Storm 5**. Have Reeborg pick up all the
garbage and put it in the garbage can.

.. topic:: Try it!

    Your real challenge is to write a single program that can help Reeborg
    do the cleanup for all three locations.
    
Finding the center
------------------

Have a look at the worlds **Center 1** to **Center 3**. 

.. topic:: Do this!

    Write a **single**
    program that has Reeborg put a token at the geometric center of the
    rectangular room he finds himself in.

.. hint::

    You may find it useful to have Reeborg, who carries two tokens,
    drop one token at each end of a line. Then,
    by picking one token at one end and moving it one step, going back and
    forth until both tokens are at the same position, 
    the location of the center can be
    found. When you know how to do this in one dimension (along a horizontal
    line), you can use that location as the starting point to find the
    location along the other location (a vertical line).
