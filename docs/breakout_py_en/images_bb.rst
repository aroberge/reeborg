Images and Bounding Boxes
=========================

So far, we've used simply drawing on the canvas to represent objects.
This does not make for a very pretty game.  Using better artwork often
results in games that are more interesting to play.  To keep things simple,
I will not use images to represent objects; this is something you could
do yourself to make the game look better.  What I will do is to use
an image as a fixed background.

The image I have chosen is itself not very pretty: it is simply a screen
capture of some code. 
This image can be found on Reeborg's site at the relative location
``"src/images/code_background.png"``.  To use it with Brython we
first need to create an html image object as follows::

    from browser import html
    #...
    
    class Display(GameObject):
        def __init__(self):
            #...

            far_background_canvas = doc["far-background-canvas"]
            self.far_background_canvas_ctx = far_background_canvas.getContext("2d")
            self.far_background_image = html.IMG(src="src/images/code_background.png")

Simply doing so may often **not** result in the image being displayed.
This is something that often results in 
`questions on some well-known Internet forums. <http://stackoverflow.com/questions/10593030/html-canvas-not-displaying-image>`_
The solution amounts to create special function to load the image::

        def on_load(*arg):
            self.draw_far_background()
        self.far_background_image.onload = on_load
            self.far_background_canvas_ctx.drawImage(self.far_background_image, 0, 0)
        self.far_background_image.onload = on_load

Finally, to make this background image less distracting, we can make it 
more transparent using the ``globalAlpha`` property of the relevant
html canvas.  The complete new code is as follows::

    from browser import doc, html
    #...

    class Display(object):
        def __init__(self):
            #...
            
            far_background_canvas = doc["far-background-canvas"]
            self.far_background_canvas_ctx = far_background_canvas.getContext("2d")
            self.far_background_canvas_ctx.globalAlpha = 0.3  # making transparent
            self.far_background_image = html.IMG(src="src/images/code_background.png")

            # html canvas image loading workaround to ensure that image is available
            def on_load(*arg):
                self.far_background_canvas_ctx.drawImage(self.far_background_image, 0, 0)
            self.far_background_image.onload = on_load

Image position and bounding box
-------------------------------

In the above code samples, the line::

    self.far_background_canvas_ctx.drawImage(self.far_background_image, 0, 0)
    
indicates that the image must be drawn at position ``(0, 0)``; the general case
would read::

    some_context.drawImage(some_image, x, y)

Suppose we were to use an image for the ball instead of drawing a circle.
Currently, when we specify the position of the circle, we do so by specifying
the position of its centre.  If we were using an image, the natural position to use
would be that of its top-left corner, as it is for the above background image and
as it is for the paddle and the bricks.

If you take a look at the code in the ball class, you will see many instances
where the position of the ball is effectively shifted by its radius in order
to compute some quantities.  If we were to use the top-left corner instead as
its position, much of the code would be simplified.  For example, the method::

    def overlaps_with(self, other):
        return ( ((self.x - self.radius  < other.x_min < self.x + self.radius) or
                 (other.x_min < self.x - self.radius  < other.x_max))
            and ((self.y - self.radius  < other.y_min < self.y + self.radius) or
                 (other.y_min < self.y - self.radius  < other.y_max)) )

could be more simply written as::

    def overlaps_with(self, other):
        return ( ((self.x < other.x_min < self.x_max) or
                 (other.x_min < self.x < other.x_max))
            and ((self.y < other.y_min < self.y_max) or
                 (other.y_min < self.y < other.y_max)) )

provided we defined also ``self.x_max = self.x + 2*self.radius`` and
``self.y_max = self.y + 2*self.radius``

Similarly::

    def stay_in_world(self):
        if self.x < self.radius + self.world["x_min"] and self.dx < 0:
            self.dx = -self.dx
            self.x = 2*(self.world["x_min"] + self.radius) - self.x
        elif self.x > self.world["x_max"] - self.radius and self.dx > 0:
            self.dx = -self.dx
            self.x = 2*(self.world["x_max"] - self.radius) - self.x
        if self.y < self.world["y_min"] + self.radius and self.dy < 0:
            self.dy = -self.dy
            self.y = 2*(self.world["y_min"] + self.radius) - self.y
        elif self.y > self.world["y_max"] - self.radius and self.dy > 0:
            if DEBUG:
                self.dy = -self.dy
                self.y = 2*(self.world["y_max"] - self.radius) - self.y
            else:
                game.game_over()

would become::

    def stay_in_world(self):
        if self.x < self.world["x_min"] and self.dx < 0:
            self.dx = -self.dx
            self.x = 2*self.world["x_min"] - self.x
            self.x_max = self.x + 2*self.radius
        elif self.x_max > self.world["x_max"] and self.dx > 0:
            self.dx = -self.dx
            self.x_max = 2*self.world["x_max"] - self.x_max
            self.x = self.x_max - 2*self.radius
        if self.y < self.world["y_min"] and self.dy < 0:
            self.dy = -self.dy
            self.y = 2*self.world["y_min"]  - self.y
            self.y_max = self.y + 2*self.radius
        elif self.y_max > self.world["y_max"]  and self.dy > 0:
            if DEBUG:
                self.dy = -self.dy
                self.y_max = 2*self.world["y_max"] - self.y_max
                self.y = self.y_max - 2*self.radius
            else:
                game.game_over()

In order to keep ``x_max`` and ``y_max`` in sync, we would also need to 
do the following::

    class Ball(object):
        def __init__(self, x, y, radius=10, color='red', dx=5, dy=5, ctx=None, 
                     world=None):
            self.x = x
            self.y = y
            self.x_max = x + 2*radius
            self.y_max = y + 2*radius

        def move(self):
            self.x += self.dx
            self.y += self.dy
            self.x_max = self.x + 2*self.radius
            self.y_max = self.y + 2*self.radius

        def reverse_vertical_motion(self):
            self.y -= self.dy
            self.dy = - self.dy
            self.y_max = self.y + 2*self.radius

        def reverse_horizontal_motion(self):
            self.x -= self.dx
            self.dx = - self.dx  
            self.x_max = self.x + 2*self.radius

With these new definitions, the code for drawing the ball would need
to change slightly::

    def draw(self):
        self.ctx.fillStyle = self.color
        self.ctx.beginPath()
        #self.ctx.arc(self.x, self.y, self.radius, 0, pi*2)  ## old code
        self.ctx.arc(self.x + self.radius, self.y + self.radius, self.radius, 0, pi*2)
        self.ctx.closePath()
        self.ctx.fill()

Finally, to compute the position where the paddle is hit, we'd also need to do
a small change::

    def handle_hit_with_paddle(self, paddle):
        if self.dy < 0:
            return
        self.reverse_vertical_motion()
        #  offset = self.x - (paddle.x + paddle.width/2)  ## old code
        offset = self.x + self.radius - (paddle.x + paddle.width/2)
        #...

With these changes, we would, at any time, replace the ball drawing by an appropriate
image, without needing to change anything related to the computation of the position
or collision with other objects.

.. topic:: Your turn!

    Implement and test the above code so that the position of the ball is specifid
    by its top left corner instead of its centre.