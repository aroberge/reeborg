Four canvases
=============

As mentioned previously, the game environment includes 4
html canvases.  In order to take full advantage of them,
it is useful to define the following class::

    class Display(object):
        '''Container for the various canvases used to draw the game'''
        def __init__(self):
            self.game_canvas = doc["game-canvas"]
            self.game_canvas_ctx = self.game_canvas.getContext('2d')
            self.width = self.game_canvas.width
            self.height = self.game_canvas.height

            main_canvas = doc["main-canvas"]
            self.main_canvas_ctx = main_canvas.getContext("2d")

            background_canvas = doc["background-canvas"]
            self.background_canvas_ctx = background_canvas.getContext("2d")

            far_background_canvas = doc["far-background-canvas"]
            self.far_background_canvas_ctx = far_background_canvas.getContext("2d")

As you can see, an instance of this class will have four drawing contexts
as attribute but a single canvas instance, as the others have been used
only as local variables.  The one canvas instance, ``self.game_canvas``,
that is an attribute of this class is the only one that can be interacted
with using a mouse as the browser treats it as though it laid on top of the
other three.  

.. topic:: Your turn!

    Add the class ``Display`` as above.  Then, modify your ``Game.__init__``
    method as follows, using the minimal amount of code to make it work:
    
    .. code-block:: py3
       :emphasize-lines: 10
    
        class Game(object):
            def __init__(self):
                global canvas, ctx, get_mouse_position
                #self.canvas = doc["game-canvas"]
                #self.ctx = self.canvas.getContext('2d')

                #background_canvas = doc["background-canvas"]
                #self.background_canvas_ctx = background_canvas.getContext("2d")

                #New code here          

                self.frame_id = None
                self.pause = True
                self.fps = 30                          
                self.time_between_frames = 1000/self.fps   

                doc.bind("keydown", self.handle_keydown_events)
                self.clear_screen()
                self.write_help()
                #
                canvas = self.canvas
                ctx = self.ctx
                get_mouse_position = self.get_mouse_position
    
    Note that I have commented out some existing code which can be removed altogether.  
    Make sure to test your code!

Removing a global variable
--------------------------

Currently, we have 3 global variables defined in ``Game.__init__``: 
``canvas``, ``ctx``, ``get_mouse_position``.  Ideally, we should have
no global variables.   Let's see if we can start removing them.

We will first start by removing ``ctx``.  If you look at the entire
code, you will see that ``ctx`` is used in the ``draw`` method of
both the ``Ball`` and ``Paddle`` classes.  To remove it as a global
variables, we will pass it as a variable of the ``__init__`` method
when we create an instance of these classes.  For example, we will have

.. code-block:: py3
    :emphasize-lines: 2, 10, 13, 14, 22
    
    class Paddle(object):
        def __init__(self, x, y, width=80, height=10, color="blue", dx=7, ctx=None):
            self.x = x
            self.y = y
            self.width = width
            self.height = height
            self.color = color
            self.dx = dx
            self.calculate_bounding_box()
            self.ctx = ctx

        def draw(self):
            self.ctx.fillStyle = self.color
            self.ctx.fillRect(self.x, self.y, self.width, self.height)


    class Game(object):
       # ...

        def start_animation(self):
            self.ball = Ball(10, self.canvas.height-30, dy=-5)
            self.paddle = Paddle(100, self.canvas.height-20, ctx=self.ctx)


.. topic:: Your turn!

    Implement the change shown above. Do the same for the ``Ball`` class.
    Then remove ``ctx`` as a global variable from within ``Game.__init__``.

Removing another global variable
--------------------------------

Next, we set our sights on removing ``canvas`` as a global variable.
If we examine the ``Paddle`` class, we see that ``canvas`` appears
only in the following method::

    def stay_in_world(self):
        if self.x < 0:
            self.x = 0
        elif self.x + self.width > canvas.width:
            self.x = canvas.width - self.width
        self.calculate_bounding_box()

Similarly, for the ``Ball`` class,  the variable ``canvas`` appears
also only in the ``stay_in_world`` method::

    def stay_in_world(self):
        if self.x < self.radius and self.dx < 0:
            self.dx = -self.dx
            self.x = 2*self.radius - self.x
        elif self.x > canvas.width - self.radius and self.dx > 0:
            self.dx = -self.dx
            self.x = 2*(canvas.width - self.radius) - self.x
        if self.y < self.radius and self.dy < 0:
            self.dy = -self.dy
            self.y = 2*self.radius - self.y
        elif self.y > canvas.height - self.radius and self.dy > 0:
            if DEBUG:
                self.dy = -self.dy
                self.y = 2*(canvas.height - self.radius) - self.y
            else:
                game.game_over()

So, it seems that all we need is only the  ``width`` and ``height``
attribute of the canvas.  We could pass ``canvas.width`` as an
argument to ``Paddle.__init__``, and pass both ``canvas.width`` and
``canvas.height`` as arguments to ``Ball.__init__`` and use these
values.  Making this relatively simple change would be enough
to get rid of ``canvas`` as a global variable.

However, I will suggest a more complex change, one that will
give us some flexibility needed for later.  Yes, I know, I told
you to pay attention to YAGNI (our Rule #5).  However, I wish
to draw your attention to what these two ``stay_in_world`` method
set out to do, and how they do it.

We want to restrict the movement of a ball and paddle so that they
stay within the confine of their "world".  Their "world" itself is
contained withing the html canvas that we use to draw the game.
However, very often (and this will be eventually the case for our game
as well), we want to have other "objects" shown within a game
environment, in addition to the "game world".  For example, we might
want to indicate the score, or the number of "lives" remaining, or
the game level being currently played.  In other types of game we
might want to display something like the player's "health", or
some other information.  So, usually, the game display has an
area reserved for some animation and some other area reserved for
information given to the human player.

So far in our game, we have used the entire "world" as available
for the ball.  In doing so, we have **hard-coded** some values:
the **coordinates** of the canvas' boundaries.   If you look
at the code above, you will see that we compare the coordinates
of the ball (or of the paddle) with those of the boundaries
of the world ``x_min=0``, ``y_min=0``, 
``x_min=canvas.width``, ``y_min=canvas.height``, not by referring
to them using some meaningful variable names, like ``x_min``, ``y_min``,
etc., but by their exact values: ``0, 0, canvas.width, canvas.height``.

Instead of using such hard-coded values, a better, more flexible
approach is to use the coordinates of an object that is
passed to a ``Ball`` or ``Paddle`` instance upon creation. 
Since we will use this object in the ``stay_in_world``
method, let's call this object ``world`` and use it as follows::

    class Paddle(object):
        def __init__(self, x, y, width=80, height=10, color="blue", dx=7, ctx=None,
                     world=None):
            # ...
            self.world = world

        def stay_in_world(self):
            if self.x < self.world["x_min"]:
                self.x = self.world["x_min"]
            elif self.x + self.width > self.world["x_max"]:
                self.x = self.world["x_max"] - self.width
            self.calculate_bounding_box()

    class Game(object):
        def start_animation(self):
            world = {"x_min": 0, "y_min": 0, "x_max": canvas.width,
                     "y_max": canvas.height}
            self.ball = Ball(10, self.canvas.height-30, dy=-5, ctx=self.ctx)
            self.paddle = Paddle(100, self.canvas.height-20, ctx=self.ctx, world=world)

.. topic:: Your turn!

    Implement the above approach for both the ``Paddle`` and ``Ball`` class so that
    you can eliminate the use of ``canvas`` as a global variable.  Note that getting
    ``Ball.stay_in_world`` correct is a bit tricky...
    

The solution I obtained can be revealed by clicking on the following "hint".

.. hint::

    We have already seen how to modify the ``Paddle`` class to 
    remove the need to have ``canvas`` as a global variable. 
    To be able to remove it completely, we need to change the
    code for the ``Ball`` class as follows::

        class Ball(object):
            def __init__(self, x, y, radius=10, color='red', dx=5, dy=5, ctx=None, 
                         world=None):
                #...
                self.world = world

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


    and to change the line that starts with ``self.ball`` in the 
    ``Game.start_animation`` method::

        def start_animation(self):
            world = {"x_min": 0, "y_min": 0, "x_max": canvas.width,
                     "y_max": canvas.height}
            self.ball = Ball(10, self.canvas.height-30, dy=-5, ctx=self.ctx, world=world)
            self.paddle = Paddle(100, self.canvas.height-20, ctx=self.ctx, world=world)
            doc.bind("mousemove", self.paddle.mouse_move)
    