Multiple bricks
===============

.. todo::

   A link to a tutorial (yet to be written) covering lists and list comprehensions will
   be added.

Adding multiple bricks is simple.  To have a playable game, we also need to move the starting
point of the ball to the bottom of the screen (otherwise it is just too easy!), 
and change the value of ``DEBUG``.  The relevant lines of code 
are as follows

.. code-block:: py3
   :emphasize-lines: 5-9, 15, 22

    def update():
        #... some lines of code
        if ball.overlaps_with(paddle):
            ball.handle_hit_with("paddle")
        for brick in bricks:
            if brick.is_hittable and ball.overlaps_with(brick):
                ball.handle_hit_with("brick")
                brick.handle_hit_with("ball")
            brick.draw()
        ball.draw()
        #... more lines of code
           
            
    #---------------
    DEBUG = False
    pause = True
    fps = 60     
    tbf = 1000/fps   # time between frames in ms

    ball = Ball(10, canvas.height-30, dy=-5)
    paddle = Paddle(100, canvas.height-20)
    bricks = [Brick(x, y) for x in range(30, 500, 90) for y in range(100, 350, 50)]
    clear_screen()
    write_help()

That's it!

.. topic:: Time to play!

    Make multiple bricks and play for a while!   If anyone asks you what you
    are doing, you are doing some Quality Assurance tests which is Very Serious Work.

