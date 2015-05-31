Efficiency considerations
=========================

So far, I have written the code without thinking about how to
make it efficient.  This, in fact, constitutes another
rule that I follow.

.. important::

    **Rule # 7**
        Focus on writing code that works, without worrying about
        performance - at least initially.  If you find that
        more speed is needed, use the appropriate tools to determine
        what part of your code should be rewritten to be more
        efficient.
        
.. note::

    Python comes with some tools like the ``profile`` module to help
    you analyze your program and help identify which parts need to
    be sped up. As we use Brython which translates our code into 
    Javascript that is then run in a browser window, we will bypass
    using specialized tools and rely on our common sense to identify
    potential performance bottlenecks.

The game so far works reasonably well ... on **my** computer.  
So, really, I have no need to make it run faster.  However, I know
that some computers may not be as fast as mine ... and, since the
program is translated by Brython into Javascript which is then interpreted
by a browser, I realize that the performance is less than ideal.

So, I am going to break my rule and identify one change required to
make the code more efficient.  I have another reason to do this
as you will likely understand by the end of this tutorial section.

Drawing bricks
--------------

At each iteration of a game loop, here is what happens:

  #. The position of the ball gets updated
  
  #. Potential collisions are analyzed.
  
  #. **All** objects, including all visible bricks, are redrawn.

This last step most likely takes a fair bit of time.
There is a way to make it significantly faster.

Instead of a single html canvas, there are actually 4 canvases
on the `the game world environment <../../game.html>`_ Here is
the actual html code used on that page:

.. code-block:: html

    <canvas id="far-background-canvas" width="620" height="550"></canvas>
    <canvas id="background-canvas" width="620" height="550"></canvas>
    <canvas id="main-canvas" width="620" height="550"></canvas>
    <canvas id="game-canvas" width="620" height="550"></canvas>

You can think
of them as 4 separate transparent sheets on which you can draw.
Drawings on the top sheet (the one appearing last in the html code above) 
will hide those on the buttom sheets where
they overlap.  So, here is a trick we can use: instead of redrawing
the bricks at each iteration of the game loop, we only draw them once
at the very beginning, but on a canvas that is located "below" that
where we do the other drawing.  When a brick is hit by a ball and
no longer visible, we simply **erase** that single brick.  
You may not realize it but we 
have already seen how to erase (part of) the canvas using
the ``clearRect`` method.  So, here's one way we can implement this idea.

We start by adding a new attribute inside the ``__init__`` method of the
``Brick`` class::

    class Brick(object):
        def __init__(self, x, y, width=60, height=30, color="green"):
        self.needs_drawing = True

Then, we modify the ``draw`` method from::

    def draw(self):
        if not self.is_visible:
            return
        ctx.fillStyle = self.color
        ctx.fillRect(self.x, self.y, self.width, self.height)

to::

    def draw(self):
        if self.needs_drawing:
            ctx.fillStyle = self.color
            ctx.fillRect(self.x, self.y, self.width, self.height)
            self.needs_drawing = False

This will ensure that the brick gets drawn only once.
We then change the method::

        def handle_hit_with_ball(self):
            self.is_visible = False
            self.x_min = self.x_max = self.y_min = self.y_max = -1

to::

        def handle_hit_with_ball(self):
            self.x_min = self.x_max = self.y_min = self.y_max = -1
            ctx.clearRect(self.x, self.y, self.width, self.height)

Note that we can now remove the ``is_visible`` attribute as it is 
no longer required.

.. important::

   If you do the changes mentioned above, your program will no longer work
   properly.  We need to do one more major change.

Right now, the drawing context ``ctx`` is the same for the bricks as
it is for the other objects.  We need to have the bricks drawn on
a different canvas for this change to work.  Here is what you need to do.

.. topic:: Your turn!

    Start by doing the changes mentioned above.  Then, introduce a new
    argument for the ``Brick`` object ``__init__`` method as follows::
    
        class Brick(object):
            def __init__(self, x, y, width=60, height=30, color="green", ctx=None):
            self.needs_drawing = True
            self.ctx = ctx
    
    Inside the methods of the ``Brick`` class, replace all ``ctx`` by ``self.ctx``
    
    Inside the ``__init__`` method of the ``Game`` class, add the following two
    lines::
    
        background_canvas = doc["background-canvas"]
        self.background_canvas_ctx = background_canvas.getContext("2d")
    
    Inside the ``start_animation`` method, add the background canvas information
    when creating bricks, as follows::
    
            self.bricks = [Brick(x, y, ctx=self.background_canvas_ctx) 
                                   for x in range(30, 500, 90) 
                                   for y in range(100, 350, 50)]