Cleaning up the code
====================

Here are some things I find questionable about my code:

#. I use some **explicit** global variables such as ``ball``, ``paddle``,
   ``frame_id``, ``fps``, ``time_between_frames`` and ``pause``.
#. I use some **implicit** global variables like ``ctx`` and ``canvas``.
#. Inside ``handle_keydown_events``, I have several consecutive statements that
   deal with a single object like ``paddle``.  Objects should decide on their
   own how to deal with external conditions.
#. Inside ``update``, I also see multiple consecutive calls to methods of a
   single object.
#. Both the ``Ball`` and the ``Paddle`` classes have the following methods:
   ``draw()``, ``move()`` and ``stay_in_world()``.  However, the method
   ``stay_in_world()`` for the ``Ball`` class seems to be a lot more complicated
   than that of the ``Paddle`` class due to a large number of ``self.radius``
   used in the code.   I also note that the ``Ball`` method ``overlaps_with()``
   makes use of ``self.radius`` for a ball object but not for the other object.
   This suggests to me that it should be possible to simplify *something* in
   the ``Ball`` class.
#. When it comes to running the code, I took great care to make sure that the ball 
   bounce "perfectly" off the walls; however, it does not so when it hits the
   paddle.  **I will not fix this in this tutorial, not now, nor later.**
   It will be left up to you to fix this as a challenge once you complete
   the tutorial.
   
Before I change anything in my code, I need to introduce a new rule.

DRY and YAGNI
-------------

The "Rules" I have given you in my tutorials are pretty much my own invention. 
However, Rule #3 is something that is known and is usually
described using the acronym DRY: Don't Repeat Yourself.  

There is another famous acronym in programming which I call
Rule #5

.. important::

    **Rule #5**: YAGNI

    You Aren't Going to Need It!

Only write the minimum amount of code to accomplish the task
at hand.  Avoid trying to write a general function or method
if a simple one based on the only thing you need to do at this
time is sufficient.

In this tutorial, I have tried to follow this rule as much as
possible (while keeping my end goal in mind), so as to give you
an idea of how to write programs.  One of the obstacles that
programmers face is being "paralyzed", not writing code because
they want to tackle too many things at once and are afraid of
making mistakes.  So, they spend a lot of time pondering about
the "next" step when, in fact, their so-called "next" step is
really something like a dozen different steps.  By breaking down
a task into its simplest element, aiming to have to write just
a few lines of code doing one thing, followed by a test to make
sure it works as intended, one can overcome the "paralysis".

However, in doing so, the code written is often not the best.
This is why it is useful to stop coding after implementing
some working code and review what has been done to see if
things could be rewritten better (i.e. more readable or
better organized) while making sure that nothing is broken 
in the process.

Since I have not finished my game, I don't really need to
fix all the questionable things I have found and mentioned
above; in fact, since the code works, I could leave things
as they are and continue.   However some functions like
``update`` and especially ``handle_keydown_events``
are starting to be rather long.  Furthermore, they
break one more important rule:

.. important::

    **Rule # 6**
        Give objects information and let them determine their own
        behaviour.


I believe it is useful to simplify the code a bit using
this lasr rule as a guide before going further.  Let's start with
``handle_keydown_events``.   I note the following code::

    def handle_keydown_events(ev):
        global pause, frame_id
        remind = True
        if ev.keyCode == 37:   # left arrow
            remind = False
            paddle.dx = - abs(paddle.dx)
            paddle.move()
            paddle.stay_in_world()
        #...
        if ev.keyCode == 39:   # right arrow
            remind = False
            paddle.dx = abs(paddle.dx)
            paddle.move()
            paddle.stay_in_world()
        # ...

This would likely be better rewritten as follows::

    def handle_keydown_events(ev):
        global pause, frame_id
        remind = True
        if ev.keyCode == 37:   # left arrow
            remind = paddle.move("left")
        #...
        if ev.keyCode == 39:   # right arrow
            remind = paddle.move("right")
        # ...


with the ``Paddle`` method ``move()`` written as::

    def move(self, direction):
        if direction == "left":
            self.dx = - abs(self.dx)
        elif direction == "right":
            self.dx = abs(self.dx)
        self.x += self.dx
        self.stay_in_world()
        return False

We can simplify the ``update`` function in the same way.
Instead of writing:

.. code-block:: py3
    :emphasize-lines: 4, 5, 8, 9, 10

    def update():
        global ball, paddle, frame_id
        clear_screen()
        ball.move()
        ball.stay_in_world()
        write_help()
        show_fps()
        if ball.overlaps_with(paddle) and ball.dy > 0:
            ball.y -= ball.dy
            ball.dy = - ball.dy
        ball.draw()
        paddle.draw()
        if pause:
            return
        frame_id = set_timeout(update, time_between_frames)

we can write:

.. code-block:: py3
    :emphasize-lines: 4, 7, 8

    def update():
        global ball, paddle, frame_id
        clear_screen()
        ball.update()
        write_help()
        show_fps()
        if ball.overlaps_with(paddle):
            ball.handle_hit_with_paddle()
        ball.draw()
        paddle.draw()
        if pause:
            return
        frame_id = set_timeout(update, time_between_frames)

and introduce the following methods for the ``Ball`` class::

    def update(self):
        self.move()
        self.stay_in_world()
    
    def handle_hit_with_paddle(self):
        if self.dy > 0:
            self.y -= self.dy
            self.dy = - self.dy

Even though there are still other changes I could make, I will stop
for now and focus on adding something completely new instead.