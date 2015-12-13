Introduction to the challenges
==============================


In this lesson, I introduce briefly most of the challenges (tasks) that
Reeborg has to accomplish and which you can select from the menu
above Reeborg's world. What you
have to do, is to write programs that accomplish what is being described
as being Reeborg's task. **You do not have to do all the challenges.**
The idea at this point is to get familiar with the way that Reeborg
moves and to identify patterns that reoccur when finding a given
solution.

While you write your programs, each of which will consist of a specific
of series of instructions, you have the advantage of seeing the entire
world all at once. You should start to think about how Reeborg, who only sees the
grid square where he is located, could take advantage of clues to
determine its next action; this will be useful later on.

Important information about saving your work
--------------------------------------------

By making use of something known as *Local Storage*, Reeborg's World remembers
the last program you work on in a given browser (Firefox or Chrome).
However, it might be useful for you to save your programs on your computer,
or on a usb key.  You can do this by first clicking on
**Additional options** at the top and then clicking on the
**Save program to file** button.  Similarly, you can retrieve a program
from your computer using the **Import program from file** button.

If you do save your programs, you will have to note for which
world they are designed. To do so you can use comments::

    # Solution to world Home 1
    move()
    move()

Finding the center
-------------------

This is the first of our series of mini challenges.

Have a look at the worlds **Center 1** to **Center 3**.
In each case, you will have to write a
program that has Reeborg put a token at the geometric center of the
rectangular room he finds himself in.

.. topic:: Try this!

    Write a program for only one of these worlds for now.

Later, you will be able to write a single program that will have Reeborg
find the geometric center of any rectangular room (with odd dimensions
on each side) and have it put a token at that exact location.

Around the world
----------------

Have a look at the worlds **Around 1** to **Around 4**. For at least one of
these worlds, write a program that will have Reeborg go all around the
world coming back at its original starting location, always moving next
to a wall.

Later, we will come back to these challenges and show you how to write
programs that are much shorter and, will work for all of these four
worlds and any similar worlds.

Lost in a maze
--------------

Reeborg is lost in a maze. Have a look at the worlds **Maze 1** and **Maze 2**.
Can you think of a way to write a program that could get Reeborg out of both
of these mazes? Later, you will learn how to do this and, in fact, you will
write a program that could help Reeborg get out of almost any
maze you could think of.

Jumping over hurdles
--------------------

Reeborg has entered a race. It's the 110 meters hurdles race, in
preparation for the Olympics. Have a look at the world **Hurdles 1** and
have Reeborg complete the race, staying as low as he can, just jumping
over the hurdles like this:

|hurdles|

.. topic:: Try it!

   Write a program for the hurdle race.  Notice how often you repeat a certain
   set of instructions.

Once you have done that, select world **Hurdles 2**: that's an indoor race,
and therefore shorter. (It is also the one illustrated above.) You
should be able to remove a few lines of your program and have Reeborg
complete that race as well.

Once you are done with those races, you might want to try the unevenly
spaced hurdles of world **Hurdles 3** or the highly irregular ones of world
**Hurdles 4**.


Harvest time
------------

Reeborg has been gardening and it is time to harvest. Select world
**Harvest 1** or **Harvest 2** and have Reeborg collect all the
carrots.

Alternatively, select world **Harvest 3** which occurred earlier in the
season. Reeborg had been planting some carrots; some sprouted fine,
others did not, while at some location 2 or more seeds sprouted. Reeborg
must remove the excess plants and reseed at locations where there are
missing ones so that each plant site has only one carrot.

**You do not have to write a program this time.**  Just think about how you
would do it.

Rainy weather
---------------

It was a beautifully sunny day. Reeborg was playing outside with his
friend. Suddenly, it started to rain and Reeborg remembered that the
windows in his house were all open. So Reeborg went back to his house
and stopped in front of the door, unsure of how to proceed.

.. index:: build_wall()

.. topic:: Try it!

    Using the ``build_wall()`` instruction, help Reeborg close the windows
    of his house. When Reeborg finishes his task, he will stand in the
    doorway, watching the rain fall, waiting for it to stop before he can go
    back and play outside. The world is **Rain 1**.

Reeborg's friend's turn.
~~~~~~~~~~~~~~~~~~~~~~~~

Erdna, Reeborg's friend, lives in a bigger house as shown on **Rain 2**.
Erdna was playing outside with Reeborg when it started raining. Help
Erdna close the windows in her house.

Later, you will be able to write a single program that will work for
both Reeborg and Erdna ... however, it will be a bit tricky.

After the storm
~~~~~~~~~~~~~~~

The wind blew really hard last night. There are fallen leaves everywhere outside
Reeborg's house. His parents asked him to go and clean up the path
leading to the curb, **Storm 1**, as well as the driveway: **Storm 2**.

Reeborg should collect all the leaves, and put them in the compost bin,
and close the lid, using ``build_wall()``.

More yard work!
~~~~~~~~~~~~~~~

Reeborg's parents are so proud of his work, that they ask him to pick up
all the leaves that got blown away in their backyard during the
windstorm, as illustrated on **Storm 3**. Have Reeborg pick up all the
leaves and put it in the compost bin.

Later, you will learn to write a single program that can help Reeborg do
the cleanup for all three locations.

Summary
-------

Writing programs that can solve the previous challenges can be quite
tedious as you have to write every single instruction that Reeborg must
follow. However, they are good exercises to make you think like a robot.
As you learn more about programming using Python, you will find ways
to write much shorter programs to solve these challenges.

.. |hurdles| image:: ../../../src/images/hurdles.png

.. admonition:: For educators

    If you have already explained how to use function arguments, it might
    be useful to suggest the use of the ``World()`` function instead
    of simply using comments::

        World("Home 1")
        move()
        move()

    If the world currently displayed is not
    **Home 1**, then running this program will result in the selected
    world changing to **Home 1** and the rest of the program will be ignored.
    Running it a second time (when the world shown **is** the desired
    world **Home 1**), the ``World()`` function will be ignored and the rest
    of the program will be executed.

    Instead of using pre-defined worlds, you can use any world accessible
    by a URL somewhere on the web.  For example, you might want to
    try the following::

        World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json",
              "Token test")
        move()
        move()
        take()

    Running this program should add one more world to the current selection.
    Note the second (optional) argument to ``World`` which, if provided,
    is used as the name appearing in the world selector.

