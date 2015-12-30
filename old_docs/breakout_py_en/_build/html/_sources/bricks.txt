Multiple bricks
===============

.. todo::

   A link to a tutorial (yet to be written) covering lists and list comprehensions will
   be added.

Adding multiple bricks is simple.  We can simply use a Python list and add bricks
to them.  The simplest way of drawing bricks on the canvas is to put them in
rows and columns.  
Before I wrote the code below, I thought of creating ``bricks`` as a lists of list so that
an individual brick could be referred to ``bricks[row][col]``.  However, to check if
any brick had been hit by the ball, I would have had essentially to loop over the rows and columns.
Given that we use Python, I thought that a simpler loop of the form::

    for brick in bricks:
        # code follows

would be much simpler.  This is what I did below.  I also changed the width
of the bricks to make it more reasonable!

To have a playable game, we also need to move the starting
point of the ball to the bottom of the screen (otherwise it is just too easy!), 
and change the value of ``DEBUG`` to ``False``.  The relevant lines of code 
are as follows

.. code-block:: py3
   :emphasize-lines: 2, 7, 8, 10, 17-21

    class Brick(object):
        def __init__(self, x, y, width=60, height=30, color="green"):
            self.x = x
            # ...

        def start_animation():
            global ball, bricks, paddle
            ball = Ball(10, canvas.height-30, dy=-5)
            paddle = Paddle(100, canvas.height-20)
            bricks = [Brick(x, y) for x in range(30, 500, 90) for y in range(100, 350, 50)]
            update()

        def update():
            #... some lines of code
            if ball.overlaps_with(paddle):
                ball.handle_hit_with_paddle()
            for brick in bricks:
                if ball.overlaps_with(brick):
                    ball.handle_hit_with_brick()
                    brick.handle_hit_with_ball()
                brick.draw()
            ball.draw()
            #... more lines of code


That's it!

.. topic:: Time to play!

    Make multiple bricks and play for a while!   If anyone asks you what you
    are doing, you are doing some Quality Assurance Tests which is *Very Serious Work* |tm| .


.. |tm| unicode:: U+2122

Quality Assurance Tests: results
--------------------------------

If you have implemented the code exactly like I did, you certainly noticed that
the ball is not bouncing correctly when hitting bricks: it always bounces either
up or down, even if it hits a brick on its side.  This needs to be fixed.

.. topic:: Your turn!

    Change the code so that the ball bounces correctly when it hits a brick.
    Notice how you only need to focus on the code in a single class (``Ball``) 
    to take care of this problem.
