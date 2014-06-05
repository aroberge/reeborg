Events: mouse and keyboard
==========================

To play any game on the computer, you have to use either your
mouse or your keyboard (or a joystick, or ...) or possibly both.
So, before we take the plunge into starting to make our game,
it is important to know how we can use the keyboard and the mouse
to take control of the game.

Mouse events
------------

Using Brython, the mouse events (moving the mouse or clicking on a button) available are:

+---------------+-----------------------------------------------------------------------------------------------------------+
| mouseenter    | a pointing device is moved onto the element that has the listener attached                                |
+---------------+-----------------------------------------------------------------------------------------------------------+
| mouseleave    | a pointing device is moved off the element that has the listener attached                                 |
+---------------+-----------------------------------------------------------------------------------------------------------+
| mouseover     | a pointing device is moved onto the element that has the listener attached or onto one of its children    |
+---------------+-----------------------------------------------------------------------------------------------------------+
| mouseout      | a pointing device is moved off the element that has the listener attached or off one of its children      |
+---------------+-----------------------------------------------------------------------------------------------------------+
| mousemove     | a pointing device is moved over an element                                                                |
+---------------+-----------------------------------------------------------------------------------------------------------+
| mousedown     | a pointing device button (usually a mouse) is pressed on an element                                       |
+---------------+-----------------------------------------------------------------------------------------------------------+
| mouseup       | a pointing device button is released over an element                                                      |
+---------------+-----------------------------------------------------------------------------------------------------------+
| click         | a pointing device button has been pressed and released on an element                                      |
+---------------+-----------------------------------------------------------------------------------------------------------+
| dblclick      | a pointing device button is clicked twice on an element                                                   |
+---------------+-----------------------------------------------------------------------------------------------------------+

These events need to be "bound" at a given element in the document; it could be the document itself.



.. topic:: Try this!

    Let's obtain the position of the mouse when we click on the canvas.  I assume that
    the code in your Library contains the function ``clear_screen`` introduced before and
    the definition of the variable ``canvas``, and that the code in the Python editor
    contains the four ``draw_circle`` calls that we had before.::

        def get_info(ev):
            inspect(ev)
            canvas.unbind("click")
            clear_screen()

        canvas.bind("click", get_info)

    Run this code once, click on the canvas, and observe the result in Reeborg's diary.


Let's examine what this code does in reverse.  The last line instruct the browser to call the function
``get_info`` whenever the canvas is "clicked". Such a function that is called following an event is
known as a "callback" function.  A callback function such as this gets passed an **event** object; we
used the variable name ``ev`` but you could choose any name.   Next, we use our handy
``inspect`` function. I have done this so that you could explore on your own other possible information
you could extract from this event.  Next, by calling the method ``unbind``, we prevent future clicks on
the canvas to call ``get_info``.  I've done this because I want to change the definition of ``get_info``
and don't want to be confused by the output of previously bound definitions.  Finally, by calling
``clear_screen``, I am reminded that I need to run the code again if I want to see the result.

If you look closely at the output in Reeborg's diary, and are using Google Chrome as you browser,
you may see these four variables among **many** others::

    clientX
    clientY
    offsetX
    offsetY

However, if you are using Firefox, neither ``offsetX`` nor ``offsetY`` will be defined.
This is most unfortunate because, as you could see if you were using Chrome, these two variables
would give us the position of the mouse with respect to the top-left corner of the canvas whereas
``clientX`` and ``clientY`` give us the position with respect to the top-left corner of the document
within the browser.
If you are using Chrome, and are just writing code for your own use, you can use ``offsetX`` and
``offsetY``.  Below, I give you a slightly more complicated way to get at these values that
will work in both Chrome and Firefox:

.. topic:: Try this!

    Run the following code a few times, alternating between clicking on the canvas and running the
    code itself, observing the result each time in Reeborg's diary.  Note that nothing happens
    if you click anywhere outside the canvas.

    .. code-block:: py3

        def get_mouse_position(ev, canvas):
            bound = canvas.getBoundingClientRect()  # gets the position of the canvas
                                                    # on the page
            x = ev.clientX - bound.left
            y = ev.clientY - bound.top
            return x, y

        def get_info(ev):
            x, y = get_mouse_position(ev, canvas)
            print(x, y)
            canvas.unbind("click")
            clear_screen()
            
        canvas.bind("click", get_info)

    Try to click as close as possible to the top-left corner of the canvas and note the result.

Now that we know how to locate the position of the mouse, let's have a look at inputs from
the keyboard.

Keyboard events
---------------

The keyboard events of interest to us are ``keydown`` and ``keyup``.

.. topic:: Try this!

    Run the following code::

        def display_keyCode(ev):
            print("keyCode = ", ev.keyCode)
            if ev.keyCode == 81:  # q or Q
                doc.unbind("keydown")
            ev.preventDefault()

        doc.bind("keydown", display_keyCode)

    **You may want to take note of the codes for the arrow keys!**

In the above, we used ``ev.preventDefault()`` to ... prevent the default
action of the keys from taking place. For example, if the window of your browser is not
large enough to view the canvas, the diary and the editor all at once, using the up or
down arrow keys would normally make the page go ... up or down!  By using 
``ev.preventDefault()`` we are disabling the possibility of scrolling the page that way.
Imagine how annoying it would be to have the page scroll while you are trying to make
your game character move!