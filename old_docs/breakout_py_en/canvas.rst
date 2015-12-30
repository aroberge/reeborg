Getting a handle on the canvas
==============================

Before we start writing some code that works, let's see
what happens if we make a mistake.  In the Python editor
of `the game world environment <../../game.html>`_, enter
the following incorrect code::

    print( 

and see what happens.

Saw it?  This informs you that an error message has been
written in Reeborg's Diary and that you need to open the
Diary to view it.

.. important::

    In this tutorial, I will often ask you to do things on your own,
    sometimes with little information as to **why** I ask you to
    do a certain thing.  As a programmer, you will often have to
    figure things out on your own and, even with the help of the
    Internet, you will sometime have to write and modify some code
    to understand how it works.  In addition to show you how to write
    a game, I want to give you a feel of what it might be like to
    continue learning on your own after you conclude this tutorial.

.. note::

   This tutorial assumes that you know the basics of html documents.
   If you don't, you should still be able to follow how most of
   the code works but the first few concepts we will see would likely
   be somewhat mysterious to you.

A quick look at the canvas
--------------------------

This tutorial focuses on the elements behind making a game using
the html canvas and Python as a programming language; 
it is not a full tutorial on the canvas itself.
However, just go see a quick overview, do the following, which 
should be familiar since you went through the Introduction to Object Oriented
Programming tutorial.

.. topic:: Do this!

    Select **Javascript** as your programming language.  
    Then, run the following code and have a look at the result in Reeborg's Diary.

    .. code-block:: javascript

        var canvas = document.getElementById("game-canvas");
        inspect(canvas);

Here's a sample of what I see (using Chrome version 35; with Firefox, the order is different):

.. code-block:: py3

    height
    width
    ...
    onmousemove  # this will be of interest later
    ...
    getContext()
    ...


.. topic:: Explore further!

    Still with **Javascript** as the language, first enter the following:

    .. code-block:: javascript

        var canvas = document.getElementById("game-canvas");
        write(canvas.height);
        write(canvas.width);

    to see the dimensions of the canvas.  Then, type and run the following:

    .. code-block:: javascript

        var canvas = document.getElementById("game-canvas");
        var ctx = canvas.getContext('2d');
        inspect(ctx);

    ``ctx`` is a variable name often used to represent the drawing
    **context**.  Note the ``'2d'`` parameter ... it suggests that,
    perhaps, it is possible to have 3d context as well ... This will
    not be discussed further in this tutorial. I'll just note that
    it is known as ``webgl`` instead of ``3d``.

    If you look at the methods available, you will find a method
    named ``arc``.  Have a look at its code by replacing the
    line ``inspect(ctx)`` by ``write(ctx.arc)``.  [Note that ``view_source``,
    which was used in the OOP tutorial is not available here as I did
    not find any useful use for it when writing games.]

    The result of using ``write(ctx.arc)`` should simply be

    .. code-block:: javascript

        function arc() { [native code] }

    which is not the most helpful information. To find out all the details about
    what ``arc`` does, you may have to resort to searching the web. 
    In what follows, I'll make use of it in the most basic manner.


Brython's browser module
------------------------

Select **Python** as your programming language.

To run Python in the browser, we use `Brython <http://brython.info>`_.
Brython's library include some special modules made specifically to
interact with html elements.  In the game world environment, there
is an html canvas which has "game-canvas" as its id as we just saw
when we used ``getElementById``.

.. note::

    Brython's ``browser.doc['some-id']`` is equivalent to the
    Javascript method ``document.getElementById('some-id')``,
    or the jQuery equivalent shortcut ``$('#some-id')`` that you might
    have seen before on the web.

.. topic:: Try this!

    Run the following code::

        from browser import doc
        from math import pi

        canvas = doc["game-canvas"]
        ctx = canvas.getContext('2d')

        ctx.beginPath()
        ctx.arc(100, 100, 20, 0, pi*2);
        ctx.closePath()
        ctx.fill()

You should now see a black circle in the canvas to the left.

Coordinates on the canvas are measured from the top left.  
They increase horizontally when going right, and vertically when going down.
Let's see this with the following example.

.. topic:: Try this!

   Understand how coordinates work on the canvas and learn about drawing
   in colour using the following code::

        from browser import doc
        from math import pi

        canvas = doc["game-canvas"]
        ctx = canvas.getContext('2d')

        def draw_circle(x, y, radius, color):
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, pi*2)
            ctx.closePath()
            ctx.fill()

        # erase previous drawings    
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        draw_circle(100, 100, 20, 'red')
        draw_circle(100, 400, 40, 'blue')
        draw_circle(400, 100, 40, 'orange')
        draw_circle(400, 400, 80, 'green')   

.. important::

    We're using the html canvas and its methods in this tutorial since
    we want to use a browser to write games.  However, perhaps you will
    want to use Pygame or Pyglet or even Kivy to write your own games
    using Python.  To make the job of porting the game to a different
    platform easier, it is useful to hide the platform specific information
    in some generic functions.  This is what we have done above with
    ``draw_circle``.  We could also define::

        def clear_screen():
            ctx.clearRect(0, 0, canvas.width, canvas.height)

    and use ``clear_screen()`` when required instead of the canvas
    specific function.  Your job as a programmer will be much easier
    if you write well-named functions or methods that hide the
    implementation details.
    
.. topic:: Do this!

    Define the ``clear_screen`` function as above and use it when you run
    the program one more time, changing the position of at least one
    of the circles so that you can confirm it is working properly.