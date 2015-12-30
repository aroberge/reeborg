Controlling the paddle with the mouse
=====================================

Controlling the paddle with the keyboard does not result in
smooth motion of the paddle.  A better way is to control
it using the mouse.

We already saw before how to get the position of the mouse
inside the canvas::

    def get_mouse_position(ev, canvas):
        bound = canvas.getBoundingClientRect()  # gets the position of the canvas
                                                # on the page
        x = ev.clientX - bound.left
        y = ev.clientY - bound.top
        return x, y

We can add again this function to our code and 
call it inside the following new
method for the ``Paddle`` class::

    def mouse_move(self, ev):
        x, y = get_mouse_position(ev, canvas)
        self.x = x
        self.stay_in_world()

We also need to "bind" this method so that it is invoked when the mouse move:

.. code-block:: py3
    :emphasize-lines: 4

    def start_animation():
        # ...
        paddle = Paddle(100, canvas.height-20)
        doc.bind("mousemove", paddle.mouse_move)

.. topic:: Your turn!

    Implement the above code and test it!  You may want to disable controlling
    the paddle using the keyboard when ``DEBUG == False``.

Hiding the cursor
------------------

If you find the cursor distracting, you can hide it as follows:

.. code-block:: py3
    :emphasize-lines: 6, 11

    def handle_keydown_events(ev):
        # ... some lines of code
    elif ev.keyCode == 81:  # q or Q  for Quit
        remind = False
        doc.unbind("keydown")
        canvas.style.cursor = "default"
        # ...
    elif ev.keyCode == 83 and pause:  # s or S for Start
        remind = False
        pause = False
        canvas.style.cursor = "none"
        start_animation()        
        
