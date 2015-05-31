Bounding box
============

Here is the code I have to keep the paddle in::

    class Paddle(object):
        ...
        def stay_in_world(self):
            if self.x < 0:
                self.x = 0
            elif self.x + self.width > canvas.width:
                self.x = canvas.width - self.width

    def handle_keydown_events(ev):
        global pause, frame_id
        remind = True
        if ev.keyCode == 37:   # left arrow
            remind = False
            paddle.dx = - abs(paddle.dx)
            paddle.move()
            paddle.stay_in_world()
        if ev.keyCode == 39:   # right arrow
            remind = False
            paddle.dx = abs(paddle.dx)
            paddle.move()
            paddle.stay_in_world()
        # more code ...

I think that the code for the paddle method ``stay_in_world`` is simple enough that I do not need to
explain to you how it works.  Some observations:

#. The method ``stay_in_world`` for the paddle is **much** simpler than the corresponding
   one for the ball.  Perhaps there is a lesson there ... let's keep this in mind.
#. There is something *not quite right* about having 3 instructions specific to the paddle
   inside each ``if`` statement for the function ``handle_keydown_events()``.  However,
   since it works, I will leave it as is for now.

.. topic:: Your turn

    Look at the code and consider the above observations.  Can you think of a different
    way of writing the code that could make things better?  If you do, and especially
    if you are using two different browsers (one in which to write your own version
    and another to write my version of the code) to follow this tutorial, you might
    want to make the relevant change in your own code.

Bouncing the ball off the paddle
--------------------------------

We want the ball to bounce up from the paddle when it hits it.  But what do we mean by
"hit"?  Let's draw some rectangles on the screen so that we can discuss this in details.

.. topic:: Draw this

    Without removing any of the existing code, 
    add the following code at the very end of your game
    code and run it.  Do not start the animation!

    .. code-block:: py3

        ctx.fillStyle = "red"
        ctx.fillRect(10, 10, 100, 90)

        ctx.fillStyle = "yellow"
        ctx.fillRect(120, 20, 120, 110)

        ctx.fillStyle = "green"
        ctx.fillRect(200, 210, 130, 140)

        ctx.fillStyle = "rgba(0, 0, 255, 0.5)" # transparent blue
        ctx.fillRect(20, 110, 150, 160)

        ctx.fillStyle = "orange"
        ctx.fillRect(320, 5, 170, 180)

.. note::

    In addition so specifying colours by their "name", we can specify
    them using various formats.  Have a look at
    `this brief 5 "page" introduction <http://reeborg.ca/tutorials/colours/intro_en.html>`_
    for more details.


So, we have various rectangles on the screen and only two
overlap: the yellow one and the transparent blue one.  Let's see how we can
figure this out from the numerical values.

The format for rectangles is ``fillRect(x, y, width, height)``.  A rectangle
will have its ``x`` coordinate start at ``x`` and end at ``x+width``. Thus,
the red rectangle ``x`` cordinate starts at ``10`` and end at ``10 + 100=110``.
So, the **maximum** value of the ``x`` coordinate for the red rectangle is ``110``.
The **minimum** value of the ``x`` coordinate for the yellow rectangle is
``120``.  This minimum value is less than the maximum value for the red
rectangle: these two rectangles do not overlap.

You can do the same analysis for all ``x`` and ``y`` coordinates of the
non-overlapping rectangle: you will always find that the **minimal value**
from **one** rectangle (we don't know which one) 
will be greater than the **maximum value** of the other.

Let's look at the overlapping rectangles.  The minimum value of the
``x`` coordinate for the yellow rectangle is ``x_min = 120`` and
its maximum value is ``x_max = 240``.  Similarly, the minimum
value of its ``y`` coordinate is ``y_min = 20`` and ``y_max = 130``.

For the transparent blue rectangle, we have ``X_min = 20``,
``X_max = 170``, ``Y_min = 110`` and ``Y_max = 270``, where I used
upper case ``X`` and ``Y`` to distinguish from the corresponding
variables for the yellow rectangle.

Notice how we have:  ``X_min < x_min < X_max``: the yellow rectangle
starts (horizontally) between the beginning and the end of where
the transparent blue rectangle starts.

We also have ``y_min < Y_min < y_max``: the blue rectangle
starts (horizontally) between the beginning and the end of where
the yellow rectangle starts.

So, as long as one of them starts (either vertically or horizontally)
in the range where the other one is present, there is a possibility of
overlap.

Let's start rewriting this in code (but do not copy it in your editor)::

    if (x_min < X_min < x_max) or (X_min < x_min < X_max):
        print("horizontal overlap exists.")
    if (y_min < Y_min < y_max) or (Y_min < y_min < Y_max):
        print("vertical overlap exists.")    

We can combine the two statements and simply write::

    if ( ((x_min < X_min < x_max) or (X_min < x_min < X_max))
        and ((y_min < Y_min < y_max) or (Y_min < y_min < Y_max)) ):
        print("overlap exists.")    

So, this complicated condition that follows the ``if`` keyword will be ``True``
if an overlap exists, and ``False`` otherwise.  If we work with rectangular objects,
we could use it as the return value of an overlap method that returns ``True``
if the object (``self``) overlap with an other as follows::

    def overlap(self, other):
        return ( ((self.x_min  < other.x_min < self.x_max) or 
                 (other.x_min < self.x_min  < other.x_max))
            and ((self.y_min  < other.y_min < self.y_max) or 
                 (other.y_min < self.y_min  < other.y_max)) )



Squaring the circle
-------------------

The approach mentioned above works well when dealing with rectangles,
but how can we see if a circle overlaps with a rectangle?

There is a way to do this **exactly** ... but there is an approximate
approach that works fairly well for simple games: using a bounding box.

.. topic:: Try this

    Replace the code used to draw the four coloured rectangles by the following
    code and run it (but do not start the animation)::

        ctx.fillStyle = "gold"
        ctx.fillRect(10, 310, 99, 90)

        ctx.fillStyle = "lightblue"
        ctx.fillRect(195, 360, 130, 100)

        ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
        ctx.beginPath()
        ctx.arc(150, 430, 50, 0, pi*2)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = "black"
        ctx.strokeRect(100, 380, 100, 100)
   

There is a black square enclosing the red circle: it is called
a bounding box. The red circle overlaps with the blue rectangle
but not with the gold one; however, the black square overlaps
with both rectangles.   If we use the black
square (bounding box) as an approximation for the red circle, we would
conclude that the circle overlaps with both rectangles.  
Using bounding boxes is often done in
games to decide if there is an overlap. At the very least, it gives us
a quick way to decide if an overlap *possibly* exists; if so, one can
do a more detailed analysis.

An alternative is to use a box slightly smaller than the bounding
box so that parts of the circle protrudes outside, like the following
code illustrates::

    ctx.fillStyle = "gold"
    ctx.fillRect(10, 310, 99, 90)

    ctx.fillStyle = "lightblue"
    ctx.fillRect(195, 360, 130, 100)

    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
    ctx.beginPath()
    ctx.arc(150, 430, 50, 0, pi*2)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "black"
    ctx.strokeRect(110, 390, 80, 80)

Using the black square as an approximation to the circle, we would
conclude that the circle does not overlap with either of the two
rectangles.  In some games, this may turn out to be a better approximation
than a strict bounding box.

.. topic:: Your turn

    You will write some code that tests your understanding.

    #.  Inside ``update()``, replace the line ``ball.draw()`` by the following::

            if ball.overlaps_with(paddle):
                color = ball.color
                ball.color = "gold"
                ball.draw()
                ball.color = color
            else:
                ball.draw()

        As you can see, this should result in the ball changing color when it overlaps
        with the paddle (we'll make it bounce off the paddle later).

    #.  Write a method ``calculate_bounding_box`` for the ``Paddle`` class.  This method
        should calculate four variables for the paddle: ``self.x_min``, ``self.x_max``
        and two others.  You may need to call this function at various places in your code.

    #.  Write a method ``overlaps_with(self, other)`` for the ``Ball`` class.  You should
        use the ``overlap`` function we mentioned above as your inspiration.

    When you have done this, run your code, move your paddle and watch the ball change 
    color when it overlaps with the paddle.  You may want to change the value of ``fps``
    or the radius of the ball or any other quantity (like the size of the paddle, etc)
    that will make it easier for you to see that the code is working properly.

Bouncing at last!
-----------------

It may take you a while to get the above working but I am confident that you can.
So, if you have not made it work ... go back to your code and get it done before
continuing.  

When you see the ball change colours it overlaps with the paddle, replace the code
that changes the colour by the following which does a decent job at making the
ball bounce off the paddle::

    if ball.overlaps_with(paddle) and ball.dy > 0:
        ball.y -= ball.dy
        ball.dy = - ball.dy
    ball.draw()

.. topic:: Do it!

   Try it out and see if you like it.  We almost got a game going!


A question for you
~~~~~~~~~~~~~~~~~~

Why did I include ``and ball.dy > 0`` in the above code?