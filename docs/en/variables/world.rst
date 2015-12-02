World
=====

.. index:: World()

.. note::

    Since ``World()`` is a very special function, I decided not to follow
    the normal Python convention and have its name start with an
    uppercase letter.



Choose a world other than **Home 1**.  Then run the following program
**twice**::

    World("Home 1")
    move()
    move()

The first time you run it, you should see Reeborg informing you that the world has
changed to **Home 1**, which you should be able to confirm by looking
at the world.

The second time you run it, because **Home 1** is already selected, the
function ``World()`` is effectively ignored, and the rest of the program is
executed.

Programming exercise
--------------------

Before I tell you more about ``World()``, I want you to revisit a program
you should have written before.

.. topic:: Do this!  It's important.

    Select world **Storm 1**.  Write a program that will make Reeborg
    collect all the leaves and put them in the compost bin.  Your program
    will very likely require you to use ``carries_object()``.

Loading a remote world
----------------------

Look closely at the world **Storm 1**, taking note of where leaves are.

Now, at the very top of the program you just wrote to have Reeborg pick up
all the leaves in **Storm 1**, add the following line of code::

    World("http://reeborg.ca/worlds/not_storm1.json")

[Note that it is a number "1" at the end of not_storm1, and not the letter "l".]
Run the program once: Reeborg should tell you that the world has been loaded
properly.  Its appearance should be identical to what it was before.

Note how the world name in the selector at the top is this very long name
which was used as an argument to ``World()``.

Click on the "World info" button at the top.  You will find a brief description
of the world, including the fact that you are not supposed to use
``carries_object()``.  Ignore that, and run your program.  Take note of what
happens.

Loading a remote world, again
-----------------------------

So, your program did not work.  We will see how to fix this soon.
In the meantime, I want you to try something else.  Change the first line
of the program to read instead like the following::

    World("http://reeborg.ca/worlds/not_storm1.json",
          "Not Storm 1")

I have added a second argument to the function ``World()``.
So as to avoid having a line of code that would be too long to be seen
all at once in the editor, I have put the second argument on a different line.
When Python sees an open parentheses ``(`` for a function argument, it
continues to read if needed on other lines until it finds a closing ``)``,
and treats everything as though it was all on a single line.
**However**, note that I did not split up the strings; I only put things on
a new line after a comma, so that each function argument is on its own line.

Now, run this.  Again, this will not solve the task at hand.  **However**,
if you look at the top, the name that now appears for the world is
``Not Storm 1`` instead of the long address that we had before.

Save your work
--------------

You might want to save your program in a file on your computer by clicking on
the "Additional options" button, followed by "Save program to file".
Later, you will be able to retrieve it by clicking on "Import program from file".
