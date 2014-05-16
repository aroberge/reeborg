Turn right ??
=============

In the last lesson, I mislead you.  Here's the code we ended with::

    class RepairedRobot(UsedRobot):
        def turn_right(self):
            for i in range(3):
                self.turn_left()

The robot is **not** repaired: it still accomplishes right turns by turning
left three times.  We really need to fix this.  However, in order to do
so, we will need to learn a bit more about the actual program that controls
the robot.   This is going to be a bit long, but very worthwhile in the end.
Along the way, you will learn new Python concepts ... and you will even
see some and understand some Javascript code!

Digging into Reeborg's code
---------------------------

Open Reeborg's Diary.  If you want, you can also hide the world by clicking
on the "World" button.

Enter and execute the following code and look at the result in the Diary::

    r = UsedRobot()
    inspect(r)
    
``inspect`` is a Javascript function, understood by Python/Brython, 
that I wrote to enable you to see an
object's methods and attributes. Right now, it does not tell us much.
It writes two things ... and we do not know if they are methods or
attributes.  One of these is ``body``.  So, we know that ``r.body`` is
*something*.  Run the following code::

    r = UsedRobot()
    inspect(r.body)

You certainly recognize the words ``tokens``, ``star``, ``triangle`` and
``square`` from the challenges mentioned in the beginner's tutorial.
Also, various challenges told you that *Reeborg is at the correct ``x``
position*, and similarly for ``y``.  So it would seem likely that ``x``
and ``y`` refer to Reeborg's position.  As a programmer, your first reflex
should be write a program and see if this is the case.

.. topic:: Try this!

   Select the world **Empty** and execute the following code::
   
      jumper = UsedRobot()  # mutant robot that teleports itself
      jumper.body.x = 8
      jumper.body.y = 10

All you should see is a robot created at ``x=1, y=1`` ... which might not be
what you have expected.  Add the following instruction::

    jumper.turn_left()

at the end of your program and run it again.


What happened?
--------------

You may recall from previous tutorials that Reeborg's actions are recorded
(like a movie) and played back one "frame" at a time.  The recording of a given
state happens when some special instructions are given.  By changing the value
of the attribute ``x`` or ``y`` of the ``nightCrawler.body`` object, you do not
trigger a frame recording.  However, by adding a ``turn_left()`` instruction at the
end, we do make a recording of the situation, which shows us that the previous
instructions did indeed change the robot's position.

So, how can we trigger a frame recording without using an existing method which
could cause the robot to not end up in our desired position or orientation?
The answer will be provided by looking at the Javascript code powering most of
Reeborg's World.

Javascript !?
-------------

If we are going to look at some Javascript code and you are reading this
tutorial with Python as your first (and only) programming language, you might
be wondering if you made a mistake in choosing Python over Javascript.

Don't worry, you did not.

You already know about libraries; chances are there are some functions
defined in yours.  Libraries are sometimes written in a different language
than the main programming one.  For numerical work, Fortran has long been
the language of choice and most numerical libraries have been written
in Fortran.  Many other libraries have been written in the C language.

Python is sometimes described as a glue language.  You can write Python
programs that make use of functions found in Fortran and C libraries.
Usually, to make use of such libraries, one refers to documentation written
that indicates what functions can be called and how.

You can think of the Javascript code powering most of Reeborg's world as
a special library.  However, no documentation on that library exists.
The way to find out about the functions existing in this library are to look
at the code itself, which is what we are about to do.  However, before we
do this, you should take a quick crash course on Javascript.

.. topic:: Do this!

   Read the one page tutorial on
   `Converting Python code into Javascript <../js_py_en/conversion.html>`_.
   By doing the reverse steps, you could convert Javascript into Python.
   The quick tutorial will teach you enough to be able to get all
   the information you need from the Javascript code inside Reeborg's World.
   Make sure to come back to this page when you are done, so that you can
   continue with this tutorial.

Now that you have read the quick tutorial on converting Python code into
Javascript, it is time to read some Javascript code.