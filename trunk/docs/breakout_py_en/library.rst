Using the Library
=================

In previous tutorials, I suggested that you put your
useful functions in the library and use the statement
``import my_lib`` in the Python Code editor if you
wanted to use the functions present in the library.

If you try this, it won't work.

.. topic:: Try this!

    Type in ``import my_lib`` on a separate line in
    the Python Code editor and run your program.

What's happening?
-----------------

I have a confession to make: in previous tutorials I was "cheating".
In previous tutorials, when you clicked on the "run" button, 
the code that you had in the editor was scanned looking for the
statement ``import my_lib``.  If it was present, it was replaced
by the entire content of the library.  No real import was taking place.

.. topic:: Try this!

   After removing the wrong import statement, 
   add the following line anywhere to the program in the editor
   (don't erase what you have), run it and look at the result
   in Reeborg's Diary::

       print( "This is cheating.".replace("cheating", "clever"))

What I wanted to do at the time was to introduce the idea of libraries and
"importing" them as it is something very useful.  I thought it
would be more easily understood if you used your own code to
put in libraries.

Why use a library here?
-----------------------

In Reeborg's game world environment, when you click the "run" button,
the content of the Python Code editor is automatically added
at the end of the content of the Library editor, and the entire
thing is interpreted by Brython.

You should use the Library to put in your well-tested code,
containing only variable or function definitions,
and the Python Code editor should contain only the new code
you are working on.  This allows you to focus on the task at
hand without being distracted by a large amount of code that
is known to work properly.

Taking the code from the previous tutorial and changing it
only slightly, here's how you should organize your code::

    # this should be in the library

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

    def clear_screen():    
        ctx.clearRect(0, 0, canvas.width, canvas.height)

    # end of code in the library

    # below is the code to put in the editor

    clear_screen()

    draw_circle(100, 100, 20, 'red')
    draw_circle(100, 400, 40, 'blue')
    draw_circle(400, 100, 40, 'orange')
    draw_circle(400, 400, 80, 'green')   

.. topic:: Do it!

    Organize your code as shown above and test it to make sure
    it works properly.

In what follows, unless I mention the library explictly, it
will be assumed that the correct code is already put in the
library and I will usually only show the code that should
be in the Python Code editor.